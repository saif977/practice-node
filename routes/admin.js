const express=require("express");

const router=express.Router();

const path=require("path");

const rootDir=require("../helper/path");

const shopController=require("../controller/shop");

const adminController=require("../controller/admin");

router.get("/add-product",adminController.getAddProducts);

router.post('/add-product',adminController.postAddProducts);

router.get('/admin-products',adminController.getAdminProducts);

router.get('/edit-product/:prodId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

router.get('/delete/:prodId',adminController.getDeleteProduct);


module.exports = router;