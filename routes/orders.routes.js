
const express = require('express');
const Razorpay = require('razorpay')

const ordersController = require('../controllers/orders.controller');

const router = express.Router();

router.post('/', ordersController.addOrder); // /orders

router.get('/', ordersController.getOrders); /// /orders
let instance = new Razorpay({
    key_id: 'rzp_test_AxiaXHQb05Fz5k',
    key_secret: '2c382f5gqD5D1p38xUdLHUj2',
  });

  let options = {
    amount: '10000',  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  
router.post('/create/orderId', function(req,res){
    
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.json({order})
        
      });
})

router.post("/api/payment/verify",(req,res)=>{

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
     var crypto = require("crypto");
     var expectedSignature = crypto.createHmac('sha256', '<YOUR_API_SECRET>')
                                     .update(body.toString())
                                     .digest('hex');
                                     console.log("sig received " ,req.body.response.razorpay_signature);
                                     console.log("sig generated " ,expectedSignature);
     var response = {"signatureIsValid":"false"}
     if(expectedSignature === req.body.response.razorpay_signature)
      response={"signatureIsValid":"true"}
         res.send(response);
     });
   
   
// // router.get('/success', ordersController.getSucess);
// router.get('/cancel', ordersController.getFailure);
module.exports = router;