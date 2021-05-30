const Product=require("../model/product");
const Cart=require("../model/cart");
const path=require("path");
const p=path.join(require("../helper/path"),"data","cart.json");
const fs=require("fs");
const { json } = require("body-parser");

exports.getIndex=(req,res,next)=>{
    res.setHeader("set-Cookie","name:saif");
    res.render("shop/index",{
        pageTitle:"homePage",
        path:""
    });
}

exports.getShopProducts=(req,res,next)=>{
    Product.fetchAll((prdcts)=>{
        res.render("shop/shop",{
            pageTitle:"products",
            prods:prdcts,
            path:"/shop/shop"
        });
    });
}

exports.getProductsList=(req,res,next)=>{
    Product.fetchAll((prdcts)=>{
        res.render("shop/product-list",{
            pageTitle:"products",
            prods:prdcts,
            path:"/shop/product-list"
        });
    });
}

exports.getProductDetails=(req,res,next)=>{
    const productId=req.params.prodId;
    Product.fetchProduct(productId,(product)=>{
        res.render("shop/product-details",{
            pageTitle:'product details',
            prod:product,
            path:'/shop/product-details'
        });
    });
}

const fn=(cartData)=>{
    const pd=[];
    return new Promise((res,rej)=>{
        if(cartData.totalPrice===0)
        rej([]);
        cartData.products.forEach(i=>{
            Product.fetchProduct(i.id,(prd)=>{
                prd.qty=i.qty;
                 pd.push(prd); 
                 if(pd.length===cartData.products.length){
                     res(pd);           
                 } 
            })
        });
    })
}

exports.getCart=(req,res,next)=>{
    fs.readFile(p,(err,data)=>{
        cartData=JSON.parse(data);
        console.log(cartData);
        fn(cartData)
        .then(i=>{
                res.render("shop/cart",{
                pageTitle:"cart",
                path:"/shop/cart",
                products:i,
                totalPrice:cartData.totalPrice
            })
        })
        .catch(i=>{
            res.render("shop/cart",{
                pageTitle:"cart",
                path:"/shop/cart",
                products:i,
                totalPrice:cartData.totalPrice
            })
        })
    });
}

exports.postCart=(req,res,next)=>{
    const id=req.body.prodId
    Product.fetchProduct(id,(prdct)=>{
        Cart.saveCart(id,prdct.price);
    });
    res.redirect("/shop/cart/");
}

exports.getOrder=(req,res,next)=>{
    res.render('shop/order',{
        pageTitle:"order",
        path:"/shop/order"
    })
}
