// backend/index.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();
const port = 6050;

// Middleware
app.use(cors());
app.use(express.json());

// -------------------------
// MongoDB Setup
// -------------------------
const uri =
  "mongodb+srv://akshatha:akshatha123@cluster0.kwgh8ar.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let usersCollection;
let messagesCollection;
let ordersCollection;
let paymentsCollection;

// -------------------------
// Razorpay Setup
// -------------------------
const razorpay = new Razorpay({
  key_id: "rzp_test_RJ67F09oS4xNuf", // Test Key ID
  key_secret: "CPIKhtO5SiQsK4R3k8jUhpIz", // Test Key Secret
});

// -------------------------
// Predefined Admin
// -------------------------
const ADMIN_EMAIL = "admin@ecom.com";
const ADMIN_PASSWORD = "admin123"; // plaintext for demo, use bcrypt in production
const ADMIN_TOKEN = "dummy-admin-token"; // can replace with JWT later

// -------------------------
// MongoDB + Server
// -------------------------
async function run() {
  try {
    await client.connect();
    const db = client.db("homefoods");

    usersCollection = db.collection("users");
    messagesCollection = db.collection("messages");
    ordersCollection = db.collection("orders");
    paymentsCollection = db.collection("payments");

    console.log("✅ MongoDB connected successfully!");

    // ===============================
    // 1. Register User
    // ===============================
    app.post("/upload", async (req, res) => {
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
          return res.status(400).json({ success: false, message: "All fields required" });

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser)
          return res.status(409).json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({
          name,
          email,
          password: hashedPassword,
          role: "user",
        });

        res.status(201).json({ success: true, message: "User registered", userId: result.insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // ===============================
    // 2. Login (User + Predefined Admin)
    // ===============================
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).json({ success: false, message: "All fields required" });

        // ✅ Check predefined admin first
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          return res.json({ success: true, role: "admin", token: ADMIN_TOKEN });
        }

        // Regular user login
        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = "dummy-jwt-token"; // Replace with JWT later
        res.json({
          success: true,
          message: "Login successful",
          user: { id: user._id, name: user.name, email: user.email, role: user.role },
          token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // ===============================
    // 3. Reset Password
    // ===============================
    app.put("/reset-password", async (req, res) => {
      try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword)
          return res.status(400).json({ message: "Email and new password required" });

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashed = await bcrypt.hash(newPassword, 10);
        await usersCollection.updateOne({ email }, { $set: { password: hashed } });

        res.json({ message: "Password reset successful" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ===============================
    // 4. Contact Form
    // ===============================
    app.post("/contact", async (req, res) => {
      try {
        const { name, email, message } = req.body;
        if (!name || !email || !message)
          return res.status(400).json({ success: false, message: "All fields required" });

        const result = await messagesCollection.insertOne({ name, email, message, createdAt: new Date() });
        res.status(201).json({ success: true, message: "Message sent", messageId: result.insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    });

    app.get("/messages", async (req, res) => {
      try {
        const all = await messagesCollection.find().sort({ createdAt: -1 }).toArray();
        res.json(all);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch messages" });
      }
    });

    // ===============================
    // 5. Razorpay Payment Routes
    // ===============================
    app.post("/api/payment/create-order", async (req, res) => {
      try {
        const { amount, userId, items } = req.body;

        const options = { amount: amount * 100, currency: "INR", receipt: `order_rcpt_${Date.now()}` };
        const order = await razorpay.orders.create(options);

        await ordersCollection.insertOne({
          userId,
          items,
          amount,
          razorpayOrderId: order.id,
          status: "Pending",
          createdAt: new Date(),
        });

        res.json(order);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create order" });
      }
    });

    app.post("/api/payment/verify", async (req, res) => {
      try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac("sha256", razorpay.key_secret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature === razorpay_signature) {
          await paymentsCollection.insertOne({ razorpay_order_id, razorpay_payment_id, razorpay_signature, createdAt: new Date() });
          await ordersCollection.updateOne({ razorpayOrderId: razorpay_order_id }, { $set: { status: "Paid" } });

          res.json({ success: true, message: "Payment verified successfully" });
        } else {
          res.status(400).json({ success: false, message: "Invalid payment signature" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Payment verification failed" });
      }
    });

    // ===============================
    // 6. Admin APIs (Protected routes can be added later)
    // ===============================
    app.get("/admin/users", async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.json(users);
    });

    app.get("/admin/orders", async (req, res) => {
      const orders = await ordersCollection.find().sort({ createdAt: -1 }).toArray();
      res.json(orders);
    });

    app.put("/admin/orders/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      await ordersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
      res.json({ success: true, message: "Order updated" });
    });

    app.get("/admin/payments", async (req, res) => {
      const payments = await paymentsCollection.find().sort({ createdAt: -1 }).toArray();
      res.json(payments);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

run().catch(console.dir);

// Default route
app.get("/", (req, res) => {
  res.send("🌐 Welcome to Home Foods Backend Server!");
});

// Start server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
