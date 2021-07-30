import express from 'express'
const router = express.Router()

// Import Controller files
import {getSchools,createSchool, getSchoolStudents} from '../controller/schoolController'
import {protect,checkScopes} from '../middleware/authMiddleware'

// @desc    - Fetch all Schools
// @route   - GET /school
//@access   - SCOPES["school-get"]
router.get('/', protect, checkScopes('school-get'), getSchools)

// @desc    - create School
// @route   - POST /school
//@access   - SCOPES["school-create"]
router.post('/',protect, checkScopes('school-create'),createSchool)

// @desc    - get students
// @route   - GET /school/students
//@access   - scopes["school-students"] 
router.get('/students', protect, checkScopes('school-students'), getSchoolStudents)


export default router