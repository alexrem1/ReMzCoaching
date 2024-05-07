import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cron from "cron";

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
  host: process.env.DB_HOST_ONLINE,
  user: process.env.DB_USER_ONLINE,
  password: process.env.DB_PASSWORD_ONLINE,
  database: process.env.DB_DB_ONLINE,
});

// middleware function to check if user is authenticated
const verifyUser = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
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
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.redirect(process.env.VURL);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect(process.env.VURL);
    }

    const { role } = decoded;
    if (role !== requiredRole) {
      return res.redirect(process.env.VURL);
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
    "UPDATE users SET Email=?, ContactNumber=?, EmergencyContactNumber=?, password=?, AddressLine1=?, AddressLine2=?, AddressCityTown=?, AddressPostcode=?, FirstChildFirstName=?, FirstChildLastName=?, FirstChildDOB=?, FirstChildYearGroup=?, FirstChildMedical=?, SecondChildFirstName=?, SecondChildLastName=?, SecondChildDOB=?, SecondChildYearGroup=?, SecondChildMedical=? WHERE id=?";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });

    const values = [
      req.body.Email,
      req.body.ContactNumber,
      req.body.EmergencyContactNumber,
      hash,
      req.body.AddressLine1,
      req.body.AddressLine2,
      req.body.AddressCityTown,
      req.body.AddressPostcode,
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
          if (err) return res.json({ Error: "Error comparing passwords" });
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
            // res.cookie("token", token, {
            //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            // secure: true,
            //   httpOnly: true,
            // sameSite: "none"
            //   domain: "remzcoaching-frontend.vercel.app",
            // });
            return res.status(200).json({
              Status: "User logged in successfully",
              role,
              name,
              id,
              email,
              phone,
              token,
            });
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

// // only users can log out
// app.get("/logout", verifyUser, (req, res) => {
//   res.cookie("token", "", {
//     expires: new Date(0),
//     httpOnly: true,
//     secure: true, // Ensure to use HTTPS
//     sameSite: "none",
//   });
//   return res.json({ Status: "User logged out successfully" });
// });

//users can register
app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO users (`CarerFirstName`, `CarerLastName`, `Email`, `ContactNumber`, `EmergencyContactNumber`, `password`, `AddressLine1`, `AddressLine2`, `AddressCityTown`, `AddressPostcode`, `FirstChildFirstName`, `FirstChildLastName`, `FirstChildDOB`, `FirstChildYearGroup`, `FirstChildMedical`, `SecondChildFirstName`, `SecondChildLastName`, `SecondChildDOB`, `SecondChildYearGroup`, `SecondChildMedical`, `Role`) VALUES (?)";
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
      req.body.AddressLine1,
      req.body.AddressLine2,
      req.body.AddressCityTown,
      req.body.AddressPostcode,
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

      // Send email notification

      var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.MY_EMAIL,
        to: req.body.Email,
        subject: "Welcome to ReMz Coaching!",
        html: `
        <p>Welcome aboard! We're thrilled to have you join us at ReMz Coaching. Thank you for choosing our platform.</p>

        <p>Your account has been successfully created, and you're now part of our community. Here's a quick overview of what you can do:</p>

        <ul>
        <li>
        <p>Explore and purchase our services</p>
        </li>
        <li>
        <p>Update account details</p>
        </li>
        <li>
        <p>Check order details</p>
        </li>
        <li>
        <p>Delete account</p>
        </li>
        </ul>

        <p>To get started, simply <a href="${process.env.VURL}/login">log in</a> to your account using the credentials you provided during registration. If you have any questions or need assistance, don't hesitate to reach out to our <a href="mailto:wickzy123@hotmail.com">support team</a>.</p>

        <p>We're excited to have you with us and look forward to serving you.
        </p>

        <p>Yours,<br/>Alex</p>
      `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "error sending email");
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.json({ Status: "User registered successfully" });
    });
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
          created: row.created,
          order_day: row.order_day,
          order_finalised: row.order_finalised,
          order_child: row.order_child,
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

//delete users orders as admin
app.delete(
  "/admin-delete-users-orders/:id",
  verifyRole("admin"),
  (req, res) => {
    const id = req.params.id;
    // console.log(id, req.params);

    const q = "DELETE FROM orders WHERE order_id =?";

    db.query(q, [id], (err, data) => {
      if (err) return res.json({ Error: "Error" });
      return res.json(data);
    });
  }
);

