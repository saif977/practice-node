const fs=require("fs");
const path=require("path")
const p=path.join(require("../helper/path"),"data","cart.json");
module.exports=class Cart{
    static saveCart(id,productPrice){
        let cart={products:[],totalPrice:0};
        fs.readFile(p,(err,data)=>{
            const cartData=JSON.parse(data);
            if(!err){
            cart=cartData;
            console.log(cart)
            const productIndex=cart.products.findIndex((i)=>{
                return parseInt(i.id)===parseInt(id);
            });
            console.log(productIndex);
            if(productIndex!=(-1)){
                ++cart.products[productIndex].qty;
            }
            else{
                cart.products.push({id:id,qty:1});
            }
            cart.totalPrice=parseInt(cart.totalPrice)+parseInt(productPrice);
            console.log(cart);
            fs.writeFile(p, JSON.stringify(cart),(err)=>{
              // console.log(err);
            })
        } 
        }); 
    }
}