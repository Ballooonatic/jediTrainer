const express = require('express')
const app     = express()

app.use(express.static("./client"))

app.all("*", (req, res) => res.sendFile("./client/index.html"));

app.listen(8000, () => console.log("~~~ server up on 8000 ~~~"))