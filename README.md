## 🚀 Starting the Backend

Follow these steps to start the backend server:

```bash
cd backend
npm install
node server.js
```
---
## 🚀 Starting the Frontend

Follow these steps to start the frontend application:

```bash
cd frontend
npm install
npm run dev
```
---
## 📫 Backend API Routes

### 🔐 Auth Routes
| Method | Path               | Description           |
|--------|--------------------|-----------------------|
| POST   | /api/auth/register | Register a new user   |
| POST   | /api/auth/login    | Log in a user         |

---

### 👤 User Routes
| Method | Path             | Description              |
|--------|------------------|--------------------------|
| GET    | /api/users       | Get all users (Admin)    |
| GET    | /api/users/:id   | Get a single user        |
| PUT    | /api/users/:id   | Update user profile      |
| DELETE | /api/users/:id   | Delete a user (Admin)    |

---

### 📝 Post Routes
| Method | Path             | Description              |
|--------|------------------|--------------------------|
| GET    | /api/posts       | Get all blog posts       |
| GET    | /api/posts/:id   | Get a single post        |
| POST   | /api/posts       | Create a new post        |
| PUT    | /api/posts/:id   | Update a post (Author)   |
| DELETE | /api/posts/:id   | Delete a post (Author)   |

---

