
# 🐾 Virtual Pet Assistant

A full-stack **Virtual Pet Assistant** application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This smart virtual assistant simulates the experience of caring for a digital pet, allowing users to interact with their virtual buddy while learning about responsible pet ownership in a fun and engaging way!

---

## 📌 Features

- 🐶 Create and customize your virtual pet
- 🕒 Track pet activities and daily routine
- 🥗 Manage food and health status
- 🎮 Interactive UI with animations
- ☁️ Backend API with persistent data via MongoDB

---

## 🚀 Tech Stack

**Frontend**
- React.js (with Vite)
- Tailwind CSS
- JavaScript

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Other Tools**
- ESLint
- PostCSS

---

## 📁 Folder Structure

```
virtual_pet_assistant/
├── client/          # Frontend using React and Vite
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/          # Backend API using Express
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json     # Root config for dependencies and scripts
```

---

## 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/Aryan030204/CSC301_Seminar_22CSU031_Virtual_pet_assistant
cd virtual-pet-assistant
```

### 1. Install server dependencies

```bash
cd server
npm install
```

### 2. Install client dependencies

```bash
cd client
npm install
```

---

## 🧪 Usage

### Start the backend server

```bash
cd server
npm start
```

### Start the frontend

```bash
cd ../client
npm run dev
```

Open your browser and visit `http://localhost:5173`

---

## 🧠 Learnings

This project was developed as part of a seminar with the aim to create an engaging and interactive **Virtual Pet Assistant** that showcases the real-world applications of full-stack web development. Through this project, we explored and implemented the following key concepts:

- Building a responsive and user-friendly UI using **React** and **Tailwind CSS**.
- Managing state and interactivity in a dynamic environment where pet stats and behaviors change in real-time.
- Creating a robust **RESTful API** using **Express.js** to handle data related to the pet’s status, actions, and history.
- Storing and retrieving persistent data with **MongoDB** and **Mongoose**, simulating real-life scenarios like feeding, playing, and tracking pet health.
- Structuring a scalable MERN application with a clean codebase and modular architecture.
- Gaining hands-on experience in both frontend and backend development, along with seamless integration between the two.

This project served as a fun and educational way to learn about full-stack development while designing a meaningful and playful user experience.
