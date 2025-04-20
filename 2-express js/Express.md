# Express js

- Intro & Setup
- Get Requests
- Route Params
- Query Params
- Post Requests
- Put Requests
- Patch Requests
- Delete Requests
- Middleware
- Validation
- Routers
- Cookies
- Sessions
- Authentication JWT
- File Uploads
- Error handling
- CORS (Cross-Origin Resource Sharing)


## Intro and setup
- create dir and initialize package.json with this command  and install express js and nodemon
- express for backend framework
- nodemon will watch our code changes and autoupdate the process

```shell
npm init -y
npm install express nodemon
```

- dev : to start our app in backend in dev mode with nodemon
- start : start our app in node for prod mode

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon ./src/index.js",
    "start": "node ./src/index.js"
  },

```

- also when coding in express there is two type of js we can use : common js or modules i will use modules
- the difference is for common js you will use require to load packages but for modules you will use import to load packages
```js
// CommonJS
const express = require('express');

// ES Modules
import express from 'express';

```
```js
"type": "module",
```

- and since i am using modules the file extension will be .mjs 
**NOTE** : its not strictly required you can still use .js extension if you prefer

```js
{
  "name": "express-js",
  "version": "1.0.0",
  "main": "index.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon ./src/index.mjs",
    "start": "node ./src/index.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "type": "module",
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}

```

- Basic setup of express app

```js
import express from "express";

const app = express()


const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log("app is running on",PORT);
    
})

```
# APIs and RESTful API Design


- Introduction to APIs**  
- API = Application Programming Interface  
- Allows software components to communicate (e.g., web APIs, Node.js modules, DOM API).  
- Web APIs: Send data between client and server via HTTP requests.  

---

**What is REST?**  
- REST = **Representational State Transfer**  
- Architecture for building logical, easy-to-consume web APIs.  
- Principles:  
  0- Resources separated into logical resources
  1- Resources exposed via structured URLs.  
  2- Use HTTP methods (GET, POST, etc.) for actions.  
  3- Stateless communication.  
  4- JSON data format.  

---

**1- REST Resources**  
- **Resource**: Object/data with a unique identifier (e.g., tours, users, reviews).  
- **Endpoints**: Structured URLs for resources (e.g., `/tours`, `/users`).  
  - Avoid verbs in URLs (use HTTP methods instead).  
  - Example of bad vs. good endpoints:  
    - ❌ `/getTour` → ✅ `/tours` (with GET method).  

---

**2- HTTP Methods & CRUD Operations**  
| **HTTP Method** | **CRUD Action** | **Purpose**                          |  
|------------------|-----------------|--------------------------------------|  
| `GET`            | Read            | Retrieve data (e.g., `/tours`).      |  
| `POST`           | Create          | Add new resource (e.g., `/tours`).   |  
| `PUT/PATCH`      | Update          | Modify existing resource (e.g., `/tours/5`). |  
| `DELETE`         | Delete          | Remove resource (e.g., `/tours/5`).  |  

---

**3-JSON Data Format**  
- **JSON** = Lightweight data interchange format (keys as strings, values as strings/numbers/objects).  
- Example response:  
  ```json
  {
    "status": "success",
    "data": {
      "id": 5,
      "name": "Adventure Tour",
      "price": 997
    }
  }
  ```  
- **Jsend**: Standard for response formatting (includes `status`, `data`, or `message`).  

**4-Statelessness in REST**  
- **Stateless**: Server does not store client state.  
- Each request must contain all necessary info (client handles state).  
- Example:  
  - ❌ `/tours/nextPage` (server tracks current page) →  
  - ✅ `/tours/page/6` (client specifies page number).  

- Key Takeaways 
1. REST APIs use logical resources and HTTP methods for CRUD.  
2. Endpoints should be noun-based (e.g., `/tours`, not `/getTours`).  
3. Stateless design simplifies scalability and reliability.  
4. JSON ensures consistency in data exchange.  


## GET REQUESTS
- now we know how to setup basic express app lets learn routes and how to create them in beginner level
```js
app.get('',(req,res)=>{
    return res.send('Hello world')
})

```

- you can also chain status method before send method

```js
app.get('',(req,res)=>{
    return res.status(200).send('Hello world')
})

```

```js
app.get('/api/users/',(req,res)=>{
    return res.status(200).send([
    {
        id : 1,
        name:'ali',
        age:12
    },
    {
        id:2,
        name:'axmed',
        age:10
    },
    {
        id:3,
        name:'farax',
        age:15
    },
])
})


