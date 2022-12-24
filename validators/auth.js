import { body } from 'express-validator';

export const registerValidator = [
     body('email', 'Incorrect email').isEmail(),
     body('password', 'Your password is very short').isLength({min: 8}),
     body('name', 'Invalid data. Your name is very short').isLength({min: 3}),
     body('surname', 'Invalid data. Your surname is very short').isLength({min: 3}),
];

export const loginValidator = [
     body('email', 'Incorrect email').isEmail(),
     body('password', 'Your password is very short').isLength({min: 8})
];
