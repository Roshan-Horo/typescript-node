import express from 'express'
const router = express.Router()

// Import controller files
import {getRoles, createRole} from '../controller/roleController'
// import {protect,checkScopes} from '../middleware/authMiddleware.js'

// @desc    - Fetch all roles
// @route   - GET /role
//@access   - SCOPES['role-get'] 
router.get('/',getRoles)

// @desc    - create role
// @route   - POST /role
//@access   - Public 
router.post('/', createRole)



export default router