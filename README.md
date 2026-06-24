Food Ordering Web Application

A full-stack web application that allows users to browse restaurants, view menus, 
customize food items, and place orders through a smooth and responsive interface. 
The system also includes authentication, cart management, and order tracking features.
Features
User authentication (Login / Register)
Browse restaurants and menus
Food item customization (ingredients selection)
Add to cart & manage quantity
Place orders securely
Order history tracking
Restaurant-side food & category management
Availability toggle for food items
Responsive UI for all devices

Frontend
React.js
Redux (State Management)
Material UI
Tailwind CSS
Axios

Backend
Node.js
Express.js
REST APIs
JWT Authentication
Razorpay Integration (for payments)

Database
MongoDB (Mongoose ODM)

Food-Ordering-Website/
│
├── backend/        # Server-side code (APIs, controllers, models)
├── frontend/       # Client-side React application

git clone https://github.com/your-username/food-ordering-website.git
cd food-ordering-website

cd backend
npm install
npm start

PORT=5454
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key

cd frontend
npm install
npm start

/screenshots/home.png
/screenshots/menu.png
/screenshots/cart.png

Future Improvements
Real-time order tracking
Admin dashboard
Delivery partner module
Live notifications

Author
Vaishnavi Pawar

Note
This project is built for learning and portfolio purposes,
showcasing full-stack web development skills with real-world architecture.
