import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const salt = 10;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.VURL, process.env.LOCAL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        return res.json({ Error: "Invalid token" });
      } else {
        req.name = decoded.name;
        req.role = decoded.role;
        req.id = decoded.id;
        next();
      }
    });
};

// Middleware function to verify user role
const verifyRole = (requiredRole) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect(process.env.VURL || process.env.LOCAL);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect(process.env.VURL || process.env.LOCAL);
    }

    const { role } = decoded;
    if (role !== requiredRole) {
      return res.redirect(process.env.VURL || process.env.LOCAL);
    }

    next(); // User has the required role, continue to the next middleware
  });
};

app.get("/", verifyUser, (req, res) => {
  return res.status(200).json({
    Status: "You are authenticated",
    name: req.name,
    role: req.role,
    id: req.id,
  });
});

//admin can view all users
app.get("/users", verifyRole("admin"), (req, res) => {
  const q = "SELECT * FROM users WHERE role != 'admin'";
  db.query(q, (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

//users get their details
app.get("/users/:id", verifyUser, (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM users WHERE id =?";
  db.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

//users can update their Email and password
app.put("/users/:id", verifyUser, (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE users SET Email=?, ContactNumber=?, EmergencyContactNumber=?, password=?, FirstChildFirstName=?, FirstChildLastName=?, FirstChildDOB=?, FirstChildYearGroup=?, FirstChildMedical=?, SecondChildFirstName=?, SecondChildLastName=?, SecondChildDOB=?, SecondChildYearGroup=?, SecondChildMedical=?, Permission=?, PupilPremium=? WHERE id=?";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });

    const values = [
      req.body.Email,
      req.body.ContactNumber,
      req.body.EmergencyContactNumber,
      hash,
      req.body.FirstChildFirstName,
      req.body.FirstChildLastName,
      req.body.FirstChildDOB,
      req.body.FirstChildYearGroup,
      req.body.FirstChildMedical,
      req.body.SecondChildFirstName,
      req.body.SecondChildLastName,
      req.body.SecondChildDOB,
      req.body.SecondChildYearGroup,
      req.body.SecondChildMedical,
      req.body.Permission,
      req.body.PupilPremium,
    ];

    db.query(q, [...values, id], (err, data) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.json({ Error: "Email already exists" });
        } else {
          console.log(err);
          return res.json({ Error: "Error for updating user" });
        }
      }
      return res.json({ Status: "User updated successfully" });
    });
  });
});

//admin can delete users
app.delete("/users/:id", verifyRole("admin"), (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM users WHERE id =?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

//users can log in
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE Email =? ";

  db.query(sql, [req.body.Email], (err, data) => {
    if (err) return res.json({ Error: "Login error" });
    if (data.length === 0) {
      return res.json({ Error: "Please check your Email and try again." });
    } else {
      // Email found so compare password
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Dog" });
          if (response) {
            const name = data[0].CarerFirstName;
            const role = data[0].role;
            const id = data[0].id;
            const token = jwt.sign({ name, role, id }, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });
            res.cookie("token", token, {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            });
            return res
              .status(200)
              .json({ Status: "User logged in successfully", role, name, id });
            // deprecated: res.json({ Status: "User logged in successfully" }, role);
          } else {
            return res.json({
              Error: "Please check your password and try again.",
            });
          }
        }
      );
    }
  });
});

//users only can log out
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "User logged out successfully" });
});

