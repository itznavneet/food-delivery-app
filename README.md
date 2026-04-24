# Food Delivery Project

A full-stack food ordering platform with three separate apps:

- `frontend` - customer-facing React app
- `admin` - React admin dashboard for managing menu items and orders
- `backend` - Express + MongoDB API with authentication, cart handling, image upload, and Stripe checkout

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Admin: React, Vite, React Router, Axios, React Toastify
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT, bcrypt
- Payments: Stripe Checkout
- Media storage: Cloudinary

## Features

- Browse food items by category
- Add and remove items from cart
- User registration and login
- Persist cart data for logged-in users
- Place orders with delivery details
- Stripe-based checkout flow
- View personal order history
- Admin dashboard for adding food items
- Admin dashboard for listing menu items
- Admin dashboard for removing food items
- Admin dashboard for viewing all orders
- Admin dashboard for updating order status
- Cloudinary image upload for food items

## Project Structure

```text
Food-delivery/
|-- frontend/   # Customer app
|-- admin/      # Admin dashboard
|-- backend/    # API server
`-- README.md
```

## Prerequisites

Make sure these are installed before starting:

- Node.js 18+
- npm
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account
- Stripe account

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

Create a `.env` file inside both `frontend` and `admin` if you want to override the default API URL:

```env
VITE_API_URL=http://localhost:4000
```

Notes:

- The backend defaults to port `4000`.
- The frontend is expected on `http://localhost:5173`.
- The admin panel is expected on `http://localhost:5174`.
- CORS is configured to allow those local URLs plus `FRONTEND_URL` and `ADMIN_URL`.

## Installation

Install dependencies in each app:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

```bash
cd admin
npm install
```

## Running the Project

Start the backend:

```bash
cd backend
npm run server
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Start the admin dashboard:

```bash
cd admin
npm run dev
```

## Available Scripts

### Backend

```bash
npm run start
npm run server
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Admin

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Main API Routes

### Food

- `GET /api/food/list` - get all food items
- `POST /api/food/add` - add a food item with image upload
- `POST /api/food/remove` - remove a food item

### User

- `POST /api/user/register` - create a new account
- `POST /api/user/login` - sign in

### Cart

- `POST /api/cart/add` - add item to cart
- `POST /api/cart/remove` - remove item from cart
- `POST /api/cart/get` - get logged-in user's cart

### Orders

- `POST /api/order/place` - create a new order and Stripe checkout session
- `POST /api/order/verify` - verify payment result
- `POST /api/order/userorders` - get logged-in user's orders
- `GET /api/order/list` - get all orders for admin
- `POST /api/order/status` - update order status

## How the Flow Works

1. Users browse menu items in the frontend.
2. Logged-in users can manage their cart.
3. On checkout, the frontend sends order data to the backend.
4. The backend creates a Stripe Checkout session.
5. After payment, Stripe redirects the user to `/verify`.
6. The frontend calls the backend to confirm payment status.
7. The admin panel can monitor and update order progress.

## Important Notes

- Food images are uploaded to Cloudinary using in-memory `multer` storage.
- The backend still contains an `uploads/` folder, but the current food upload flow uses Cloudinary.
- `food.price` is stored as a string in the database schema.
- Stripe line item amounts are currently calculated in the backend using a custom multiplier.

## Future Improvements

- Add role-based admin authentication
- Add quantity controls and stock management
- Improve payment amount handling and currency conversion logic
- Add Docker support
- Add automated tests
- Add deployment instructions

## Author

Built as a full-stack food delivery project using React, Express, MongoDB, Stripe, and Cloudinary.
