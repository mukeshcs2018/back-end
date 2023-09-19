import express from "express";

const app = express();

const port = 3500;



app.post("/", (req, res) =>{
    res.sendStatus(200);
});

app.listen(port, ()=>{
console.log("Server is active on "+ port);
});
