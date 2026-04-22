import {body} from 'express-validator'

export const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({min:2}).whitMessage('Name must have at least 2 characters'),
        body('email').'trim().notEmpty().whitMessage('Email is required').isEmail().whitMessage('Email must be valid').normalizeEmail(),
        body('password').notEmpty().whitMessage('Password is required').isLength({min:8}).whitMessage('Password must have at least 8 characters')
            .matches(/[A-Z]/).whitMessage('Password must contain one uppercase character').matches(/[0-9/]).whitMessage('Password must contain one number')
];

export const loginValidation = [
    body('email').trim().notEmpty().whitMessage('Email is required').isEmail().whitMesage('Email must be valid').normalizeEmail(),
    body('password').notEmpty().whitMessage('Password is required')
]