```
## Route Params

- Route parameters are used to dynamically pass data through the URL to the server, allowing the server to process and respond based on that data.
- for example if i want get single user from list of users users/1 or users/2

```js

// to get single user we will use params
// route params
// important note here is :
// 1- getting paramId 2- parseInt to make sure the paramId is int
app.get('/api/users/:id/',(req,res)=>{
    console.log(req.params);
    const id = parseInt(req.params.id)
    if (isNaN(id)) return res.status(400).send("Invalid query")
    const user = users.find(user => user.id === id)
    if (!user) return res.status(404).send("User not found")
    return res.status(200).send(user)
    
})

```

## Query Params

- Query parameters are like the extra details you add when searching online. For example, if you’re shopping for shoes on a website, you might filter results by adding parameters like color, size, or brand. In the same way, query parameters are added to a URL to tell the server exactly what you’re looking for or to fine-tune the information you want to receive.

```js
app.get('/api/users/',(req,res)=>{
    console.log(req.query);
    const {filter,value} = req.query
    if (!filter && !value) return res.status(200).send(users)
    if (filter && value) {
        return res.send(users.filter(user => user[filter].toLowerCase().includes(value)))
    }
})


```

## POST Request
- to make sure express parse data we will need to use middleware
```js
import express from "express";

const app = express()

app.use(express.json())

```


```sh
npm install uuid
```

```js
import { v4 as uuidv4 } from 'uuid';
```
```js
// POST
app.post('/api/users/',(req,res)=>{
   const data = req.body
   const newUser = {id:uuid(),...data}
   users.push(newUser)
   return res.status(201).send(newUser)
})

```

## PUT Request

- PUT is used when you want to perform a complete update of an instance.

```js
app.put('/api/users/:id',(req,res)=>{
    const {body,params:{id}} = req
    const parseId = parseInt(id)
    if(isNaN(parseId)) return res.sendStatus(400)
    const findUserIndex = users.findIndex((user)=>user.id === parseId)
    if(findUserIndex === -1) return res.sendStatus(404)
    users[findUserIndex] = {id:parseId,...body}
    return res.sendStatus(201)
    
})


```

## PATCH Request

- PATCH is used when you want to perform a partial update of an instance.

```js
// PATCH
app.patch('/api/users/:id',(req,res)=>{
    const {body,params:{id}} = req
    const parseId = parseInt(id)
    if(isNaN(parseId)) return res.sendStatus(400)
    const findUserIndex = users.findIndex((user)=>user.id === parseId)
    if(findUserIndex === -1) return res.sendStatus(404)
    users[findUserIndex] = {...users[findUserIndex],...body}
    return res.sendStatus(200)
    
})

```

## DELETE Request

```js

// DELETE
app.delete('/api/users/:id',(req,res)=>{
    const { params:{ id } } = req
    const userId = parseInt(id)
    console.log(id);
    
    if(isNaN(userId)) return res.sendStatus(400)
    const findUserIndex = users.findIndex((user)=>user.id === userId)
    if(findUserIndex === -1) return res.sendStatus(404)
    users.splice(findUserIndex,1)
    return res.sendStatus(200)
})

```

## Middleware is a function that sits between the incoming request and the final response in a web application's request-response cycle.

- It can contain logic to modify the request or response, perform operations like logging, authentication, or error handling.
- Middleware functions have access to the request and response objects, as well as the next() function, which passes control to the next middleware function in the stack.
- Middleware can be used to handle requests, return responses, or terminate the request-response cycle.


```js
const logginMiddleware = (req,res,next)=>{
    console.log(`method : ${req.method}, url : ${req.url}`);
    next()
}

app.use(logginMiddleware)

```

- simple auth middleware

```js
const AuthMiddleware = (req,res,next)=>{
    //check body token
    const {body} = req
    const {token} = body
    if(token === "token123"){
        console.log("correct token");
        next()
    }else {
        console.log("wrong token");
        res.sendStatus(401)
    }
    next()
}

app.use(AuthMiddleware)

```

- if you want middleware to be applied on specific route rather than on all routes do this

```js

app.get('',logginMiddleware,(req,res)=>{
    return res.status(200).send('Hello world')
})