//users can register
app.post("/register", (req, res) => {
  console.log(req.body);
  const sql =
    "INSERT INTO users (`CarerFirstName`, `CarerLastName`, `Email`, `ContactNumber`, `EmergencyContactNumber`, `password`, `FirstChildFirstName`, `FirstChildLastName`, `FirstChildDOB`, `FirstChildYearGroup`, `FirstChildMedical`, `SecondChildFirstName`, `SecondChildLastName`, `SecondChildDOB`, `SecondChildYearGroup`, `SecondChildMedical`, `Permission`,`PupilPremium`, `Role`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const defaultRole = "visitor";
    const values = [
      req.body.CarerFirstName,
      req.body.CarerLastName,
      req.body.Email,
      req.body.ContactNumber,
      req.body.EmergencyContactNumber,
      hash,
      req.body.FirstChildFirstName,
      req.body.FirstChildLastName,
      req.body.FirstChildDOB,
      req.body.FirstChildYearGroup,
      req.body.FirstChildMedical,
      req.body.SecondChildFirstName,
      req.body.SecondChildLastName,
      req.body.SecondChildDOB,
      req.body.SecondChildYearGroup,
      req.body.SecondChildMedical,
      req.body.Permission,
      req.body.PupilPremium,
      defaultRole,
    ];

    db.query(sql, [values], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.log(err, "Email already exists");
          return res.json({ Error: "Email already exists" });
        } else {
          console.log(err, "Error for registering user");
          return res.json({ Error: "Error for registering user" });
        }
      }

      res.json({ Status: "User registered successfully" });
    });
  });
});

//admin can see if they're logged in correctly
app.get("/admin", verifyRole("admin"), (req, res) => {
  // Only users with the "admin" role can access this route
  res.json({
    message: "Welcome, adminn!",
    name: req.name,
    role: req.role,
    id: req.id,
  });
});

//user can make a booking
app.post("/bookings", verifyUser, (req, res) => {
  const userId = req.id; // Assuming you have access to the user ID through middleware or authentication

  const sql =
    "INSERT INTO bookings (`user_id`, `booking_date`, `booking_time`, `booking_child_name`, `booking_product_id`) VALUES (?, ?, ?, ?, ?)";
  const values = [
    userId,
    req.body.selectedDate,
    req.body.selectedTime,
    req.body.selectedName,
    req.body.product_id,
  ]; // Include user_id in the values array

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error registering booking:", err);
      return res.status(500).json({ error: "Error registering booking" });
    }
    return res.json({ status: "Booking registered successfully" });
  });
});

//admin can see all bookings with name
app.get("/bookings", verifyRole("admin"), (req, res) => {
  const sql = `
    SELECT bookings.*, users.CarerFirstName AS userName 
    FROM bookings 
    INNER JOIN users ON bookings.user_id = users.id
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
    return res.json(data);
  });
});

//user gets shown their own bookings
app.get("/bookings/:id", verifyUser, (req, res) => {
  const userId = req.params.id;
  const query =
    "SELECT bookings.*, users.FirstChildFirstName AS Child1 FROM bookings JOIN users ON bookings.user_id = users.id WHERE users.id = ?";
  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
    return res.json(data);
  });
});

//admin can delete any booking
app.delete("/bookings/:id", verifyRole("admin"), (req, res) => {
  const id = req.params.id;
  // console.log(id, req.params);

  const q = "DELETE FROM bookings WHERE booking_id =?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

app.get("/products", verifyUser, (req, res) => {
  const sql = `
    SELECT * FROM products 
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    return res.json(data);
  });
});

// app.get("/products/:id", verifyUser, (req, res) => {
//   const productId = req.params.id;
//   const sql = `
//     SELECT * FROM products WHERE product_id = ?;
//   `;
//   db.query(sql, [productId], (err, data) => {
//     if (err) {
//       console.error("Error fetching product:", err);
//       return res.status(500).json({ error: "Error fetching product" });
//     }
//     if (data.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     return res.json(data[0]); // Assuming there's only one product with the given id
//   });
// });

app.get("/orders/:id", verifyUser, (req, res) => {
  const userId = req.id;

  const sql = `
    SELECT products.*, orders.*
    FROM products
    INNER JOIN orders ON products.product_id = orders.product_id
    WHERE orders.buyer_id = ? AND orders.isCompleted = 1;
  `;

  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    return res.json(data);
  });
});

