# 🏦 Loan Default Prediction System

A machine learning–powered web application designed to help **SACCOs and financial institutions** assess the **risk of loan default** using **alternative data** such as M-Pesa transactions, airtime usage, and bill payment patterns.

This project combines **Flask (Python)** for the backend and **React (JavaScript)** for the frontend, integrating explainable AI (XAI) techniques to improve transparency in loan approval decisions.

**Live Project Link :**
https://v0-loan-evaluation-system.vercel.app/
---

## 🚀 Features

### 🌐 Frontend (React)

* User-friendly dashboard for loan officers to input applicant details.
* Real-time loan risk prediction based on user input.
* Visual display of prediction probability and risk level (e.g., Low / Medium / High Risk).
* Clean, responsive UI (built with React + Tailwind).
* Connection to Flask backend through RESTful APIs.

### ⚙️ Backend (Flask)

* REST API endpoints for loan prediction.
* Pre-trained machine learning model (e.g., Random Forest / Logistic Regression).
* Model explainability using SHAP or LIME (optional).
* Data preprocessing pipeline for cleaning and transforming user input.

### 🧠 Machine Learning

* Trained using real or simulated financial data (e.g., income, savings, mobile transactions).
* Model evaluation metrics: Accuracy, Precision, Recall, F1-score, ROC-AUC.
* Saved model serialized using `joblib`.

---

## 🧩 Project Structure

```
loan-default-app/
│
├── loan-default-backend/
│   ├── app.py                 # Main Flask app entry point
│   ├── model/                 # Trained ML model (.pkl or .joblib)
│   ├── static/                # Static files (if needed)
│   ├── templates/             # HTML templates (if Flask renders pages)
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Backend-specific documentation
│
├── loan-default-frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Application pages (e.g., Home, Results)
│   │   ├── App.jsx            # Main React app file
│   │   └── index.js           # Entry point
│   ├── package.json           # Frontend dependencies and scripts
│   └── README.md              # Frontend-specific documentation
│
├── venv/                      # Virtual environment (Python)
├── .gitignore
└── README.md                  # Main project documentation (this file)
```

---

## ⚙️ Installation & Setup

### 🔹 Prerequisites

* Python 3.10+
* Node.js + npm
* Git

### 🔹 Clone the Repository

```bash
git clone https://github.com/<your-username>/loan-default-app.git
cd loan-default-app
```

---

### 🧠 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/Scripts/activate      # For Windows
   # or
   source venv/bin/activate          # For macOS/Linux
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:

   ```bash
   python app.py
   ```

   The backend will run on `http://127.0.0.1:5000`

---

### 💻 Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd loan-default-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:5173` or `http://localhost:3000` (depending on setup).

4. The frontend interacts with the Flask backend via API calls (e.g., `http://127.0.0.1:5000/predict`).

---

## 🧪 API Endpoints

| Method | Endpoint   | Description                                         |
| ------ | ---------- | --------------------------------------------------- |
| POST   | `/predict` | Predicts loan default risk based on input features. |
| GET    | `/health`  | Checks backend server status.                       |

**Example Request:**

```json
POST /predict
{
  "age": 35,
  "income": 55000,
  "loan_amount": 20000,
  "mpesa_activity": 120,
  "airtime_spend": 800,
  "bill_payment": 5
}
```

**Example Response:**

```json
{
  "prediction": "High Risk",
  "probability": 0.82
}
```

---

## 📊 Model Training

You can train your own model by using the dataset and running the `train_model.ipynb` notebook (if included).
The trained model should be saved in the `model/` directory as `model.joblib`.

---

## 🧰 Tech Stack

**Frontend:** React, Tailwind CSS, Axios
**Backend:** Flask, scikit-learn, pandas, numpy, joblib
**Other Tools:** Git, VS Code, Postman

---


**Live Project Link :**
https://v0-loan-evaluation-system.vercel.app/


## 👩‍💻 Author

**Catherine Mutheu Muindi**
Bachelor of Business Information Technology (BBIT) – Strathmore University
📧 [catherine.muindi@strathmore.edu](mailto:catherine.muindi@strathmore.edu)
🌍 [GitHub](https://github.com/<your-username>)

---


