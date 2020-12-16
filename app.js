const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
// we using express.static("public") to help the server to get all static files like css files or images which
// will be existing on our desktop to load all files togther without losing any info.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  };
//  then we need to transfer all of above js data into stringfiy data by JSON
  const jsonData = JSON.stringify(data);


const url = "Enter your URL";
//  option will be an object which contain method and Authentication (contain (any string: apiKey)).
const option = {
  method: "POST",
  auth: "Name: AUTH"
}


const request = https.request(url, option, function(response) {
// here to check and use another html file in defferent cases.
  if(response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  }
  response.on("data", function(data) {
    var allData = JSON.parse(data);

  });
});

  request.write(jsonData);
  request.end();

});
app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("server is working on port 3000");
});
