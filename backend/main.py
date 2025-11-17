from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import os
from datetime import datetime, timedelta
import jwt
import pickle
import io
import csv

from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import shap

# Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/loan_db")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Borrower(Base):
    __tablename__ = "borrowers"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    national_id = Column(String, unique=True, nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    education_level = Column(String, nullable=True)
    employment_status = Column(String, nullable=True)
    has_smartphone = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(Integer, ForeignKey("users.id"))

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True)
    borrower_id = Column(Integer, ForeignKey("borrowers.id"))
    prediction_score = Column(Float)
    default_probability = Column(Float)
    risk_level = Column(String)
    mpesa_statement_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(Integer, ForeignKey("users.id"))

class ConsentLog(Base):
    __tablename__ = "consent_logs"
    id = Column(Integer, primary_key=True)
    borrower_id = Column(Integer, ForeignKey("borrowers.id"))
    consent_type = Column(String)  # 'data_privacy', 'mpesa_verification', 'data_sharing'
    accepted = Column(Boolean)
    timestamp = Column(DateTime, default=datetime.utcnow)
    created_by = Column(Integer, ForeignKey("users.id"))

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True)
    action = Column(String)
    entity_type = Column(String)
    entity_id = Column(Integer)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    created_by = Column(Integer, ForeignKey("users.id"))

Base.metadata.create_all(bind=engine)

# Initialize ML Model (simple mock for now)
def create_mock_model():
    """Create a mock ML model that will be replaced with actual trained model"""
    X_train = np.random.randn(100, 14)
    y_train = np.random.randint(0, 2, 100)
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    model.fit(X_train, y_train)
    return model

mock_model = create_mock_model()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = None):
    """Mock user authentication - replace with actual JWT validation"""
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user_id

# Schemas
from pydantic import BaseModel
from typing import Optional, List

class BorrowerCreate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    national_id: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    education_level: Optional[str] = None
    employment_status: Optional[str] = None
    has_smartphone: Optional[str] = None

class PredictionRequest(BaseModel):
    borrower_id: int
    name: Optional[str] = None
    phone: Optional[str] = None
    national_id: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    education_level: Optional[str] = None
    employment_status: Optional[str] = None
    has_smartphone: Optional[str] = None
    months_with_mpesa_history: Optional[int] = None
    mpesa_txn_count_30d: Optional[int] = None
    mpesa_total_amount_30d: Optional[float] = None
    mpesa_avg_txn_amount_30d: Optional[float] = None
    airtime_spend_30d: Optional[float] = None
    utility_bill_amount_30d: Optional[float] = None
    savings_balance: Optional[float] = None
    loan_amount_applied: Optional[float] = None
    previous_defaults_count: Optional[int] = None
    late_payments_12m: Optional[int] = None
    data_privacy_consent: bool
    mpesa_verification_consent: bool
    data_sharing_consent: bool

class ConsentRequest(BaseModel):
    borrower_id: int
    consent_type: str
    accepted: bool

class UserLogin(BaseModel):
    email: str
    password: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

# FastAPI App
app = FastAPI(title="Smart Loan Evaluation System", version="1.0.0", lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "loan-evaluation-api"}