//admin can delete users accounts then their orders
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

//users can delete their accounts then their orders
app.delete("/delete-account/:id", verifyUser, (req, res) => {
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

      // Send email notification
      var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.MY_EMAIL,
        to: req.email,
        subject: "Account Deletion Confirmation",
        html: `
        <p>We're writing to confirm that your account has been successfully deleted from our system.
        </p>

        <p>Please note that this action is irreversible, and you will no longer have access to your account or any associated data.</p>

        <p>If you believe this deletion was made in error or if you have any questions, please don't hesitate to contact us.</p>

        <p>Thank you for being a part of our community. We appreciate your support.</p>

        <p>Yours,<br/>Alex</p>
      `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "error sending email");
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.json({
        message: "User and associated bookings deleted successfully",
      });
    });
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

    var mailOptions = {
      from: process.env.MY_EMAIL,
      to: userEMail,
      subject: "Forgotten your password",
      html: `
      <p>Forgotten your password on <a href="${process.env.VURL}">remzcoaching-frontend.vercel.app</a>? This email contains a secure link to choose a new password for your account.</p>

      <p>Email: ${userEMail}</p>

      <p>Use this secure link to reset your password: <a href="${process.env.VURL}/reset-password/${userID}/${token}">${process.env.VURL}/reset-password/${userID}/${token}</a></p>

      <p>Please note this password reset expires in 30 minutes</p>

      <p>If you did not request this password reset or believe your account has been compromised, please contact our support team immediately at <a href="mailto:wickzy123@hotmail.com">wickzy123@hotmail.com</a>.</p>

      <p>Yours, <br />Alex</p>
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
        if (err) return res.json({ Error: "Error hashing password" });

        const qSelectUser = "SELECT * FROM users WHERE id = ?";
        const qUpdatePassword = "UPDATE users SET password = ? WHERE id = ?";

        db.query(qSelectUser, [id], (err, userData) => {
          if (err) {
            console.error("Error fetching user data:", err);
            return res.status(500).json({ error: "Error fetching user data" });
          }

          if (userData.length === 0) {
            return res.status(404).json({ Error: "User not found" });
          }

          const userEmail = userData[0].Email;

          db.query(qUpdatePassword, [hash, id], (err, data) => {
            if (err) {
              console.error("Error resetting password:", err);
              return res
                .status(500)
                .json({ error: "Error resetting password" });
            }

            // Send email notification

            var transporter = nodemailer.createTransport({
              service: "hotmail",
              auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
              },
            });

            var mailOptions = {
              from: process.env.MY_EMAIL,
              to: userEmail,
              subject: "Password reset successfully",
              html: `
                <p>Your password has been successfully reset.</p>
             
                <p>If you initiated this password reset request, you can safely ignore this email. Your password has been updated, and you can now log in, <a href="${process.env.VURL}/login">here</a>, using your new password.</p>
                
                <p>If you did not reset password and believe your account has been compromised, please contact our support team immediately at <a href="mailto:wickzy123@hotmail.com">wickzy123@hotmail.com</a>.</p>

                <p>Yours, <br />Alex</p>
              `,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error, "error sending email");
              } else {
                console.log("Email sent: " + info.response);
              }
            });

            return res.json({ Status: "Successfully reset password" });
          });
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
  const userId = req.id;
  const { child, date, formattedDateTime } = req.body;

  console.log(req.body);

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
      description: productRows[0].product_description + " for " + child,
      customer: customer.id,
    });

    const sql = `INSERT INTO orders (buyer_id, product_id, isCompleted, payment_intent, created, order_day, order_child) VALUES (?,?,?, ?, ?, ?, ?)`;

    const isCompleted = null;

    const values = [
      userId,
      id,
      isCompleted,
      paymentIntent.id,
      formattedDateTime,
      date,
      child,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({ error: "Error creating order" });
      }

      // Prepare the response object with additional product details
      const response = {
        clientSecret: paymentIntent.client_secret,
        product: productRows[0], // Assuming only one product with the provided id
        // child: child, // Assuming only one child with the provided id
      };

      res.send(response);
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Internal Server Error");
  }
});

//complete order, send email and update spaces
app.put("/orders/:id", verifyUser, async (req, res) => {
  const { id } = req.params;
  const { payment_intent, formattedDateTime } = req.body;
  const userId = req.id; // Assuming you have access to the authenticated user's ID

  // Check if the payment intent already exists for the authenticated user
  const checkPaymentIntentQuery =
    "SELECT * FROM orders WHERE payment_intent =? AND buyer_id = ? AND isCompleted = 1";

  db.query(
    checkPaymentIntentQuery,
    [payment_intent, userId],
    async (err, rows) => {
      if (err) {
        console.error("Error checking payment intent:", err);
        return res.status(500).json({ error: "Error checking payment intent" });
      }

      if (rows.length > 0) {
        // Payment intent already exists for the user
        return res.status(400).json({
          error:
            "You have already made this transaction and will be redirected to your account shortly...",
        });
      }

      // Payment intent doesn't exist or isn't completed, proceed with order placement
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          payment_intent
        );

        if (paymentIntent.status !== "succeeded") {
          // Payment intent not succeeded, handle accordingly
          return res
            .status(400)
            .json({ error: "Payment intent not succeeded" });
        }

        // update data in orders table
        const updateOrder =
          "UPDATE orders SET isCompleted = ?, order_finalised = ? WHERE payment_intent = ?";

        const isCompleted = 1;
        const values = [isCompleted, formattedDateTime, payment_intent];

        db.query(updateOrder, values, async (err, result) => {
          if (err) {
            console.error("Error inserting order:", err);
            return res.status(500).json({ error: "Error inserting order" });
          }
          if (result.affectedRows === 0) {
            // No matching order found
            return res.status(404).json({ error: "Order not found" });
          }

          // Order placed successfully now send email

          //send email

          var transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: process.env.MY_EMAIL,
              pass: process.env.MY_PASSWORD,
            },
          });

          var mailOptions = {
            from: process.env.MY_EMAIL,
            to: req.email,
            subject: "Your Order Confirmation",
            html: `
            <p>We are delighted to inform you that your order has been successfully placed.</p>

            <ul>
            <li><p>You have purchased: ${paymentIntent.description}</p></li>
<li> <p>We'll be in touch with you soon to confirm your order on the number provided: ${paymentIntent.shipping.phone}</p></li>
            </ul>

      <p>You can view the status of your order and manage your account by visiting your profile page <a href="${process.env.VURL}/profile">here</a>.</p>


      <p>If you have any questions or need further assistance, please don't hesitate to reply to this email. We're here to help!</p>

      <p>Thank you for choosing us for your purchase.</p>

      <p>Yours, <br />Alex</p>
      `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error, "err sending email");
            } else {
              return res
                .status(200)
                .json({ Status: "Sent Order email to user" });
            }
          });

          const updateRemainingSpaces =
            "UPDATE products SET total_spaces = total_spaces - 1 WHERE product_id =? ";

          db.query(updateRemainingSpaces, [id], (err, result) => {
            if (err) {
              console.error("Error updating remaining spaces:", err);
              return res
                .status(500)
                .json({ error: "Error updating remaining spaces" });
            }

            if (result.affectedRows === 0) {
              // No matching order found
              return res.status(404).json({ error: "Order not found" });
            }

            return res
              .status(200)
              .json({ message: "Order placed successfully", paymentIntent });
          });
        });
      } catch (error) {
        console.error("Error retrieving payment intent:", error);
        return res
          .status(500)
          .json({ error: "Error retrieving payment intent" });
      }
    }
  );
});

const resetTotalSpaces = () => {
  try {
    const today = new Date().getDay();

    if (today === 1) {
      // Execute SQL query to update total_spaces for all products
      db.query("UPDATE products SET total_spaces = 10", (err, result) => {
        if (err) {
          console.log("Error resetting total_spaces:", err);
          // Handle the error accordingly, maybe throw an error or log it
          return;
        }
        console.log("Total spaces reset to 10 for all products.");
      });
    }
  } catch (error) {
    console.error("Error resetting total_spaces:", error);
  }
};

const job = new cron.CronJob("0 06 * * 1", resetTotalSpaces); // Run every Monday at 6am

// Start the cron job
job.start();

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

app.listen(process.env.PORT, () => {
  console.log("running... totally");
});
