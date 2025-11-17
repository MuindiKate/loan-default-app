# Smart Loan Evaluation System - FastAPI Backend

## Overview
FastAPI backend for the Smart Loan Evaluation System with ML predictions, SHAP explainability, and audit logging.

## Features
- User authentication (JWT)
- Borrower management
- Loan predictions with ML model
- SHAP feature importance explanations
- Batch processing from CSV
- Consent and audit logging
- PostgreSQL database with SQLAlchemy ORM

## Setup

### Prerequisites
- Python 3.11+
- PostgreSQL
- pip

### Installation
\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

### Environment Variables
Create a `.env` file:
\`\`\`
DATABASE_URL=postgresql://user:password@localhost:5432/loan_db
SECRET_KEY=your-secret-key-change-in-production
ENVIRONMENT=development
\`\`\`

### Database Setup
\`\`\`bash
psql -U postgres -d loan_db -f migrations/001_initial_schema.sql
\`\`\`

### Running the Server
\`\`\`bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

Visit http://localhost:8000/docs for API documentation.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user

### Borrowers
- `POST /api/borrowers` - Create borrower
- `GET /api/borrowers` - List borrowers
- `GET /api/borrowers/{id}` - Get borrower details

### Predictions
- `POST /api/predictions` - Generate prediction with SHAP

### Batch Processing
- `POST /api/batch-process` - Process CSV of borrowers

### Audit & Consent
- `GET /api/audit-logs` - Get audit logs
- `POST /api/consents` - Record consent
- `GET /api/consent-logs/{borrower_id}` - Get consent history

## Deployment

### Docker
\`\`\`bash
docker build -t loan-api .
docker run -p 8000:8000 --env-file .env loan-api
\`\`\`

### Render
1. Connect GitHub repository
2. Set environment variables in Render dashboard
3. Deploy

## Notes
- The ML model is currently a mock RandomForest. Replace with your trained model.
- JWT tokens expire in 7 days.
- All endpoints require authentication token in header: `Authorization: Bearer {token}`
