import express from 'express'
const router = express.Router()

// Import Controller files
import {getSchools,createSchool} from '../controller/schoolController'
// import {protect,checkScopes} from '../middleware/authMiddleware.js'

// @desc    - Fetch all Schools
// @route   - GET /school
//@access   - SCOPES["school-get"]
router.get('/', getSchools)

// @desc    - create School
// @route   - POST /school
//@access   - SCOPES["school-create"]
router.post('/',createSchool)

// @desc    - get students
// @route   - GET /school/students
//@access   - scopes["school-students"] 
// router.get('/students',protect,checkScopes, getSchoolStudents)


export default router