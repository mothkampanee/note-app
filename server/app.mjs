import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./utilites.mjs";
import User from "./models/user.model.mjs";
import Note from "./models/note.model.mjs";

mongoose.connect(process.env.MONGODB_URL);

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

// create account
app.post("/createAccount", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.status(400).json({
      error: true,
      message: "Full Name is required",
    });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exist",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

// view user
app.get("/viewUser", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.status(200).json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// add note
app.post("/addNote", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.status(201).json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// edit note
app.put("/editNote/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No changes provided",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// view all notes
app.get("/viewAllNotes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.status(200).json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// delete note
app.delete("/deleteNote/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note note found",
      });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.status(200).json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// update isPinned value
app.put("/updateNotePinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// search notes
app.get("/searchNote", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      error: true,
      message: "Search query is required",
    });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.status(200).json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
