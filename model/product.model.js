const moongose = require('mongoose');

const ReviewsRatingSchema = moongose.Schema({
  user_id: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
  },

  rating: {
    type: Number,
    required: true,
  },

  review_Description: {
    type: String,
  },
});

const productSchema = moongose.Schema({
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },

  decription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Oil Filter', 'Air Filter', 'Car Oil'],
  },
  imgUrl: {
    type: String,
    required: false,
    default: null,
  },

  Reviews_Rating: [ReviewsRatingSchema],
});

const Product = moongose.model('Product', productSchema);

module.exports = Product;
