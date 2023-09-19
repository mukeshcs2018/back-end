import express from "express";


const expressObj = express();
const port = 3300;

expressObj.get("/", (req, res)=>{
    res.send("/index.html");
});

expressObj.listen(port, ()=>{
    

    console.log(`Server is running on port ${port}`);
});
