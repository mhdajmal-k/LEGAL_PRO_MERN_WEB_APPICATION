# LegalPro Backend

Welcome to the **LegalPro Backend** repository. This backend powers the **LegalPro** platform, a comprehensive solution for legal service booking that connects users with qualified advocates. It provides secure APIs for user authentication, advocate management, booking appointments, and seamless communication.

---

## 🚀 Features

- **Role-Based Portals**: Backend support for User, Admin, and Advocate roles.
- **Authentication & Authorization**: Secure login and session management using **JWT**.
- **Real-Time Communication**: Integrated **Socket.io** and **WebRTC** for messaging and video conferencing.
- **Appointment Management**: Bookings, document uploads, and schedule synchronization.
- **Payment Gateway**: Fast and secure transactions using **RazorPay**.
- **Cloud Storage**: Secure storage of legal documents and multimedia with **AWS S3**.
- **AI-Powered Legal Search**: Advanced search for legal information.
- **Admin Tools**: User and advocate management, analytics, and system monitoring.
- **Robust Error Handling**: Ensures system reliability and proper feedback to users.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Communication**: WebRTC, Socket.io
- **Payment Gateway**: RazorPay
- **Cloud Storage**: AWS S3
- **UI Form Management**: Formik
- **API Testing**: Postman
- **Deployment**: Nginx

---

## ⚙️ Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB instance
- AWS account for S3 bucket
- RazorPay account for payment integration
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/legalpro-backend](https://github.com/mhdajmal-k/LEGAL_PRO_MERN_WEB_APPICATION.git
   cd legalpro-backend

Install dependencies:
npm install

Configure environment variables:

Create a .env file in the root directory.
Add the following variables:
env

Copy 
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_s3_bucket_name
Start the development server:

bash

npm run dev

Test the APIs using Postman or any API client:
http://localhost:3000

🚦 API Endpoints
Authentication example
POST /api/user/auth/singup: Register a new user/advocate.
POST /api/user/auth/login: Login for users, admins, and advocates.
