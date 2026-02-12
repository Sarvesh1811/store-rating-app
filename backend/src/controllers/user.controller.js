const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');
const bcrypt = require('bcryptjs');


exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().select(
      'name address averageRating'
    );
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.rateStore = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.userId;

    let userRating = await Rating.findOne({ userId, storeId });

    if (userRating) {
      userRating.rating = rating;
      await userRating.save();
    } else {
      await Rating.create({ userId, storeId, rating });
    }

    const ratings = await Rating.find({ storeId });
    const avg =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    await Store.findByIdAndUpdate(storeId, {
      averageRating: avg.toFixed(1)
    });

    res.json({ message: 'Rating submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.userId;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword
    });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
