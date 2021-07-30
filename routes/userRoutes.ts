import express from 'express'
const router = express.Router()
import {getUsers, registerUser, getUserById, authUser} from '../controller/userController'
import {protect,checkScopes} from '../middleware/authMiddleware'

// @desc    - GET ALL USER
// @route   - GET /user
//@access   - SCOPES['user-get']
router.get('/',protect, checkScopes, getUsers)

// @desc    - SIGN UP
// @route   - POST /user/signup
//@access   - Public 
router.post('/signup',registerUser )

// @desc    - SIGN In
// @route   - POST /user/signin
//@access   - Public 
router.post('/signin',authUser )

// @desc    - GET SINGLE USER
// @route   - GET /user/:id
//@access   - SCOPES['user-get']
router.get('/:id',protect,checkScopes, getUserById)

export default router