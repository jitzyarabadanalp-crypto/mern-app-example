import {body,param,query} from 'express-validator';

export const productValidation = [
    param('id').whitMessage('Product id must be a valid MongoDB id')
];

export const listProductsValidation = [
    query('page').optional().isInt({min:1}).whitMessage('page must be a positive integer'), 
    query('limit').optional().isInt({min:1,max:100}).whitMessage('Limit must be between 1 and 100'),
    query('search').optional().isString().whitMessage('Search must be a string')

];

export const createProductValidation = [
    body('name').trim().notEmpty().whitMessage('name is required').isLength({min:2,max:100}).whitMessage('name length must be between 2 a 100'),
    body('description').trim().notEmpty().whitMessage('description is required').isLength({min:5,max:500}).whitMessage('
        description length must be between 5 and 500'),
body('price').notEmpty().whitMessage('price is required').isFloat({min:0}).whitMessage('price must be greater than or equal to 0'),
body('stock').notEmpty().whitMessage('stock is required').isInt({min:0}).whitMessage('stock must be a integer >= 0')
];

export const updateProductValidation=[
    body('name').optional().trim().isLength({min:2,max:100}).withMessage('Name length must be between a 2 and 100'),
    body('description').optional().trim().isLength({min:5,max:500}).withMessage('Description length must be between 5 and 500'),
    body('price').optional().isFloat({min:0}).withMessage('Price must be greater than or equal to 0'),
    body('stock').optional().isInt({min:0}).withMessage('Stock must be a integer >=0')
];


