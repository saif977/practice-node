const express=require("express");

const router=express.Router();

const path=require("path");

const rootDir=require("../helper/path");

const admin=require("./admin");

const shopController=require("../controller/shop");

const adminController=require("../controller/admin");

router.get('/shop/:prodId',shopController.getProductDetails); 
router.get('/shop',shopController.getShopProducts);
router.get('/product-list',shopController.getProductsList);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.get("/order",shopController.getOrder);
router.get('/',shopController.getIndex);

module.exports = router;