# Authentication
@app.post("/api/auth/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Mock login endpoint - replace with actual authentication"""
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        user = User(email=credentials.email, password_hash="hashed_password", full_name=credentials.email.split("@")[0])
        db.add(user)
        db.commit()
        db.refresh(user)
    
    token = jwt.encode(
        {"sub": user.id, "exp": datetime.utcnow() + timedelta(days=7)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {"access_token": token, "token_type": "bearer", "user_id": user.id}

@app.post("/api/auth/signup")
def signup(credentials: UserLogin, db: Session = Depends(get_db)):
    """Register new user"""
    existing_user = db.query(User).filter(User.email == credentials.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(email=credentials.email, password_hash="hashed_password", full_name=credentials.email.split("@")[0])
    db.add(user)
    db.commit()
    db.refresh(user)
    
    token = jwt.encode(
        {"sub": user.id, "exp": datetime.utcnow() + timedelta(days=7)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {"access_token": token, "token_type": "bearer", "user_id": user.id}

# Borrower Endpoints
@app.post("/api/borrowers")
def create_borrower(borrower: BorrowerCreate, token: str, db: Session = Depends(get_db)):
    """Create new borrower"""
    user_id = get_current_user(token)
    db_borrower = Borrower(**borrower.dict(), created_by=user_id)
    db.add(db_borrower)
    db.commit()
    db.refresh(db_borrower)
    
    # Log audit
    audit = AuditLog(action="create", entity_type="borrower", entity_id=db_borrower.id, created_by=user_id)
    db.add(audit)
    db.commit()
    
    return {"id": db_borrower.id, "message": "Borrower created successfully"}

@app.get("/api/borrowers/{borrower_id}")
def get_borrower(borrower_id: int, token: str, db: Session = Depends(get_db)):
    """Get borrower details"""
    user_id = get_current_user(token)
    borrower = db.query(Borrower).filter(Borrower.id == borrower_id).first()
    if not borrower:
        raise HTTPException(status_code=404, detail="Borrower not found")
    return borrower

@app.get("/api/borrowers")
def list_borrowers(token: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """List all borrowers"""
    user_id = get_current_user(token)
    borrowers = db.query(Borrower).offset(skip).limit(limit).all()
    return borrowers

# Prediction Endpoint
@app.post("/api/predictions")
def create_prediction(request: PredictionRequest, token: str, db: Session = Depends(get_db)):
    """Generate loan prediction with SHAP explainability"""
    user_id = get_current_user(token)
    
    # Prepare features for model
    features = np.array([[
        request.age or 0,
        request.months_with_mpesa_history or 0,
        request.mpesa_txn_count_30d or 0,
        request.mpesa_total_amount_30d or 0,
        request.mpesa_avg_txn_amount_30d or 0,
        request.airtime_spend_30d or 0,
        request.utility_bill_amount_30d or 0,
        request.savings_balance or 0,
        request.loan_amount_applied or 0,
        request.previous_defaults_count or 0,
        request.late_payments_12m or 0,
        1 if request.has_smartphone == "yes" else 0,
        1 if request.employment_status == "employed" else 0,
        1 if request.education_level == "tertiary" else 0,
    ]])
    
    # Get prediction
    prediction_prob = mock_model.predict_proba(features)[0]
    default_prob = prediction_prob[1]
    
    # Determine risk level
    if default_prob < 0.3:
        risk_level = "Low"
    elif default_prob < 0.6:
        risk_level = "Medium"
    else:
        risk_level = "High"
    
    # Generate SHAP explanations
    explainer = shap.TreeExplainer(mock_model)
    shap_values = explainer.shap_values(features)
    
    # Store prediction
    db_prediction = Prediction(
        borrower_id=request.borrower_id,
        prediction_score=float(default_prob),
        default_probability=float(default_prob * 100),
        risk_level=risk_level,
        created_by=user_id
    )
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    
    # Log consents
    for consent_type, accepted in [
        ("data_privacy", request.data_privacy_consent),
        ("mpesa_verification", request.mpesa_verification_consent),
        ("data_sharing", request.data_sharing_consent),
    ]:
        consent = ConsentLog(
            borrower_id=request.borrower_id,
            consent_type=consent_type,
            accepted=accepted,
            created_by=user_id
        )
        db.add(consent)
    
    # Audit log
    audit = AuditLog(
        action="predict",
        entity_type="prediction",
        entity_id=db_prediction.id,
        details=f"Risk Level: {risk_level}",
        created_by=user_id
    )
    db.add(audit)
    db.commit()
    
    # Format SHAP values for frontend
    feature_names = [
        "age", "months_mpesa", "txn_count", "total_amount", "avg_amount",
        "airtime", "utility", "savings", "loan_amount", "defaults", "late_payments",
        "has_smartphone", "employed", "tertiary_edu"
    ]
    
    shap_data = []
    if isinstance(shap_values, list):
        shap_for_class = shap_values[1][0]
    else:
        shap_for_class = shap_values[0]
    
    for i, (name, value) in enumerate(zip(feature_names, shap_for_class)):
        shap_data.append({"feature": name, "shap_value": float(value), "feature_value": float(features[0][i])})
    
    return {
        "prediction_id": db_prediction.id,
        "default_probability": float(default_prob * 100),
        "risk_level": risk_level,
        "shap_explanation": shap_data,
        "message": "Prediction generated successfully"
    }

# Consent Endpoint
@app.post("/api/consents")
def record_consent(request: ConsentRequest, token: str, db: Session = Depends(get_db)):
    """Record consent for data processing"""
    user_id = get_current_user(token)
    consent = ConsentLog(
        borrower_id=request.borrower_id,
        consent_type=request.consent_type,
        accepted=request.accepted,
        created_by=user_id
    )
    db.add(consent)
    db.commit()
    
    audit = AuditLog(
        action="consent_recorded",
        entity_type="consent",
        entity_id=consent.id,
        details=f"Type: {request.consent_type}, Accepted: {request.accepted}",
        created_by=user_id
    )
    db.add(audit)
    db.commit()
    
    return {"consent_id": consent.id, "message": "Consent recorded successfully"}

# Audit Endpoint
@app.get("/api/audit-logs")
def get_audit_logs(token: str, skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """Get system audit logs"""
    user_id = get_current_user(token)
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).offset(skip).limit(limit).all()
    return logs

@app.get("/api/consent-logs/{borrower_id}")
def get_consent_logs(borrower_id: int, token: str, db: Session = Depends(get_db)):
    """Get consent history for borrower"""
    user_id = get_current_user(token)
    consents = db.query(ConsentLog).filter(ConsentLog.borrower_id == borrower_id).all()
    return consents

# Batch Processing Endpoint
@app.post("/api/batch-process")
async def batch_process(file: UploadFile = File(...), token: str = None, db: Session = Depends(get_db)):
    """Process batch of borrowers from CSV"""
    user_id = get_current_user(token)
    
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
    
    results = []
    for idx, row in df.iterrows():
        try:
            # Create borrower
            borrower = Borrower(
                name=row.get('name'),
                phone=row.get('phone'),
                national_id=row.get('national_id'),
                age=int(row.get('age', 0)) if pd.notna(row.get('age')) else None,
                gender=row.get('gender'),
                education_level=row.get('education_level'),
                employment_status=row.get('employment_status'),
                has_smartphone=row.get('has_smartphone'),
                created_by=user_id
            )
            db.add(borrower)
            db.flush()
            
            # Generate prediction
            features = np.array([[
                int(row.get('age', 0)) if pd.notna(row.get('age')) else 0,
                int(row.get('months_with_mpesa_history', 0)) if pd.notna(row.get('months_with_mpesa_history')) else 0,
                int(row.get('mpesa_txn_count_30d', 0)) if pd.notna(row.get('mpesa_txn_count_30d')) else 0,
                float(row.get('mpesa_total_amount_30d', 0)) if pd.notna(row.get('mpesa_total_amount_30d')) else 0,
                float(row.get('mpesa_avg_txn_amount_30d', 0)) if pd.notna(row.get('mpesa_avg_txn_amount_30d')) else 0,
                float(row.get('airtime_spend_30d', 0)) if pd.notna(row.get('airtime_spend_30d')) else 0,
                float(row.get('utility_bill_amount_30d', 0)) if pd.notna(row.get('utility_bill_amount_30d')) else 0,
                float(row.get('savings_balance', 0)) if pd.notna(row.get('savings_balance')) else 0,
                float(row.get('loan_amount_applied', 0)) if pd.notna(row.get('loan_amount_applied')) else 0,
                int(row.get('previous_defaults_count', 0)) if pd.notna(row.get('previous_defaults_count')) else 0,
                int(row.get('late_payments_12m', 0)) if pd.notna(row.get('late_payments_12m')) else 0,
                1 if row.get('has_smartphone') == 'yes' else 0,
                1 if row.get('employment_status') == 'employed' else 0,
                1 if row.get('education_level') == 'tertiary' else 0,
            ]])
            
            prediction_prob = mock_model.predict_proba(features)[0][1]
            risk_level = "Low" if prediction_prob < 0.3 else ("Medium" if prediction_prob < 0.6 else "High")
            
            prediction = Prediction(
                borrower_id=borrower.id,
                prediction_score=float(prediction_prob),
                default_probability=float(prediction_prob * 100),
                risk_level=risk_level,
                created_by=user_id
            )
            db.add(prediction)
            
            results.append({
                "borrower_id": borrower.id,
                "name": row.get('name'),
                "prediction_score": float(prediction_prob),
                "risk_level": risk_level,
                "status": "success"
            })
        except Exception as e:
            results.append({
                "name": row.get('name'),
                "status": "failed",
                "error": str(e)
            })
    
    db.commit()
    
    audit = AuditLog(
        action="batch_process",
        entity_type="batch",
        entity_id=0,
        details=f"Processed {len(results)} records",
        created_by=user_id
    )
    db.add(audit)
    db.commit()
    
    return {"processed": len(results), "results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
