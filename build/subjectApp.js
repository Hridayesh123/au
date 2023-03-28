const express =  require('express');
const bodyParser =  require('body-parser');
const jwt =  require('jsonwebtoken');
const app = express();
const subjectRoutes = require('./routes_container/subjectRoutes')
const key="key";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', subjectRoutes);

app.use('/subject', subjectRoutes);

app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})
