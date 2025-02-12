const Product = require('../models/Product')

module.exports = {
  // Get all products
  index: async (req, res) => {
    try {
      const products = await Product.find()
      if (products.length > 0) {
        res.status(200).json({
          status: true,
          data: products,
          method: req.method,
          url: req.url
        })
      } else {
        res.json({
          status: false,
          message: "Produk masih kosong"
        })
      }
    } catch (error) {
      res.status(400).json({ success: false })
    }
  },

  // Get a single product
  show: async (req, res) => {
    try {
      const produk = await Product.findById(req.params.id)
      res.json({
        status: true,
        data: produk,
        method: req.method,
        url: req.url,
        message: "Produk berhasil didapatkan"
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  },

  // Create a new product
  store: async (req, res) => {
    try {
      const produk = await Product.create(req.body)
      res.status(200).json({
        status: true,
        data: produk,
        method: req.method,
        url: req.url,
        message: "Produk berhasil ditambahkan"
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  },

  // Update a product
  update: async (req, res) => {
    try {
      const produk = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      res.json({
        status: true,
        data: produk,
        method: req.method,
        url: req.url,
        message: "Produk berhasil diubah"
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  },

  // Delete a product
  delete: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id)
      res.json({
        status: true,
        method: req.method,
        url: req.url,
        message: "Produk berhasil dihapus"
      })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}