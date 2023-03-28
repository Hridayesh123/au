const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const useRoute = require('./routes_container/userRoutes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/users', useRoute);

app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})





//https://github.com/ShahilJha/e-commerce-backend.git

