
var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
var  mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin-refael:1234@logintest-gmaih.mongodb.net/test_app");

app.use(express.static(__dirname + '/Views'));
app.set("view engine","ejs");



var isLogin=false;
var connectedUser="";
var userSchema=new mongoose.Schema({
    name:String,
    image:String,
    passwords:Number,
    comment:String
    
});


var Uesr=mongoose.model("Uesr",userSchema);



/*

var newUser=new Uesr({
    name:"",
    image:"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
    passwords:12
});


newUser.save(function(err,user){
    if(err){
        console.log("Error");
    }
    else{
        console.log("Succses");
        console.log(user);
    }
});


*/

app.get("/",function(req,res){
    console.log("Enter to GET /");

   
    if(isLogin){
        console.log("user Connect");

        Uesr.find({}, function(err, users) {
        if(err){
            console.log("Cant get the users");
        }
        else
         {
            
            console.log("Enter get the users");

            res.render("login",{userMap:users ,isLogin:isLogin,connectedUser:connectedUser});
        }
});
    
}else{

    res.render("login",{isLogin:isLogin});

}

});


app.post("/addUser/",function(req,res)
{
    console.log("Enter to POSt /addUser/");

    var tryConnect="=";
   var newpassword=req.body.newPassword;
   var userName=req.body.userName;
   

    Uesr.find({ name: userName,passwords: newpassword },function(err,findUser)
    {

        console.log(findUser.length);


    if(err||findUser.length==0)
    {
        console.log(err||findUser.length!==0);
        console.log("aaaaaaaaaaaaaaaa");
        console.log(findUser);
        console.log(findUser.length);
        res.redirect("/");


    }
    else{
        var tryConnect=findUser[0];

console.log(findUser);
console.log("not soppose to be here")
        if(tryConnect.name==userName&&tryConnect.passwords==newpassword)
        {
            console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
            console.log(findUser);
            console.log(tryConnect);
            isLogin=true;
        connectedUser=userName;
        res.redirect("/");
        }
        else{

      console.log("incorrect username or password");
        res.redirect("/");
        }
    }
    
});
});


app.get("/LogOut",function(req,res)
{
    console.log("Enter to GEt /LogOut");
    connectedUser=""
    isLogin=false;
    res.redirect("/");
})


app.post("/newComment/" ,function(req,res){
    console.log("Enter to POSt /newComment");
  

    if(isLogin)
    {
        var com=req.body.description;
        console.log(connectedUser);
        console.log(com);
        Uesr.update({name:connectedUser},{comment:com},function(err){
            if(err){
                console.log(err);
            }
            console.log(connectedUser+" add comment: "+com);

        });
        res.redirect("/");
    }


});
    



server.listen(80,'0.0.0.0',function(){
  console.log("server");
   })


/*

var user=[
    {
    name:"aril",
    id: 12
    },
    {
    name:"haim",
    id: 444
    }];
app.get("/hello",function(req,res){

    res.render("heloo",{user:user});
});


app.post("/hello2/tst",function(req,res){
    console.log("Enter to POST /hello2/ts");
    var name=req.body.newName;
    var id=req.body.id;
    console.log(req.body);
    console.log(req.body.newName +" "+ req.body.id);
    
    user.forEach(function(el){
        if(name==el.name&&id==el.id){
            console.log("secsses");
            isLogin=true;
            res.redirect("/hello2");
        }
        else{
            console.log(id +" "+ name);

            isLogin=false;
        }
    });
    
    user.push({name:"dav",id:23});
    res.redirect("/hello2");
});


app.post("/hello2",function(req,res){
    console.log("Enter to POST /hello2");
  
    user.push({name:"dav",id:23});
    res.redirect("/hello2");
});

app.get("/hello2",function(req,res){
    console.log("Enter to GET /hello2");

    res.render("heloo",{user:user, isLogin:isLogin});
});

app.get("/alert",function(req,res){
    console.log("alert");
 

 });
 
*/