const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Store = require('./Store');

const Rating = sequelize.define('Rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
});

Rating.belongsTo(User, { foreignKey: 'userId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = Rating;
