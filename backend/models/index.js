// const sequelize = require('../config/db');
// const User = require('./User');
// const Store = require('./Store');
// const Rating = require('./Rating');

// // Associations
// User.hasMany(Store, { foreignKey: 'ownerId' });
// Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

// User.hasMany(Rating, { foreignKey: 'userId' });
// Rating.belongsTo(User, { foreignKey: 'userId' });

// Store.hasMany(Rating, { foreignKey: 'storeId' });
// Rating.belongsTo(Store, { foreignKey: 'storeId' });

// // your functions
// const getOwnerRatings = async (req, res) => {
//   try {
//     const ownerId = req.user?.id || 1; // hardcoded for testing
//     const ratings = await Rating.findAll({
//       include: [{ model: Store, where: { ownerId } }]
//     });
//     res.json(ratings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getOwnerRatings };

// module.exports = {
//   sequelize,
//   User,
//   Store,
//   Rating,
// };
