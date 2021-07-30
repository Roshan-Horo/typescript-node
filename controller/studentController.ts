import { Request, Response} from 'express'
import {Student} from '../models/studentModel'
import {User} from '../models/userModel'
import { client } from '../config/db'


const getStudents = async (req: Request,res: Response) => {

    const cursor = await client.db("tifProject").collection("student").find({})

     const students = await cursor.toArray()

    if(students){
        res.json({"status": true,"content": {"data": students}})
    }else{
        res.status(404)
        throw new Error('Students not found')
    }

}

const createStudent = async (req: Request,res: Response) => {
     const {name,userId,schoolId} = req.body

     const student: Student = {
         name,
         userId,
         schoolId
     }
     const createdStudent = await client.db("tifProject").collection("student").insertOne(student)

     if(createdStudent){
         res.status(201).json(createdStudent)
     }else{
         res.status(400)
         throw new Error('Student not created')
     }

}

export {
    getStudents,
    createStudent
}