import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidator, loginValidator } from './validators/auth.js';
import { addDoctorValidator } from './validators/doctor.js';
import { adminValidator } from './validators/admin.js';
import checkAuth from './middlewares/checkAuth.js';
import { UserController, DoctorController, AdminController } from './controllers/index.js';
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

app.post('/user/register', registerValidator, UserController.register); 
app.post('/user/login', loginValidator, UserController.login);
app.get('/user/myprofile', checkAuth, UserController.getMyProfile);

app.post('/doctor/register', addDoctorValidator, DoctorController.addNewDoctor)

app.post('/admin/register', adminValidator, AdminController.register);
app.post('/admin/login', adminValidator, AdminController.register);
app.post('/admin/doctor/confirm', AdminController.confirm);
app.post('/admin/doctor/deny', AdminController.deny);

app.listen(4000, (err) => {
     if(err){
          return console.log(err);
     }
     console.log("The web site is running!");
});