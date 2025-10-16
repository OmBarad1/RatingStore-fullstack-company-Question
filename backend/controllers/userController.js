const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');
const bcrypt = require('bcryptjs');
const { Op, fn, col } = require('sequelize');

exports.adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ users: totalUsers, stores: totalStores, ratings: totalRatings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, address, role: role || 'user' });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const where = {};
    if (name) where.name = { [Op.substring]: name };
    if (email) where.email = { [Op.substring]: email };
    if (address) where.address = { [Op.substring]: address };
    if (role) where.role = role;

    const users = await User.findAll({ where, attributes: ['id','name','email','address','role'] });

    const usersWithStoreRatings = await Promise.all(users.map(async u => {
      if (u.role === 'owner') {
        const stores = await Store.findAll({ where: { ownerId: u.id } });
        const storeRatings = await Promise.all(stores.map(async s => {
          const avgRow = await Rating.findOne({ where: { storeId: s.id }, attributes: [[fn('AVG', col('rating')), 'avgRating']] });
          const avg = avgRow?.dataValues?.avgRating ? parseFloat(avgRow.dataValues.avgRating) : null;
          return { storeId: s.id, storeName: s.name, avgRating: avg };
        }));
        return { ...u.toJSON(), storeRatings };
      } else return u;
    }));

    res.json(usersWithStoreRatings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: ['id','name','email','address','role'] });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'owner') {
      const stores = await Store.findAll({ where: { ownerId: id } });
      const storeRatings = await Promise.all(stores.map(async s => {
        const avgRow = await Rating.findOne({ where: { storeId: s.id }, attributes: [[fn('AVG', col('rating')), 'avgRating']] });
        const avg = avgRow?.dataValues?.avgRating ? parseFloat(avgRow.dataValues.avgRating) : null;
        return { storeId: s.id, storeName: s.name, avgRating: avg };
      }));
      res.json({ ...user.toJSON(), storeRatings });
    } else res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