```
## validation

- for validating body , query etc we will be using express validator

```sh
npm install express-validator
```

## steps to validate query object
1- pass the query function as middleware and tell query field name
2- add validation chain like isString etc
3- in the handler block access validationResult function and pass it the request object and check if there is error or not handle it and return the error as response if there's one

```js
import express from "express";
import { query,validationResult } from "express-validator";

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/users',query("filter").optional().isString(),(req,res)=>{
    const {filter,value}= req.query
    
    // validate the query
    const result = validationResult(req)
    console.log("result",result);
    
    if(!result.isEmpty()){
        return res.status(400).send({error:result.array()})
    }

    if(!filter && !value) return res.send(users)
    if(filter && value){
        const filteredUsers = users.filter((user)=>user[filter].toLowerCase().includes(value))
        console.log("filtered",filteredUsers);
        
        return res.send(filteredUsers)
    }
    
    
})
```
## steps to validate body object
1- pass the body function as middleware and tell body field name
2- add validation chain like isString etc
3- in the handler block access validationResult function and pass it the request object and check if there is error or not handle it and return the error as response if there's one

```js

import express from "express";
import {body,validationResult } from "express-validator";

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000


app.post('/users/',[body('name').isString().withMessage("Name must be string").notEmpty(),body('age').isNumeric().notEmpty(),body('gender').isString().notEmpty()],(req,res)=>{
    const data = req.body
    // validate the body object before saving
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).send({error:result.array()})
    }
    const newUser = {...data}
    users.push(newUser)
    return res.send(users)
})

```
- ok as we saw we can do validation this way but our code became clutter and un manageable so instead of this way we will use something called schema

- schema is basically chain of the same validations for our fields we did but put in file

```js
// utils/postSchema.mjs

export const postSchema = {
    name:{
        notEmpty:{
            errorMessage:"name can not be empty"
        },
        isString:{
            errorMessage:"name must be string"
        }
    },
    age:{
        notEmpty:{
            errorMessage:"age can not be empty"
        },
        isNumeric:{
            errorMessage:"age must be number"
        }
    },
    gender:{
        notEmpty:{
            errorMessage:"gender can not be empty"
        },
        isString:{
            errorMessage:"gender must be string"
        }
    },
}

// src/index.js

// post request
import express from "express";
import { query,body,validationResult,matchedData,checkSchema } from "express-validator";
import { postSchema } from "./utils/postSchema.mjs";

app.post('/users/',checkSchema(postSchema),(req,res)=>{
    // validate the body object before saving
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).send({error:result.array()})
    }
    const data = matchedData(req)
    const newUser = {...data}
    users.push(newUser)
    return res.send(users)
})


```

## Routers

- to make our scale and used in big project we will use mvc architecture
- put routes in routes folder
- models in models folder
- controllers in controllers folder

## Cookies

- Cookies are small pieces of data that your webserver sends to the web-browser
- to set cookie and recieve cookies use cookie-parser


- install and setup cookie parser

```sh
npm install cookie-parser
```
```js
import express from "express"
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser()) // use cookie parser
app.use(cookieParser('secret')) // NOTE you sign the cookie by passing argument

// run the app
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("running on PORT : " + PORT);
})
```

```js
// Set an unsigned cookie
res.cookie("sessionId", "abc123", { maxAge: 1000 });

// Set a signed cookie
res.cookie("authToken", "Mxd19123402", { maxAge: 1000, signed: true });

// Read unsigned cookie
const sessionId = req.cookies.sessionId;

// Read signed cookie
const authToken = req.signedCookies.authToken;

// Verify unsigned cookie
if (sessionId === "abc123") {
  console.log("Unsigned cookie verified");
}

// Verify signed cookie
if (authToken === "Mxd19123402") {
  console.log("Signed cookie verified");
}
```

## Session

- Sessions: Data is stored on the server-side, with only a session ID stored on the client (usually in a cookie). The server uses this ID to fetch session data.

- install and setup express-session

```sh
npm i express-session
```

```js
import express from "express";
import session from "express-session";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
    secret: "secret",          // Encryption key for sessions
    saveUninitialized: false,   // Only save session if modified
    resave: false,              // Avoid resaving unmodified sessions
    cookie: { maxAge: 120000 }  // Session expires in 2 minutes
}));

