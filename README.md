🐄 Livestock Health Monitoring System Using Wearable Sensors
📌 Project Overview

The Livestock Health Monitoring System is a web-based application developed to monitor and manage the health status of farm animals using wearable sensor data.

The system tracks important health parameters such as:

Animal Name
Animal ID

Heart Rate

Body Temperature

Based on the temperature and heart rate values, the system automatically determines whether the animal is:

✅ Healthy

⚠️ Fever

This helps farmers detect health issues early and take necessary action.

🎯 Objective

The main objective of this project is to:

Monitor livestock health in real-time

Reduce manual checking efforts

Detect fever or abnormal conditions early

Provide a secure multi-user access system

🛠️ Technologies Used
💻 Frontend

HTML – Structure of the web pages

CSS – Styling and layout design

JavaScript – Logic implementation and dynamic updates

🔐 Authentication

Firebase Authentication

User Login

User Signup

Secure access for different users

🗄️ Database

Firebase (Firestore / Realtime Database)

Stores animal health data

Stores user information

Real-time data updates

🌐 Deployment

GitHub

GitHub Pages

Used to host the website online

⚙️ System Working

User creates an account using Signup.

User logs in securely using Firebase Authentication.

User enters animal details (Name, ID, Heart Rate, Temperature).

Data is stored in Firebase Database.

JavaScript automatically checks temperature:

If temperature > normal range → Status: Fever

Otherwise → Status: Healthy

Data is displayed dynamically on the main dashboard.

Project link:
 https://hima-bhindu.github.io/live-stock-health-monitoring/
 
 🔒 Security Features

Only authenticated users can access data.

Data is stored securely in Firebase cloud database.

Different users have separate login credentials.

🚀 Key Features

Real-time data storage

Automatic health status detection

Multi-user authentication system

Cloud-based database

Responsive web interface

🎓 Conclusion

This project demonstrates how modern web technologies and cloud services can be used to build a smart livestock monitoring system. It provides a simple, secure, and efficient way to track animal health and helps farmers improve livestock management.


