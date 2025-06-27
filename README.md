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


### Screen shots

### Signup Page

![image](https://github.com/user-attachments/assets/66db4f0d-8473-4db7-b4a1-22721f2ac970)



### Login Page

![image](https://github.com/user-attachments/assets/728549c3-ba00-4b6a-9780-fc663360920f)


### Blogs for users

![image](https://github.com/user-attachments/assets/8fc1f84d-d100-4b6a-a645-0514a0c00bf0)


### Admin Dashboard
![image](https://github.com/user-attachments/assets/b34c2d41-3281-4e1f-aefc-bd3080d00df6)

### Admin can create, update and delete blogs

![image](https://github.com/user-attachments/assets/d4d61904-bc82-4867-93b5-d99c8608e95b)

