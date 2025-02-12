const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  produk: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  jumlah: { type: Number, required: true },
  totalHarga: { type: Number, required: true }
})

module.exports = mongoose.model('Order', OrderSchema)
