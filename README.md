# Apexcart E-commerce Project

We got a brief from a client to build an apexcart ecommerce project.

# PHASE 1 — STUDYING THE BRIEF

First we translate business language into technical systems.

The client said:

“I want an ecommerce backend application.”

From the Client's Software Requirement Specifications (SRC) brief we found 
what the client actually needs and translate them into technical meaning.

Business Requirement	                Technical Meaning

1. Users can signup/login	            Authentication system
2. JWT token protection	                Authorization middleware
3. Browse products	                    Product APIs
4. Persistent cart	                    Cart collection in MongoDB
5. Admin CRUD products	                Admin routes + RBAC
6. Inventory stock	                    Product stock management
7. Prevent overselling	                Backend validation logic
8. Checkout with Paystack	            Payment integration
9, Deduct stock after payment	        Transaction workflow
10 Clear cart after payment	            Post-payment database operation
1.  Track sales	                        Orders collection

PHASE 2 — THINKING LIKE A BACKEND ARCHITECT

Before coding, Mr. Kevin and Mr. Abel came into collaboration to work together on the project.

We  asked:

“What are the core business entities inside this system?”

From the requirement, we could identify:

Business        Entity	Meaning

User	        Customers & Admins

Product	        Ecommerce items

Cart	        Persistent shopping cart

Order	        Completed purchases

Payment	        Paystack transactions

These become our MongoDB models.

# PHASE 2 — PROJECT STRUCTURE

This is how we planned to structure out the project.

Apexcart ecommerce-backend/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── paymentController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── paymentRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── utils/
│   └── paystack.js
│
├── .env
├── server.js
├── package.json

## BUILDING THE BLUEPRINTS & LOGICS

Dissecting the client's brief we have been able to map out the blueprint of how data moves through the system. 

We thought of our database models as the foundation and structural walls of our project as a house, and our Express routes as the plumbing and doors that let people interact safely with the project.

Because we need to handle inventory protection and external payment hooks (Paystack), we have to be incredibly precise. We proceeded to break this down into a clean, professional architecture.

HERE WE GO:

In this project we separate our code into:

1. Models (data structures), 
2. Controllers (business logic), 
3. Routes (URL traffic directors), and 
4. Middleware (security guards)

We plan to go modular in this way to ensure that our app is clean, readable, and highly maintainable.

Mr. Kelvin and I hope to build together step by step, keeping the code clear, complete, and fully synchronized so everything works seamlessly.

## Development Step 1: Project Setup & Environment

Before coding, we need to declare our dependencies and set up our environment variables.

# package.json

With this file, we configure our project script and fetch the exact tools we need (express, mongoose, jsonwebtoken, dotenv).

We created our project folder, open it in VSCode and at VSCode terminal we run:

npm init -y to create our package.json.

## Development Step 2. Set up .env

.env is our secret configuration vault. We created this file in the root directory as:

PORT=xxxx
MONGODB_URI=mongodb://localhost:27017/ecommerce_practice
JWT_SECRET=my_ultra_secure_secret_key_12345
PAYSTACK_SECRET_KEY=sk_test_mock_paystack_key_xyz

## Development Step 3: The Data Layer (models/)

We need to distinguish between standard customers and administrators so we can protect our 
inventory routes.

Looking at the client's brief, we need four core Mongoose models: 

1. User, 
2. Product, 
3. Cart, and 
4. Order. 

We plan to build these out using clean, modern Mongoose schemas.

Our schemas define how data looks inside MongoDB. Mongoose reads these definitions to give us powerful methods like .create(), .find(), and .save().

models/User.js
Defines users and differentiates between customers and administrators.

# models/Product.js
The client specified a stockCount integer. We will also use a virtual property or a pre-save check to instantly determine if the item is "Out of Stock" without manually managing an extra text field.

# models/Cart.js
Achieves the client's requirement for a persistent database cart tied directly to a user's ID.

# models/Order.js
Tracks purchases. We would save a priceAtPurchase snapshot so that if an admin changes a product's price later, historical invoices remain accurate.

## Development Sep 4: The Security Guards (middleware/)
Middleware functions intercept incoming HTTP requests before they reach our business controllers. They read the JWT headers to confirm who is making the request.

# middleware/authMiddleware.js
Extracts and validates the bearer token from the authorization header.

# controllers/productController.js
Enables administrators to perform full CRUD actions, while giving customers read-only access to browse items.


# controllers/orderController.js
Compiles current cart details into a checkout structure marked as pending_payment.

# controllers/paymentController.js
Fulfills the client's automated sequence. It handles successful payment verifications by modifying database inventory values and clearing out active baskets.


## Development Step 5: The Traffic Directors (ROUTES)

These are the unique addresses we will use for individual request as follows:

# routes/productRoutes.js


# routes/cartRoutes.js


# routes/orderRoutes.js


# routes/paymentRoutes.js


## Development Step 6: The Utilities Layer (utils/)
utils/paystack.js
This helper organizes our payment gateway interaction details. For this local demo, we keep things simple, but this is where we would place external fetch calls to Paystack's APIs.

## Development Step 7: Assembly (server.js)
The main entry point. It loads environment profiles, establishes a connection to MongoDB, links our route hubs, and starts listening for API traffic.


## TESTING

- We would test out endpoints using THUNDER CLIENT / POSTMAN

##  HOW FAR WE HAVE GONE TECHNICALLY ..............Let's see the code blueprints.



















# 2. Populate the Catalog Inventory
Endpoint: POST http://localhost:5000/api/products

Body:
{
  "title": "Mechanical Keyboard",
  "description": "Tactile rgb gaming keyboard",
  "price": 45000,
  "category": "Peripherals",
  "stockCount": 3
}

Action: Copy the unique structural "_id" key assigned to this new keyboard inside the response payload.

# 3. Create a Customer Profile
Endpoint: POST http://localhost:5000/api/auth/signup

Body:

{
  "name": "Jane Shopping",
  "email": "jane@gmail.com",
  "password": "customerpassword"
}

Action: Copy Jane's new token and replace your request headers context with this customer token.

# 4. Build a Persistent Shopping Cart
Endpoint: POST http://localhost:5000/api/cart

Body:

{
  "productId": "PASTE_THE_KEYBOARD_ID_HERE",
  "quantity": 2
}

Inventory Protection Test: Send this request with a quantity of 10. The server will return a 400 Bad Request stating "Insufficient Stock", proving your product stock validation works correctly. Change it back to 2 to proceed.

## 5. Check out and Place an Order
Endpoint: POST http://localhost:5000/api/orders

Body: {} (Leave this object body empty)

Result: Your active items list shifts into an initialized order tracking ledger object marked as "status": "pending_payment".

# 6. Mock the Paystack Hook Event Verification
Endpoint: POST http://localhost:5000/api/payment/webhook

Body:

{
  "event": "charge.success",
  "data": {
    "reference": "REF-UNIQUE-99231",
    "amount": 90000
  }
}

## The Final Inspection
Verify the changes across your system:

Send a GET request to /api/products — The keyboard's stockCount will have decreased from 3 down to 1.

Send a GET request to /api/cart — Jane's active items array will be completely empty.