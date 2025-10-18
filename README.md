#Roxiler Systems Coding Challenge – Store Rating & Search App

This project is a **Store Management and Rating Web Application** built as part of the **Roxiler Systems Coding Challenge**.  
It allows users to **view all stores**, **rate them**, and **search stores by name**, with data stored in a **MySQL database** using a **Spring Boot + Sequelize (Node.js) backend** and a **React.js frontend**.

---

## Features

### User Features
- View all available stores.
- Search stores by name.
- View store ratings and details.
- Personalized search history stored using userId (in backend).

### Store Owner Features
- Dashboard showing all registered stores.
- Displays average ratings and other details of each store.

### Backend Features
- RESTful APIs using **Express.js & Sequelize ORM**.
- JWT authentication (for secure access).
- Supports user-based search history tracking.

---

##  Tech Stack

| Category | Technologies Used |
|-----------|------------------|
| **Frontend** | React.js, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js, Sequelize ORM |
| **Database** | MySQL |
| **Authentication** | JWT |
| **Environment** | dotenv |

---

## Folder Structure

```
 project-root
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api.js
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
---

### 🖥️ 2. Backend Setup
```bash
cd backend
npm install
```

#### Configure environment file:
Create a `.env` file in the `backend` folder:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=rating_platform
JWT_SECRET=your_jwt_secret
```

#### Run backend server:
```bash
npm start
```

---

### 💻 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
This will start the React app on **http://localhost:5173**

---

## How to Add Stores (Important)
Currently, the **“Add New Store”** page is **not implemented**.  
To test the application, you can **manually add stores** in one of the following ways:

### Option 1: Using Postman
**POST** request to:
```
http://localhost:5000/api/stores/add
```

**Body (JSON):**
```json
{
  "name": "TechZone",
  "email": "techzone@example.com",
  "address": "Pune, Maharashtra",
  "ownerId": 1
}
```

---

### Option 2: Using MySQL Query
Run the following SQL in your MySQL console:
```sql
INSERT INTO Stores (name, email, address, ownerId)
VALUES ('TechZone', 'techzone@example.com', 'Pune, Maharashtra', 1);
```

You can then view it from your **Owner Dashboard** in the frontend.

---

## Screenshots

| Page | Description |
|------|--------------|
| **Store List Page** | Displays all available stores with search functionality. |
| **Owner Dashboard** | Displays all stores added by the owner with styling using Tailwind CSS. |

---


## Final Notes
> The project fulfills the main challenge requirements for displaying, searching, and managing store data.  
> Store addition is temporarily handled via Postman or SQL, and the frontend page will be implemented in the next iteration.
