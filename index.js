import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidator, loginValidator } from './validators/auth.js';
import checkAuth from './middlewares/checkAuth.js';
import { UserController } from './controllers/index.js';
mongoose.connect(
     'mongodb+srv://admin:fDJOm5IhWXOwd0Hp@cluster0.5cekcxl.mongodb.net/hospitalDB?retryWrites=true&w=majority'
).then(() => {
     console.log('DB connected');
}).catch((err) => {
     console.log("DB didn't connect", err);
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async(req, res) => {
     res.send("something...");
});

app.post('/register', registerValidator, UserController.register); 
app.post('/login', loginValidator, UserController.login);
app.get('/myprofile', checkAuth, UserController.getMyProfile);

app.listen(4000, (err) => {
     if(err){
          return console.log(err);
     }
     console.log("The web site is running!");
});