const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
  // Get all orders
  index: async (req, res) => {
    try {
      const orders = await Order.find().populate('produk');
      if (orders.length > 0) {
        res.status(200).json({
          status: true,
          data: orders,
          method: req.method,
          url: req.url,
        });
      } else {
        res.json({
          status: false,
          message: "Pesanan masih kosong",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },

  // Get a single order
  show: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate('produk');
      res.json({
        status: true,
        data: order,
        method: req.method,
        url: req.url,
        message: "Pesanan berhasil didapatkan",
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },

  // Create a new order
  store: async (req, res) => {
    try {
      const { produk, jumlah } = req.body;

      const selectedProduct = await Product.findById(produk);
      if (!selectedProduct) {
        return res.status(404).json({ status: false, message: "Produk tidak ditemukan" });
      }

      if (selectedProduct.stok < jumlah) {
        return res.status(400).json({ status: false, message: "Stok produk tidak mencukupi" });
      }

      const totalHarga = selectedProduct.harga * jumlah;

      const order = await Order.create({ produk, jumlah, totalHarga });

      // Kurangi stok produk setelah pesanan dibuat
      selectedProduct.stok -= jumlah;
      await selectedProduct.save();

      res.status(200).json({
        status: true,
        data: order,
        method: req.method,
        url: req.url,
        message: "Pesanan berhasil dibuat",
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },

  // Delete an order and restore stock
  delete: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ status: false, message: "Pesanan tidak ditemukan" });
      }

      const product = await Product.findById(order.produk);
      if (product) {
        // Kembalikan stok produk saat pesanan dihapus
        product.stok += order.jumlah;
        await product.save();
      }

      await Order.findByIdAndDelete(req.params.id);
      res.json({
        status: true,
        method: req.method,
        url: req.url,
        message: "Pesanan berhasil dihapus",
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },
};