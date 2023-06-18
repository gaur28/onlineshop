// const Razorpay = require('razorpay')
const Order = require('../models/order.model');
const User = require('../models/user.model');
let crypto = require("crypto");


// let instance = new Razorpay({
//     key_id: 'rzp_test_AxiaXHQb05Fz5k',
//     key_secret: '2c382f5gqD5D1p38xUdLHUj2',
//   });

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('coustmer/orders/all-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

//   let options = {
//     amount: '10000',  // amount in the smallest currency unit
//     currency: "INR",
//     receipt: "order_rcptid_11"
//   };
//   instance.orders.create(options, function(err, order) {
//     console.log(order);
//     res.send({orderId:orderId})
//   });
 

//

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: await cart.items.map(function(item) {
//       return {
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: item.product.title,
//           },
//           unit_amount: +item.product.price* 100,
//         },
//         quantity: item.quantity,
//       }
//     }),
//     mode: 'payment',
//     success_url: 'http://localhost:3000/orders/success',
//     cancel_url: 'http://localhost:3000/orders/cancel',
//   });


//   res.status('303').redirect(session.url);
}

function getSucess(req,res){
    res.render('coustmer/orders/success')
}
function getFailure(req,res){
    res.render('coustmer/orders/failure')
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getFailure:getFailure,
  getSucess:getSucess
};