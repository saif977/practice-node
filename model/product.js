const fs=require("fs");
const path=require("path");
const p=path.join(require("../helper/path"),"data","products.json");
let products=[];

module.exports= class Product 
{
    constructor(title,price,desc)
    {
        this.title=title;
        this.price=price;
        this.description=desc;
    }
    
    save(cb)
    {
        fs.readFile(p,(err,data)=>{
            if(!err){          
                products=[...(JSON.parse(data))];
            }
              products.push(this);
              fs.writeFile(p,JSON.stringify(products),(err)=>{
                 cb();
              });
        });
    }

    static saveEditProduct(title,price,desc,id,cb){
        fs.readFile(p,(err,data)=>{
            if(!err){
                products=[...JSON.parse(data)];
            }
            products[(id)-1].title=title;
            products[(id)-1].price=price;
            products[(id)-1].description=desc;
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                cb();
            })
        })
    }

    static fetchAll(cb)
    {
        
        fs.readFile(p,(err,data)=>{
            if(err){
                cb([]);
                return
            }
            cb(JSON.parse(data));
        })
    }

    static fetchProduct(id,cb)
    {
        
        fs.readFile(p,(err,d)=>{
            if(err){
                console.log(err);
                cb([]);
            }
            else{
                id=parseInt(id);
                const data=JSON.parse(d);
                const prd=data.find((i)=>{
                  // console.log(i.id,id);
                    if(i.id===id)
                    return i;
                });
              // console.log(prd);
                cb(prd);
            }   
        })
    }

    static deleteProduct(id,cb){
        let prd=[];
        fs.readFile(p,(err,d)=>{
            const data=JSON.parse(d);
           prd=data.filter((i)=>{
               
              if(i.id!==parseInt(id,10))
              {
                  return i;
              }
            })
            fs.writeFile(p,JSON.stringify(prd),(err)=>{
                if(!err){
                    cb(prd);
                }
            })
        })
    }

}