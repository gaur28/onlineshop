const express = require('express');
const mongodb = require('mongodb')
const db = require('../data/database');
const whishlistController = require('../controllers/whishlist.controller');
const ObjectID = mongodb.ObjectId;

const router = express.Router();

router.get('/', whishlistController.getwhishlist); // /cart/

router.get('/addProduct/:id',async function(req,res){
    const productId = req.params.id;
    console.log(productId);
    const userId = req.session.uid

    const product =await db.getDb().collection('products').findOne({_id: new ObjectID(productId)},{_id:1,title:0,price:0});
    console.log(product)
    const productDetails = {
        productId: new ObjectID(productId),
        title: product.title,
        price: product.price,
        userId: userId,
        
    }
    
    console.log(productDetails);
    await db.getDb().collection('whishlist').insertOne(productDetails);

    res.redirect('/products');
  });
router.get('/remove/product/:id', whishlistController.deleteFromWhishlist )

module.exports = router;