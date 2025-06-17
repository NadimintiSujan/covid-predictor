# 🧠 Covid Severity Predictor — Full-Stack ML Web App

This is a full-stack machine learning web app that predicts the severity of COVID-19 based on user-reported symptoms.

## 🧩 Tech Stack

- **Frontend**: React (hosted on AWS S3)
- **Backend**: Flask + scikit-learn (Dockerized, on AWS EC2)
- **ML**: Trained classifier using real COVID data
- **Deployment**: Docker (compose), EC2, S3, GitHub

## 🚀 How It Works

Users submit symptoms via a React form → backend receives JSON → model returns "Mild", "Moderate", or "Severe".

## 🐳 Deployment

- 'docker-compose up' to run locally
- S3 hosts frontend static site
- EC2 runs backend in Docker container
