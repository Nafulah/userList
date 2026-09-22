# MERN on Azure - Final

A full-stack MERN application deployed on Microsoft Azure App Service with MongoDB Atlas.

**Author:** Adelight Nafula
**Live URL:** `https://userlist-adel.azurewebsites.net` (replace with your actual Azure URL)
**Local URL:** `http://localhost:5000`

## 🚀 Features

- Add User with First Name, Last Name, Age, Email, Gender
- List all users from MongoDB
- Delete user functionality
- Connected to MongoDB Atlas
- Deployed on Azure App Service (Linux, Node 22 LTS)

## 🛠 Tech Stack

**Frontend:** HTML, CSS, JavaScript (React-like form)
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas
**Cloud:** Azure App Service - Free Tier F1
**Region:** South Africa North

## 📦 Installation (Local)

```bash
# Clone repo
git clone https://github.com/your-username/userList.git
cd userList

# Install dependencies
npm install

# Create.env file
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/userListDB.
