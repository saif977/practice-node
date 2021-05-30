//const http=require("http");
//const routes=require("./routes.js");

const express=require("express");

const bodyParser=require("body-parser");

const path=require("path");

const adminRouter=require("./routes/admin");
const shopRouter=require("./routes/shop");

const errorController=require("./controller/error");

const app=express();

app.set("view engine",'ejs');
app.set("views","views");

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,"public")));

app.use('/admin',adminRouter);
app.use('/shop',shopRouter);

app.use('/',errorController.errorPage);

app.listen(3000);










































// ============================================= fs module =================================================

// const fs=require("fs");

// let data=fs.readFile("./new.txt","utf-8",(err,data)=>{

//     fs.writeFile("./new2.txt",data,(err)=>{
//         if(err)console.log(err)});
//         fs.readFile("./new2.txt","utf-8",(err,data)=>{
//             console.log(data);
//             fs.unlink("./new2.txt",()=>{
//                 console.log("deleted");
//                 fs.mkdir("./newDir",()=>{
//                     fs.rmdir("./newDir",()=>{});
//                     fs.unlink("./new2.txt",()=>{});
//                 });
//         });
 
//      });
// });


//============================================================================================================