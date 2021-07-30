import express from 'express'
const router = express.Router()

// Importing controller files
import {getStudents,createStudent} from '../controller/studentController'
import { protect,checkScopes } from '../middleware/authMiddleware'

// @desc    - Fetch all Students
// @route   - GET /student
//@access   - SCOPES["student-get"]
router.get('/',protect, checkScopes('student-get') ,getStudents)

// @desc    - create a student
// @route   - POST /student
//@access   - SCOPES["student-create"]
router.post('/',protect, checkScopes('student-create'), createStudent)

export default router