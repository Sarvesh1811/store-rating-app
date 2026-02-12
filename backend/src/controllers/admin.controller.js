const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const bcrypt = require("bcryptjs");


exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID required" });
    }

    const owner = await User.findById(ownerId);

    if (!owner || owner.role !== "OWNER") {
      return res.status(400).json({ message: "Invalid store owner" });
    }

    const newStore = await Store.create({
      name,
      email,
      address,
      ownerId,
      averageRating: 0,
    });

    res.status(201).json(newStore);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = await Rating.countDocuments();

    res.json({
      users: totalUsers,
      stores: totalStores,
      ratings: totalRatings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "OWNER" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("ownerId", "name email");
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
