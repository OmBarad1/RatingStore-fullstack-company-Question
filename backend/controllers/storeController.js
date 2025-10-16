const Store = require('../models/Store');
const Rating = require('../models/Rating');
const { fn, col } = require('sequelize');

exports.listStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const where = {};

    // Apply search filters
    if (name) where.name = name;
    if (address) where.address = address;

    // Role-based filter: if owner, only their stores
    if (req.user.role === 'owner') {
      where.ownerId = req.user.id;
    }

    const stores = await Store.findAll({ where });

    // Add average rating for each store
    const storesWithAvg = await Promise.all(
      stores.map(async (s) => {
        const avgRow = await Rating.findOne({
          where: { storeId: s.id },
          attributes: [[fn('AVG', col('rating')), 'avgRating']],
        });
        const avg = avgRow?.dataValues?.avgRating
          ? parseFloat(avgRow.dataValues.avgRating)
          : null;
        return { ...s.toJSON(), avgRating: avg };
      })
    );

    res.json(storesWithAvg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
