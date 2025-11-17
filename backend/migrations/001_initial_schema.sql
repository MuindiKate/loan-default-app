-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Borrowers table
CREATE TABLE IF NOT EXISTS borrowers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(20),
  national_id VARCHAR(50) UNIQUE,
  age INTEGER,
  gender VARCHAR(50),
  education_level VARCHAR(100),
  employment_status VARCHAR(100),
  has_smartphone VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);

-- Predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id SERIAL PRIMARY KEY,
  borrower_id INTEGER REFERENCES borrowers(id),
  prediction_score FLOAT,
  default_probability FLOAT,
  risk_level VARCHAR(50),
  mpesa_statement_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);

-- Consent logs table
CREATE TABLE IF NOT EXISTS consent_logs (
  id SERIAL PRIMARY KEY,
  borrower_id INTEGER REFERENCES borrowers(id),
  consent_type VARCHAR(100),
  accepted BOOLEAN,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  action VARCHAR(100),
  entity_type VARCHAR(100),
  entity_id INTEGER,
  details TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_borrowers_national_id ON borrowers(national_id);
CREATE INDEX IF NOT EXISTS idx_predictions_borrower_id ON predictions(borrower_id);
CREATE INDEX IF NOT EXISTS idx_consent_logs_borrower_id ON consent_logs(borrower_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
