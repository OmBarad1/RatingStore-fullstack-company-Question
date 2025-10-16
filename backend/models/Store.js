const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Store = sequelize.define('Store', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING(400) },
});

Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

module.exports = Store;
