const Order = require('../model/OrderModel');
const User = require('../model/usermodel');

exports.addOrder = async (req, res) => {
  // const { order_products, user_id, total_price, payment_method } = req.body;

  const { user_id } = req.body;
  try {
    const user = await User.findById(user_id);

    if (user.address === null) {
      return res.status(401).json({ message: 'Address not uploaded' });
    }

    // const order = new Order({
    //   order_products: order_products,
    //   user_id: user_id,
    //   total_price: total_price,
    //   payment_method: payment_method,
    // });

    await Order.create(req.body);

    return res.status(200).json({ message: 'Order Created Successfuly ' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  const { user_id } = req.params;

  try {
    const userorders = await Order.find({ user_id: user_id })
      .select([
        'order_products',
        'total_price',
        'status',
        'transaction_id',
        'delivery_status',
      ])
      .populate({
        path: 'order_products.product_id',
        model: 'Product',
        select: ['product_name', 'imgUrl'],
      });

    if (!userorders) {
      return res.status(300).json({ message: 'User has no orders' });
    }

    // Remove transaction_id from the response if it is null
    const ordersWithFilteredTransactionId = userorders.map((order) => {
      const orderObj = order.toObject();
      if (orderObj.transaction_id === null) {
        delete orderObj.transaction_id;
      }
      return orderObj;
    });

    return res.status(200).json(ordersWithFilteredTransactionId);
  } catch (error) {
    res.json({ message: error.message });
  }
};
