import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const moveDay = (date, day) => {
     const d = new Date(date).getDate();
     const ms = new Date(date).setDate(d + day);
     return new Date(ms);
}

const createTimes = (arr, count) => {
     let newArray = [];
     arr.forEach((element, index) => {
        for(let i = 0; i <= count; i++) {
          newArray.push(moveDay(element, i))
        }
     });
     newArray = newArray.sort(function(a,b){return a.getTime() - b.getTime()});
     return newArray;
}

export const add = async (req, res) => {
     try {
          const errors = validationResult(req);
          if (!errors.isEmpty()){
               return res.status(400).json(errors.array());
          }
          
          const times = createTimes(req.body.times, 5);

          const newDocument = new Appointment({
               doctorId: req.doctorId,
               price: req.body.price,
               times: times
          });

          const newAppointment = await newDocument.save(); 

          const updatedDoctor = await Doctor.updateOne({_id: req.doctorId}, {$set: {appointmentId: newAppointment._id}});
          if(updatedDoctor.matchedCount === 0){
               return res.status(404).json({
                    message: 'Doctor not found'
               });
          }

          const token = jwt.sign({
               _id: newAppointment._id
          }, 'appkey', {
               expiresIn: '10m'
          });


          res.json({
               newAppointment,
               token
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'Failed add appointment'
          });
     }
}

export const bookAppointment = async (req, res) => {
     try {

          const updatedUser = await User.updateOne({_id: req.userId}, {$push: {bookedAppointments: {doctorId: req.body.doctorId, time: req.body.time}}});
          if(updatedUser.matchedCount === 0){
               return res.status(404).json({
                    message: 'User not found'
               });
          }
          /*
          console.log(`\n\n\n${req.body.time}\n\n\n`);
          const updatedAppointment = await Appointment.updateOne({_id: req.body.appointmentId}, {$pull: {"times": req.body.time}});
          if(updatedAppointment.matchedCount === 0){
               return res.status(404).json({
                    message: 'Appointment not found'
               });
          }
          */
          res.json({
               updatedUser,
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'No access'
          });
     }
}