import express from 'express'
const router = express.Router()

// Importing controller files
import {getStudents,createStudent} from '../controller/studentController'
import { protect,checkScopes } from '../middleware/authMiddleware'
// import {protect,checkScopes} from '../middleware/authMiddleware.js'

// @desc    - Fetch all Students
// @route   - GET /student
//@access   - SCOPES["student-get"]
router.get('/',protect, checkScopes ,getStudents)

// @desc    - create a student
// @route   - POST /student
//@access   - SCOPES["student-create"]
router.post('/',protect, checkScopes, createStudent)

export default router