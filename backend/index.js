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
        req.email = decoded.email;
        req.phone = decoded.phone;
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
    email: req.email,
    phone: req.phone,
    token: "dog",
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

//users can update their details
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
            const name = data[0].CarerFirstName + " " + data[0].CarerLastName;
            const role = data[0].role;
            const id = data[0].id;
            const email = data[0].Email;
            const phone = data[0].ContactNumber;
            const token = jwt.sign(
              { name, role, id, email, phone },
              process.env.SECRET_KEY,
              {
                expiresIn: "1d",
              }
            );
            res.cookie("token", token, {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            });
            return res.status(200).json({
              Status: "User logged in successfully",
              role,
              name,
              id,
              email,
              phone,
            });
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
    email: req.email,
    phone: req.phone,
  });
});

// get all products
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

// get specified product for update as admin
app.get("/products/:id", verifyRole("admin"), (req, res) => {
  const id = req.params.id;
  console.log(id);

  const sql = `SELECT * FROM products WHERE product_id =?`;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    console.log(data);
    return res.json(data);
  });
});
// update product as admin
app.put("/admin-update-product/:id", verifyRole("admin"), (req, res) => {
  const id = req.params.id;

  const sql =
    "UPDATE products SET product_school=?, product_activity=?, product_price=?, product_activity_duration=?, product_time=?, product_description=?, product_criteria=?, product_day=? WHERE product_id=?";

  const values = [
    req.body.product_school,
    req.body.product_activity,
    req.body.product_price,
    req.body.product_activity_duration,
    req.body.product_time,
    req.body.product_description,
    req.body.product_criteria,
    req.body.product_day,
    id, // Add the product_id for the WHERE clause
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Error updating product" });
    }
    res.json({ status: "Product updated successfully" });
  });
});

// add new product admin
app.post("/admin-add-product", verifyRole("admin"), (req, res) => {
  const sql =
    "INSERT INTO products (product_school, product_activity, product_price, product_activity_duration, product_time, product_description, product_criteria, product_day) VALUES (?, ?, ?, ?, ?,?,?,?)";

  const values = [
    req.body.product_school,
    req.body.product_activity,
    req.body.product_price,
    req.body.product_activity_duration,
    req.body.product_time,
    req.body.product_description,
    req.body.product_criteria,
    req.body.product_day,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error registering product:", err);
      return res.status(500).json({ error: "Error registering product" });
    }
    res.json({ status: "Product registered successfully" });
  });
});

