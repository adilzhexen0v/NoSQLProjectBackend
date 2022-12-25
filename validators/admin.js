import { body } from 'express-validator';

export const adminValidator = [
     body('username', 'Incorrect username').isLength({min: 3}),
     body('password', 'Your password is very short').isLength({min: 8})
];

