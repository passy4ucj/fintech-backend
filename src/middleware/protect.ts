// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from "express";
// import { StatusCodes } from 'http-status-codes';
// const asyncHandler = require('express-async-handler')
// const User = require('../models/User')


// // Protect Routes
// export const protect = asyncHandler(async (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     let token

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         // Set token from Bearer Token
//         token = req.headers.authorization.split(' ')[1]
//     } 
//     // Set token from cookie
//     // else if(req.cookies.token) {
//     //     token = req.cookies.token
//     // }

//     // Make sure token exists
//     if(!token) {
//         return res.status(StatusCodes.FORBIDDEN).json({
//             errors: [{ message: 'User not authenticated' }],
//         });
//     }

//     try {
//         //Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
        

//         req.user = await User.findById(decoded.id).populate('role', 'roleName')

//         next()
//     } catch (error) {
//         res.status(401)
//         throw new Error(`User not authorized`)
//     }
// })

// // Grant access to specific role
// const authorize = (...roles) => {
//     return (req, res, next) => {
//         if(!roles.includes(req.user.role.roleName)) {
//             res.status(401)
//         throw new Error(`User not authorized`)
//         }
//         next()
//     }
// }

// module.exports = {
//     protect,
//     authorize,
// }