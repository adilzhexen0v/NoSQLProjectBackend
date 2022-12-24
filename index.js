import express from 'express';
import mongoose from 'mongoose';
const app = express();

mongoose.connect(
     'mongodb+srv://admin:fDJOm5IhWXOwd0Hp@cluster0.5cekcxl.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
     console.log('DB connected');
}).catch((err) => {
     console.log("DB doesn't connected", err);
});


app.get('/', (req, res) => {
     res.send("something...");
});

app.listen(4000, (err) => {
     if(err){
          return console.log(err);
     }
     console.log("The web site is running!");
});