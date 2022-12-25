import { body } from 'express-validator';

export const addDoctorValidator = [
     body('name', 'Invalid data. Your name is very short').isLength({min: 3}),
     body('surname', 'Invalid data. Your surname is very short').isLength({min: 3}),
     body('email', 'Incorrect email').isEmail(),
     body('password', 'Your password is very short').isLength({min: 8}),
     body('occupation', 'Your occupation is very short').isLength({min: 5}),
     body('experience', 'Your experience is very short').isLength({min: 5}),
     body('hospital', 'Your hospital is very short').isLength({min: 5}),
     body('city', 'Your city is very short').isLength({min: 2}),
     body('address', 'Your address is very short').isLength({min: 5}),
     body('cv', 'Incorrect link to your CV').optional().isString()
];