app.listen(PORT, () => console.log("App running on", PORT));
```

- Using Sessions

- Set Data: `req.session.key = value`
- Read Data: `req.session.key`
- Fetch by ID: `req.sessionStore.get(sessionID, callback)`

```js
app.get("/", (req, res) => {
    // Set session variable
    req.session.isVisited = true;
    // read session
    console.log("Session:", req.session); // Log session data
    console.log("Session ID:", req.session.id); // Log session ID
    
    // Fetch session by ID
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log("Fetched Session:", session);
    });

    res.send("Home");
});
```

# Steps for Authentication in Express with JWT

## Table of Contents
1. [Install Required Packages](#1-install-required-packages)
2. [Set Up JWT Configuration](#2-set-up-jwt-configuration)
3. [Create Register and Login Routes](#3-create-register-and-login-routes)
4. [Add JWT Verification Middleware](#4-add-jwt-verification-middleware)
5. [Protect Routes](#5-protect-routes)

---

### 1. Install Required Packages

Install necessary packages using npm or yarn:

```bash
npm install express jsonwebtoken bcryptjs
```

**Packages Overview:**
- **express**: The web framework
- **jsonwebtoken**: For generating and verifying JWT tokens
- **bcryptjs**: For hashing passwords

---

### 2. Set Up JWT Configuration

Create a configuration file for your JWT secret key and token expiration time. You can add a `.env` file or define it directly.

```js
// config.js
module.exports = {
  jwtSecret: "yourSecretKey", // Use a secure secret key here
  jwtExpiration: "1h" // 1-hour token expiration
};
```

### 3. Create Register and Login Routes

Set up routes for **registration** and **login** to handle user signup and authentication.

```js
// server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser"); // instead you can use import
const { jwtSecret, jwtExpiration } = require("./config");

const app = express();
app.use(express.json()) // instead of body parser
// Dummy user storage (in practice, use a database)
const users = [];

// Register Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully!" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password!" });
  }

  // Generate JWT
  const token = jwt.sign({ username: user.username }, jwtSecret, {
    expiresIn: jwtExpiration
  });

  res.json({ message: "Login successful!", token });
});
```

---

### 4. Add JWT Verification Middleware

Create a middleware function to protect routes by verifying the JWT token.

```js
// middleware/auth.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token is required!" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], jwtSecret);
    req.user = decoded; // Attach the decoded user to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token!" });
  }
}

module.exports = verifyToken;
```

---

### 5. Protect Routes

Use the middleware to protect any route you want to secure. Only authenticated users will be able to access these routes.

```js
const verifyToken = require("./middleware/auth");

// Protected Route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---


## File Uploads


```sh
npm install multer

```
```js
import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// single file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File upload failed" });
  res.status(200).json({ message: "File uploaded", file: req.file });
});

// Multiple file upload route
app.post("/uploads", upload.array("files", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Files upload failed" });
  }
  res.status(200).json({
    message: "Files uploaded successfully",
    files: req.files,
  });
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

```


## Error handling

```js
import express from "express";
import { CustomError } from "./utils/CustomError.js";

const app = express();

// Route - Basic route without errors
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

// Route - Throws a custom error
app.get("/error", (req, res, next) => {
  next(new CustomError(400, "This is a custom error"));
});

// Route - Async route with error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get(
  "/async-error",
  asyncHandler(async (req, res, next) => {
    throw new CustomError(500, "Something went wrong in async");
  })
);

// Middleware - 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Middleware - General error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err.stack);
  res.status(status).json({ message });
});

app.listen(3000, () => console.log("Server running on port 3000"));

```
## Cors

- CORS (Cross-Origin Resource Sharing) is a security feature in web browsers that restricts web pages from making requests to a different domain than the one that served the web page. Enabling CORS allows your server to accept requests from other domains.

```sh
npm install cors
```

```js

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["https://example1.com", "https://example2.com"];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("CORS-enabled with specific settings!");
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

```

# STATUS

## HTTP Status Codes (80/20)

| Code | Name                   | When to Use / What It Means                                  |
|------|------------------------|--------------------------------------------------------------|
| 200  | OK                     | Standard response for successful GET/POST/PUT requests.      |
| 201  | Created                | Resource successfully created (e.g., POST → new record).     |
| 204  | No Content             | Success, but nothing to return (e.g., DELETE, empty PUT).    |
| 301  | Moved Permanently      | URL has changed permanently (caching & SEO friendly).        |
| 302  | Found                  | Temporary redirect (e.g., after form submission).            |
| 304  | Not Modified           | Client cache is up to date—no need to resend body.           |
| 400  | Bad Request            | Malformed syntax or invalid request parameters.              |
| 401  | Unauthorized           | Authentication required or failed (e.g., invalid token).     |
| 403  | Forbidden              | Authenticated but not allowed to access this resource.       |
| 404  | Not Found              | Resource/endpoint does not exist.                            |
| 500  | Internal Server Error  | Generic server‑side failure—check your logs.                 |
| 503  | Service Unavailable    | Server overloaded or down for maintenance (try again later). |
