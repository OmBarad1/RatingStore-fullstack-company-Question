const Rating = require('../models/Rating');

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    let existing = await Rating.findOne({ where: { storeId, userId } });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ message: 'Rating updated' });
    }

    await Rating.create({ storeId, userId, rating });
    res.json({ message: 'Rating submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOwnerRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      include: [
        { model: Store, attributes: ['name'] },
        { model: User, attributes: ['name'] }
      ]
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};