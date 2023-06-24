# MERN Shop For Home

A store of decor items named Shop For Home decided to move  their store to the online platforms and wants their own web application.
- This e-Commerce website fullfill their needs with beautiful UI
- This store contains different categorized items related to home decoration.
They are:
    - Artificial Plants
    - Idols and Figurines
    - Plaques and wall arts
    - Speciality Lightening
    - Wall stickers
    - Living Room Furniture



## What technologies we used in this application

- HTML5 and CSS3: Semantic Elements, CSS Grid, Flexbox
- Bootstrap 5 
- React: Components, Props, Events, Hooks, Router, Axios
- Context API: Store, Reducers, Actions
- Node & Express: Web API, Body Parser, File Upload, JWT
- MongoDB: Mongoose, Aggregation
- Development: Git, Github

## Run Locally

### 1. Clone repo

```
$ git clone https://github.com/Asitha-Karnatakam/Shop_For_Home.git
$ cd Shop-For-Home
```

### 2. Create .env File and add the following things
  - JWT_SECRET="Your secret key"
  - MONGODB_URI=" your mongourl"
  - CLOUDINARY_CLOUD_NAME="your cloud name"
  - CLOUDINARY_API_KEY="your cloudinary api key"
  - CLOUDINARY_URL=CLOUDINARY_URL="your cloudinary url"
  - CLOUDINARY_API_SECRET="your cloudinary api secret"

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/shop_for_home
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Seed Users and Products

- Run this on browser: http://localhost:5000/api/seed
- It returns admin email and password and 6 sample products


### 7. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin

### 8. Swagger Docs
- Run http://localhost:5000/docs
- login as admin using admin data in data.js
- and paste the token in authorized area and perform crud on users using their ID
