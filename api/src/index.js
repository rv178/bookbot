const express = require("express")
const app = express()

require("../routes")(app)

app.get('/', function(req, res) {
  res.send("BookBot API")
});
app.get('*', function(req, res){
  res.status(404).send("404 Moment");
});

app.listen(3000, () => {
  console.log("API Server is up http://localhost:3000");
})