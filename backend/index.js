const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = 6050;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://akshatha:akshatha123@cluster0.kwgh8ar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let usersCollection;
let messagesCollection;

async function run() {
  try {
    await client.connect();
    const db = client.db("homefoods");

    usersCollection = db.collection("users");
    messagesCollection = db.collection("messages");

    // 1. Register a new user
    app.post("/upload", async (req, res) => {
      try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({
          name,
          email,
          password: hashedPassword,
        });

        res.status(201).json({ success: true, message: "User registered", userId: result.insertedId });
      } catch (error) {
        console.error("Error in /upload:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // 2. Login
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = "dummy-jwt-token";
        res.json({
          success: true,
          message: "Login successful",
          user: { id: user._id, name: user.name, email: user.email },
          token,
        });
      } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // 3. Reset Password
    app.put("/reset-password", async (req, res) => {
      try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
          return res.status(400).json({ message: "Email and new password are required." });
        }

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await usersCollection.updateOne(
          { email },
          { $set: { password: hashedPassword } }
        );

        res.json({ message: "Password reset successful" });
      } catch (error) {
        console.error("Error in /reset-password:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // 4. Submit Contact Form
    app.post("/contact", async (req, res) => {
      try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
          return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const result = await messagesCollection.insertOne({
          name,
          email,
          message,
          createdAt: new Date(),
        });

        res.status(201).json({ success: true, message: "Message sent", messageId: result.insertedId });
      } catch (error) {
        console.error("Error in /contact:", error);
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    });

    // 5. View all contact messages
    app.get("/messages", async (req, res) => {
      try {
        const allMessages = await messagesCollection.find().sort({ createdAt: -1 }).toArray();
        res.json(allMessages);
      } catch (error) {
        console.error("Error in /messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
      }
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

run().catch(console.dir);

// Default route
app.get("/", (req, res) => {
  res.send("🌐 Welcome to Home Foods Backend Server!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
