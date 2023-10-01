console.log("hello");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000, function(err){
    if (err) {
        console.log("Error in server setup")}
})

