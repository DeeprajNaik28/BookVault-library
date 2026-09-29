# 📚 BookVault

BookVault is a cloud-based Book Library application designed to demonstrate **Docker, Google Cloud Virtual Machines, Cloud Storage, IAM, and frontend-backend communication**.

The application is deployed across two separate Virtual Machines. The frontend VM has read-only access to the Google Cloud Storage bucket, while the backend VM has read and write access.

## 🏗️ Architecture

```text
                         Google Cloud
                              │
                              ▼
                    ┌──────────────────┐
                    │  Cloud Storage   │
                    │      Bucket      │
                    │                  │
                    │   books.json     │
                    └───────┬──────────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
             READ ONLY            READ + WRITE
                 │                     │
        ┌────────▼────────┐    ┌───────▼────────┐
        │   Frontend VM   │    │   Backend VM   │
        │                 │    │                │
        │     Docker      │    │     Docker     │
        │                 │    │                │
        │ HTML/CSS/JS     │    │ Node.js        │
        │ Node.js         │    │ Express        │
        └────────┬────────┘    └───────┬────────┘
                 │                     │
                 │      API Requests   │
                 └────────────────────►│

```

## ✨ Features

- 📚 View available books
- 🔎 Search books
- ➕ Add new books
- 🗑️ Delete books
- ☁️ Google Cloud Storage based data storage
- 🔐 IAM-based access control
- 🐳 Dockerized frontend and backend
- 🖥️ Separate Virtual Machines for frontend and backend
- 🔄 Frontend-to-backend API communication
- 🔒 Different permissions for frontend and backend

##🛠️ Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Cloud Storage: Google Cloud Storage
- Cloud Platform: Google Cloud Platform
- Containers: Docker
- Virtual Machines: Google Compute Engine
- Authentication & Authorization: Google Cloud IAM
- Version Control: Git & GitHub


## 📁 Project Structure

BookVault/
│
├── books.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
└── .gitignore

## 🔐 Access Control

BookVault uses separate Google Cloud service accounts for the two applications.

**Frontend**

The frontend VM uses a service account with:

Storage Object Viewer

Permissions:

Read     ✓
Create   ✗
Update   ✗
Delete   ✗

**Backend**

The backend VM uses a service account with:

Storage Object Admin

Permissions:

Read     ✓
Create   ✓
Update   ✓
Delete   ✓

This separation prevents the frontend application from directly modifying the stored data.

## 🔄 Application Flow

**Reading Books**

User
 ↓
Frontend VM
 ↓
Frontend Docker Container
 ↓
Google Cloud Storage
 ↓
books.json

**Adding or Modifying Books**

User
 ↓
Frontend
 ↓
Backend API
 ↓
Backend VM
 ↓
Backend Docker Container
 ↓
Google Cloud Storage
 ↓
books.json

## 🐳 Docker

Both applications are containerized separately.

Frontend VM
└── Frontend Docker Container

Backend VM
└── Backend Docker Container

## ☁️ Google Cloud Components

The project uses:

- Google Compute Engine
- Google Cloud Storage
- Google Cloud IAM
- Cloud Storage Bucket
- Service Accounts
- VPC/Firewall networking