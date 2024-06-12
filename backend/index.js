const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/wd18327', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Kết nối MongoDB thành công'))
.catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Định nghĩa mô hình Product
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: Number
});

const Product = mongoose.model('Product', productSchema);

// Định nghĩa API để tạo sản phẩm
app.post('/api/products', (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save()
    .then(() => res.status(201).send('Thêm sản phẩm thành công'))
    .catch((err) => res.status(500).send('Lỗi khi thêm sản phẩm: ' + err));
});

// Bắt đầu máy chủ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
