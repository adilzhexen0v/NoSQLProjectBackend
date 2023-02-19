import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import BookedAppointment from "../models/BookedAppointment.js";
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const getWithoutZero = (num) => {
     if (("" + num[0]) == '0') {
         return num[1];
     }
     return num;
}

// const moveDay = (date, day) => {
//      const a = new Date(date).getTime();
//      const b = a + (86400000 * +day);
//      return new Date(b);
// }

// const createTimes = (arr, count) => {
//      let newArray = [];
//      arr.forEach(element => {
//         for(let i = 0; i <= count; i++) {
//           let item = {
//                timeId: new ObjectId(),
//                time: moveDay(element, i),
//                booked: false
//           } 
//           newArray.push(item)
//         }
//      });
//      newArray = newArray.sort( function( a, b ){
//           return a.time.getTime() - b.time.getTime()
//      });
//      return newArray;
// }

export const add = async (req, res) => {
     try {
          const newDocument = new Appointment({
               doctorId: req.doctorId,
               price: req.body.price,
               days: req.body.days,
               times: req.body.times
          });

          const newAppointment = await newDocument.save(); 

          const updatedDoctor = await Doctor.updateOne({_id: req.doctorId}, {$set: {appointmentId: newAppointment._id}});
          if(updatedDoctor.matchedCount === 0){
               return res.status(404).json({
                    message: 'Doctor not found'
               });
          }
          res.json({
               newAppointment
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

          const doctor = await Doctor.findOne({appointmentId: req.body.appointmentId});
          if(!doctor) {
               return res.status(500).json({
                    message: 'Doctor not found'
               });
          }

          const bookedAppointment = new BookedAppointment({
               userId: req.body.userId,
               doctorId: doctor._id,
               time: new Date(
                    +req.body.year,
                    +req.body.month,
                    +req.body.day,
                    +getWithoutZero(req.body.time.substring(0, 2)),
                    +getWithoutZero(req.body.time.substring(3)),
               ),
               finished: false
          });

          const newBookedAppointment = await bookedAppointment.save();
          res.json({
               newBookedAppointment,
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'No access'
          });
     }
}