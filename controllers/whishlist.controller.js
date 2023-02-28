const mongodb = require('mongodb')
const db = require('../data/database');
const Product = require('../models/product.model');
const  ObjectID  = mongodb.ObjectId;



async function getwhishlist(req, res) {
    const userId =  req.session.uid;
    const productDetails =  await db.getDb().collection('whishlist').find({userId:userId}, {_id:0,title:0,price:0,userId:1}).toArray()
    
    res.render('coustmer/whishlist/whishlist', {productDetails:productDetails});
  }

async function deleteFromWhishlist(req,res){
    const productId = req.params.id;
    console.log(productId);

    await db.getDb().collection('whishlist').deleteOne({_id:new ObjectID(productId)});

    res.redirect('/')

}
  module.exports = {
    getwhishlist:getwhishlist,
    deleteFromWhishlist:deleteFromWhishlist
  }