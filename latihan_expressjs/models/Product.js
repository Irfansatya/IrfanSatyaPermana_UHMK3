const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  merek: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
  kategori: { type: String, required: true }
})

module.exports = mongoose.model('Product', ProductSchema)
