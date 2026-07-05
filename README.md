# 🌍 Carbon Footprint Tracker

A Full Stack Carbon Footprint Tracking System that helps users monitor and reduce their carbon emissions by recording daily activities such as transportation, electricity usage, and food consumption.

## 🚀 Project Status

🟢 Authentication Module Completed

### ✅ Completed Features
- User Registration
- User Login
- JWT Authentication
- Password Encryption using BCrypt
- Role-Based Authentication (USER & ADMIN)
- Spring Security Integration
- MySQL Database Integration
- REST APIs for Authentication

### 🚧 Upcoming Features
- Activity Tracking
- Carbon Emission Calculator
- Dashboard
- Reports & Analytics
- Goals & Achievements
- Admin Panel

---

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot 3.5.3
- Spring Security
- Spring Data JPA
- JWT (JSON Web Token)
- MySQL
- Maven

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

---

## 📂 Project Structure

```
CarbonFootprintAnalysis
│
├── Backend
│   └── carbonfootprint
│
└── frontend
    └── footprint
```

---

## 🔐 Authentication Flow

```
User Login
      │
      ▼
Spring Security
      │
      ▼
JWT Token Generated
      │
      ▼
Frontend Stores Token
      │
      ▼
Protected APIs
```

---

## ⚙️ Backend Setup

```bash
cd Backend/carbonfootprint
```

Run the application:

```bash
./mvnw spring-boot:run
```

---

## ⚙️ Frontend Setup

```bash
cd frontend/footprint
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

---

## 📌 Current Progress

| Module | Status |
|---------|--------|
| Authentication | ✅ Completed |
| JWT Security | ✅ Completed |
| User Roles | ✅ Completed |
| Activity Module | 🚧 In Progress |
| Dashboard | ⏳ Pending |
| Reports | ⏳ Pending |
| Admin Panel | ⏳ Pending |

---

## 👩‍💻 Developed By

**Pavithra K**

Computer Science Engineering Student

KPR Institute of Engineering and Technology

---

## ⭐ Future Enhancements

- AI-based Carbon Footprint Suggestions
- Monthly Carbon Reports
- Leaderboard
- Gamification
- Carbon Reduction Goals
- Email Notifications
- Data Visualization Dashboard
