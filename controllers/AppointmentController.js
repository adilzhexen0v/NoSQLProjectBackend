import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import BookedAppointment from "../models/BookedAppointment.js";
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';


const moveDay = (date, day) => {
     const a = new Date(date).getTime();
     const b = a + (86400000 * +day);
     return new Date(b);
}

const createTimes = (arr, count) => {
     let newArray = [];
     arr.forEach(element => {
        for(let i = 0; i <= count; i++) {
          let item = {
               timeId: new ObjectId(),
               time: moveDay(element, i),
               booked: false
          } 
          newArray.push(item)
        }
     });
     newArray = newArray.sort( function( a, b ){
          return a.time.getTime() - b.time.getTime()
     });
     return newArray;
}

export const add = async (req, res) => {
     try {
          const errors = validationResult(req);
          if (!errors.isEmpty()){
               return res.status(400).json(errors.array());
          }
          
          const times = createTimes(req.body.times, +req.body.days);

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
               expiresIn: '30m'
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

          const bookedAppointment = new BookedAppointment({
               userId: req.body.userId,
               doctorId: req.body.doctorId,
               appointmentId: req.body.appointmentId,
               timeId: req.body.timeId
          });

          const newBookedAppointment = await bookedAppointment.save();

          const updateBookedTime = await Appointment.updateOne({'times.timeId': ObjectId(req.body.timeId)}, {$set: {'times.$[elem].booked': true}}, {arrayFilters: [{'elem.timeId': ObjectId(req.body.timeId)}]});

          res.json({
               newBookedAppointment,
               deleteTime: updateBookedTime
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'No access'
          });
     }
}