// delete product as admin
app.delete("/admin-delete-product/:id", verifyRole("admin"), (req, res) => {
  const id = req.params.id;
  // console.log(id, req.params);

  const q = "DELETE FROM products WHERE product_id =?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

// get all user info w/order and product purchased admin
app.get("/admin-users-info", verifyRole("admin"), (req, res) => {
  // SQL query to select data from users, orders, and products tables
  const sql = `
    SELECT 
      u.*,
      o.*, 
      p.*
    FROM 
      users u
    LEFT JOIN 
      orders o ON u.id = o.buyer_id
    LEFT JOIN 
      products p ON o.product_id = p.product_id
    WHERE
      u.role != "admin";
  `;

  // Execute the SQL query
  db.query(sql, (error, results) => {
    if (error) {
      // Handle error if the query execution fails
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Process the retrieved data and format it as needed

      // Using the reduce() method to format the data
      const formattedData = results.reduce((formatted, row) => {
        // Destructure the row and extract the user ID
        const { id, ...userData } = row;

        // Check if the user ID is already in the formatted data
        if (!formatted[id]) {
          // If not, initialize a new user object with user ID and user data
          formatted[id] = {
            id,
            ...userData,
            orders: [], // Initialize an empty array to hold user orders
          };
        }

        // Push order details into the user's orders array
        formatted[id].orders.push({
          order_id: row.order_id,
          buyer_id: row.buyer_id,
          product_id: row.product_id,
          isCompleted: row.isCompleted,
          payment_intent: row.payment_intent,
          product: {
            // Format product details
            product_activity: row.product_activity,
            product_id: row.product_id,
            product_school: row.product_school,
            product_price: row.product_price,
            product_activity_duration: row.product_activity_duration,
            product_time: row.product_time,
            product_description: row.product_description,
            product_criteria: row.product_criteria,
            product_day: row.product_day,
            // Add other relevant order details here
          },
        });

        // Return the formatted data object
        return formatted;
      }, {}); // Initialize the formatted data as an empty object

      // Convert the formatted data object into an array of user objects
      const formattedResults = Object.values(formattedData);

      // Send the formatted results as JSON response
      return res.json(formattedResults);
    }
  });
});

//delete users orders admin
app.delete("/admin-users-order/:id", verifyRole("admin"), (req, res) => {
  const id = req.params.id;
  // console.log(id, req.params);

  const q = "DELETE FROM orders WHERE order_id =?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});
//admin can delete users then their orders
app.delete(
  "/admin-delete-users-and-orders/:id",
  verifyRole("admin"),
  (req, res) => {
    const userId = req.params.id;

    const deleteUserQuery = "DELETE FROM users WHERE id = ?";
    const deleteBookingsQuery = "DELETE FROM orders WHERE buyer_id = ?";

    db.query(deleteBookingsQuery, [userId], (err, bookingData) => {
      if (err) {
        console.error("Error deleting user's bookings:", err);
        return res.json({ error: "Error deleting user's bookings" });
      }

      // After deleting the bookings, proceed to delete the user
      db.query(deleteUserQuery, [userId], (err, userData) => {
        if (err) {
          console.error("Error deleting user:", err);
          return res.json({ error: "Error deleting user" });
        }

        return res.json({
          message: "User and associated bookings deleted successfully",
        });
      });
    });
  }
);

// show order to user
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

// reset password
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

// create payment intent when user tries to pay the order
app.post("/create-payment-intent/:id", verifyUser, async (req, res) => {
  const { id } = req.params;

  try {
    // Calculate the order amount
    const amount = await calculateOrderAmount(id);

    // Fetch product details
    const productQuery = "SELECT * FROM products WHERE product_id = ?";
    const [productRows] = await db.promise().query(productQuery, [id]);

    if (productRows.length === 0) {
      return res.status(404).send("Product not found");
    }

    // Check if a customer with the provided email already exists
    let customer;
    try {
      // Retrieve the customer using the email
      const customerList = await stripe.customers.list({ email: req.email });
      if (customerList.data.length > 0) {
        // If a customer with the provided email exists, retrieve the first one
        customer = customerList.data[0];
        console.log("existing customer:");
      }
    } catch (error) {
      throw error; // Propagate other errors
    }

    // If the customer does not exist, create a new one
    if (!customer) {
      customer = await stripe.customers.create({
        email: req.email,
        name: req.name,
        phone: req.phone,
        // You can add other customer information here if needed
      });
      console.log("new customer:");
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      description: productRows[0].product_description,
      customer: customer.id,
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

//complete order and send email
app.post("/orders/:id", verifyUser, async (req, res) => {
  const { id } = req.params;
  const { payment_intent } = req.body;
  const userId = req.id; // Assuming you have access to the authenticated user's ID

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  if (paymentIntent.status === "succeeded") {
    const isCompleted = 1;
    const values = [id, userId, isCompleted, payment_intent];

    // Insert data into the orders table
    const insertOrderQuery =
      "INSERT INTO orders (product_id, buyer_id, isCompleted, payment_intent) VALUES (?, ?, ?, ?)";

    db.query(insertOrderQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        return res.status(500).json({ error: "Error inserting order" });
      }
      if (result.affectedRows === 0) {
        // No matching order found
        return res.status(404).json({ error: "Order not found" });
      }
      // Order updated successfully
      return res
        .status(200)
        .json({ message: "Order placed successfully", paymentIntent });
    });

    //send email

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
      to: req.email,
      subject: "Order placed successfully",
      html: `<h3>You have successfully placed your order</h3>
      <p>You have purchased: ${paymentIntent.description}</p>
      <p>I'll be in touch with you soon to confirm your order on the number provided: ${paymentIntent.shipping.phone}</p>
      <p>Check your order <a href="${emailURL}/profile">here</a>.</p>
      <p>If you have any questions, reply back to this email.</p>
      `,
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
    console.log("done");
  }
});

app.listen(process.env.PORT, () => {
  console.log("running... totally");
});
