const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.getOwnerStores = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const stores = await Store.find({ ownerId });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const store = await Store.findOne({ ownerId });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const ratings = await Rating.find({ storeId: store._id })
      .populate('userId', 'name email');

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStoreSummary = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const store = await Store.findOne({ ownerId })
      .select('name averageRating');

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
