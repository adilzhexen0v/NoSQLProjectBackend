import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addNewDoctor = async(req, res) => {
     try {
          const errors = validationResult(req);
          if (!errors.isEmpty()){
               return res.status(400).json(errors.array());
          }


          const hospitalDocument = new Hospital({
               hospital: req.body.hospital,
               city: req.body.city,
               address: req.body.address
          });
          const newHospital = await hospitalDocument.save();

          const password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          const hPassword = await bcrypt.hash(password, salt);

          const doctorDocument = new Doctor({
               name: req.body.name,
               surname: req.body.surname,
               email: req.body.email,
               hashedPassword: hPassword,
               occupation: req.body.occupation,
               experience: req.body.experience,
               hospitalId: newHospital._id
          });

          const newDoctor = await doctorDocument.save();
          const token = jwt.sign({
               _id: newDoctor._id
          }, 'secretkey', {
               expiresIn: '10m'
          });

          res.json({
               token,
               newDoctor,
               newHospital,
          })


     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'Failed to doctor register'
          });
     }
     
};