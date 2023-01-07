import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidator, loginValidator } from './validators/auth.js';
import { addDoctorValidator } from './validators/doctor.js';
import { adminValidator } from './validators/admin.js';
import checkUser from './middlewares/checkUser.js';
import checkAdmin from './middlewares/checkAdmin.js';
import { UserController, DoctorController, AdminController, AppointmentController } from './controllers/index.js';
import checkDoctor from './middlewares/checkDoctor.js';

mongoose.set("strictQuery", false);
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
app.get('/user/myprofile', checkUser, UserController.getMyProfile);
app.post('/user/appointment', checkUser, AppointmentController.bookAppointment);

app.get('/doctors', checkUser, DoctorController.getAllDoctors);

app.post('/doctor/register', addDoctorValidator, DoctorController.register);
app.post('/doctor/login', loginValidator, DoctorController.login);
app.get('/doctor/myprofile', checkDoctor, DoctorController.getMyProfile);
app.post('/doctor/appointment', checkDoctor, AppointmentController.add);

app.post('/admin/register', adminValidator, AdminController.register);
app.post('/admin/login', adminValidator, AdminController.login);
app.post('/admin/doctor/confirm', checkAdmin, AdminController.confirm);
app.post('/admin/doctor/deny', checkAdmin, AdminController.deny);

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
     if(err){
          return console.log(err);
     }
     console.log("The web site is running!");
});
