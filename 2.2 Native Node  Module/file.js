

const { error } = require("console");
const fs = require("fs");

// fs.writeFile("message.txt","Hello! there I just saved this text.", (err) =>{
//     if (err) throw err;

//     console.log("The file is saved as message.text check it in current directory. ");

// });


fs.readFile('./message.txt', 'utf8', (err, data) => {
    if (err) throw err;
    
    console.log(data);
});