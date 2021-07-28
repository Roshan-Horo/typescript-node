import Student from '../models/studentModel.js'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const getStudents = asyncHandler(async (req,res) => {

    const students = await Student.find({})

    if(students){
        res.json({"status": true,"content": {"data": students}})
    }else{
        res.status(404)
        throw new Error('Students not found')
    }

})

const createStudent = asyncHandler(async (req,res) => {
     const {name,userId,schoolId} = req.body

     const student = new Student({
         name,
         userId,
         schoolId
     })
     const createdStudent = await student.save()

     if(createdStudent){
         res.status(201).json({"status": true,"content": {"data": createdStudent}})
     }else{
         res.status(400)
         throw new Error('Student not created')
     }

})

export {
    getStudents,
    createStudent
}