//forgot password
app.post("/forgot-password", (req, res) => {
  const q = "SELECT * FROM users WHERE Email =? ";
  const email = req.body.Email;

  db.query(q, [email], (err, data) => {
    if (err) {
      console.error("Error fetching users email:", err);
      return res.json({ Error: "Error" });
    }

    if (data.length === 0) {
      //email not found
      return res.status(404).json({ Error: "Email not found" });
    }

    //Email found, proceed with password reset

    const userID = data[0].id;
    const userEMail = data[0].Email;
    const token = jwt.sign({ id: userID }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });

    // send email

    var transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const emailURL =
      req.hostname === process.env.DB_HOST
        ? process.env.LOCAL
        : process.env.VURL;

    var mailOptions = {
      from: process.env.MY_EMAIL,
      to: userEMail,
      subject: "Reset your password",
      html:
        `<h1>Reset your password</h1>
      <br/>
      <p>Please note this password reset expires in 30 minutes</p>
      <br/>
      ` +
        emailURL +
        `/reset-password/` +
        userID +
        `/` +
        token,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error, "err sending email");
      } else {
        return res
          .status(200)
          .json({ Status: "Successfully requested password reset" });
      }
    });
  });
});

app.post("/reset-password/:id/:token", (req, res) => {
  const id = req.params.id;
  const token = req.params.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ Error: "Invalid token" });
    } else {
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });
        const q = "UPDATE users SET password =? WHERE id =?";
        const values = [hash, id];
        db.query(q, values, (err, data) => {
          if (err) {
            console.error("Error resetting password:", err);
            return res.status(500).json({ error: "Error resetting password" });
          }
          return res.json({ Status: "Successfully reset password" });
        });
      });
    }
  });
});

// import fetch from "node-fetch";
// app.post("/verify-captcha", async (req, res) => {
//   const { token } = req.body;
//   const secret = process.env.CAPTCHA_SECRET_KEY; // Replace with your hCaptcha secret key

//   try {
//     const response = await fetch("https://api.hcaptcha.com/siteverify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         response: token,
//         secret: secret,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     console.error("Error verifying captcha:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while verifying captcha" });
//   }
// });
import stripePackage from "stripe";
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (product_id) => {
  try {
    // Fetch product details from the database based on the product ID
    const getProductQuery =
      "SELECT product_price, product_activity_duration FROM products WHERE product_id = ?";
    const [productRows] = await db
      .promise()
      .query(getProductQuery, [product_id]);

    if (productRows.length === 0) {
      throw new Error("Product not found");
    }

    console.log(productRows);
    // Extract price and activity duration from the database response
    const { product_price, product_activity_duration } = productRows[0];

    // Calculate the total order amount based on the price of the product and its activity duration
    let totalPrice = product_price * product_activity_duration * 100;

    // Round the total price to two decimal places
    totalPrice = totalPrice.toFixed(2);

    // Convert the rounded total price back to a number
    totalPrice = Number(totalPrice);

    return totalPrice;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

app.post("/create-payment-intent/:id", verifyUser, async (req, res) => {
  const { id } = req.params;
  const { items } = req.body;
  const userId = req.id;

  try {
    // Calculate the order amount
    const amount = await calculateOrderAmount(id);

    // Fetch product details
    const productQuery = "SELECT * FROM products WHERE product_id = ?";
    const [productRows] = await db.promise().query(productQuery, [id]);

    if (productRows.length === 0) {
      return res.status(404).send("Product not found");
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Prepare the response object with additional product details
    const response = {
      clientSecret: paymentIntent.client_secret,
      product: productRows[0], // Assuming only one product with the provided id
    };

    res.send(response);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/orders/:id", verifyUser, (req, res) => {
  const { id } = req.params;
  const { payment_intent } = req.body;
  const userId = req.id; // Assuming you have access to the authenticated user's ID

  const isCompleted = 1;
  const values = [id, userId, isCompleted, payment_intent];

  // Insert data into the orders table
  const insertOrderQuery =
    "INSERT INTO orders (product_id, buyer_id, isCompleted, payment_intent) VALUES (?, ?, ?, ?)";

  db.query(insertOrderQuery, values, (err, result) => {
    if (err) {
      console.error("Error updating order:", err);
      return res.status(500).json({ error: "Error updating order" });
    }
    if (result.affectedRows === 0) {
      // No matching order found
      return res.status(404).json({ error: "Order not found" });
    }
    // Order updated successfully
    return res.status(200).json({ message: "Order updated successfully" });
  });
  console.log("done");
});

app.listen(process.env.PORT, () => {
  console.log("running... totally");
});
