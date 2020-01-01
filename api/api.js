const express = require('express');
const app = express();
const port = 3001

app.get("*", (req, res) => {
  res.status(200).json({ res: "GET res from API!", requestedEndpoint: req.url })
}
)
app.post("*", (req, res) => {
  res.status(200).json({ "msg": "POST res from api!", requestedEndpoint: req.url })
})

app.listen(port, function () {
  console.log(`API running on port -> ${port}`)
});