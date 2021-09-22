
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/prospectiveclientdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error connecting to database"))
db.once('open',()=>console.log("Connected to database"))

app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var company = req.body.company;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    var data = {
        "name": name,
        "company": company,
        "email": email,
        "phone": phone,
        "message": message
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    

    return res.redirect('index.html')
})
  

app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/index.html');
    //Clear Form

}).listen(3000);

console.log("Listening on port 3000");

