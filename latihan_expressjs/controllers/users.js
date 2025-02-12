const User = require('../models/User');

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.find();
      if (users.length > 0) {
        res.status(200).json({
          status: true,
          data: users,
          method: req.method,
          url: req.url,
        });
      } else {
        res.status(200).json({
          status: false,
          message: 'Data masih kosong',
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        status: true,
        data: user,
        method: req.method,
        url: req.url,
        message: 'Data berhasil ditambahkan',
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updatedUser) {
        res.status(200).json({
          status: true,
          data: updatedUser,
          method: req.method,
          url: req.url,
          message: 'Data berhasil diubah',
        });
      } else {
        res.status(404).json({ status: false, message: 'User tidak ditemukan' });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser) {
        res.status(200).json({
          status: true,
          data: deletedUser,
          method: req.method,
          url: req.url,
          message: 'Data berhasil dihapus',
        });
      } else {
        res.status(404).json({ status: false, message: 'User tidak ditemukan' });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      if (user) {
        res.status(200).json({
          status: true,
          data: user,
          method: req.method,
          url: req.url,
        });
      } else {
        res.status(404).json({
          status: false,
          message: 'User tidak ditemukan',
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Terjadi kesalahan saat mencari user',
      });
    }
  },
};