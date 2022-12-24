import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
     try {
          const errors = validationResult(req);
          if (!errors.isEmpty()){
               return res.status(400).json(errors.array());
          }
          const password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          const hPassword = await bcrypt.hash(password, salt);

          const newDocument = new User({
               name: req.body.name,
               surname: req.body.surname,
               email: req.body.email,
               hashedPassword: hPassword
          });

          const newUser = await newDocument.save(); 

          const token = jwt.sign({
               _id: newUser._id
          }, 'secretkey', {
               expiresIn: '10m'
          });

          const { hashedPassword, ...userData } = newUser._doc;

          res.json({
               ...userData,
               token
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'Failed to register'
          });
     }
};

export const login = async (req, res) => {
     try {
          const user = await User.findOne({email: req.body.email});
          if (!user) {
               return res.status(404).json({
                    message: 'User not found'
               });
          };

          const isValidPassword = await bcrypt.compare(req.body.password, user._doc.hashedPassword);
          if (!isValidPassword) {
               return res.status(400).json({
                    message: 'Incorrect email or password'
               });
          };

          const token = jwt.sign({
               _id: user._id
          }, 'secretkey', {
               expiresIn: '10m'
          });

          const { hashedPassword, ...userData } = user._doc;

          res.json({
               ...userData,
               token
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'Failed to log in'
          });
     }
}

export const getMyProfile = async (req, res) => {
     try {
          const user = await User.findById(req.userId);

          if(!user){
               return res.status(404).json({
                    message: 'User not found'
               });
          }
          res.json(user);
     } catch (error) {
          
     }
};