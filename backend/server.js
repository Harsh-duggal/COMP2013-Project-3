const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
const bcrypt = require("bcrypt");        
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const { DB_URI, SECRET_KEY } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.post("/create-user", async (request, response) => {
    const { username, password } = request.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        response.send({ message: "User created successfully" });

    } catch (err) {
        response.status(500).send({ message: "User already exists" });
    }
});

//Login route 
server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    // Compare hashed passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(403).send({ message: "Incorrect username or password" });
    }
     //To check if logging as Admin
    const isAdmin = username === "admin";

    // Create JWT with admin flag
    const jwtToken = jwt.sign(
      {
        id: user._id,
        username: username,
        isAdmin: isAdmin,
      },
      SECRET_KEY
    );

    res.status(200).send({
      message: "Login successful",
      token:jwtToken
    });

  } catch (error) {
    res.status(500).send({ message: "Login failed" });
  }
});



server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const id = crypto.randomUUID();
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id,
  });

  try {
    await product
      .save()
      .then((result) =>
        response.status(201).send(`${productName} added\nwith id: ${id}`)
      );
  } catch (error) {
    console.log(error.message);
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) => {
      console.log(result);
      response.status(200).send(result);
    });
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) =>
      response.status(200).send(`${productName} edited\nwith id: ${prodId}`)
    );
  } catch (error) {
    console.log(error.message);
  }
});
