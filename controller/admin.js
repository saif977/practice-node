const Product=require("../model/product");


exports.getAddProducts=(req,res,next)=>{
    res.render("admin/admin",{
        pageTitle:"admin",
        path:"/admin/add-product",
        editMode:false
    });
}

exports.postAddProducts=(req,res,next)=>{
const title = req.body.title;
const price=req.body.price;   
const desc=req.body.description;
const product=new Product(title,price,desc);
product.save(()=>{
    res.redirect("/shop/shop");
    
});
}


exports.getAdminProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render("admin/admin-products",{
            pageTitle:"admin-products",
            prods:products,
            path:"/admin/admin-products"
        });
    });
}

exports.getEditProduct=(req,res,next)=>{
    const edit=req.query.edit;
    const id=req.params.prodId;
    
    Product.fetchProduct(id,(product)=>{
        res.render("admin/admin",{
            pageTitle:"admin",
            path:"/admin/edit-product",
            editMode:edit,
            product:product
        });
    })
}

exports.postEditProduct=(req,res,next)=>{
   const title = req.body.title;
   const price=req.body.price;   
   const desc=req.body.description; 
   const id=req.body.id;
   Product.saveEditProduct(title,price,desc,id,()=>{
       console.log("done")
       res.redirect("/shop/shop");
   });   
}

exports.getDeleteProduct=(req,res,next)=>{
    const id=req.params.prodId;
    Product.deleteProduct(id,(prd)=>{
        res.redirect('/shop/shop');
    });
}