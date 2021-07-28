import {Request, Response} from 'express'
import { User } from '../models/userModel'
import { client } from '../config/db'
import { Password } from '../utils/password'



// SIGN IN
const authUser = async (req: Request,res: Response) => {
    const {email,password} = req.body

   const user  = await client.db("tifProject").collection("user").find({ "email": email })
   if(!user){
     throw new Error('Invalid Credentials')
   }

//     const storedPassword = (user.password)!;

//    const passwordMatch = await Password.compare(
//       user.password,
//       password
//    )
//    if(!passwordMatch){
//       throw new Error('Password not correct')
//    }
  
}

const registerUser = async (req: Request, res: Response) => {

    const {first_name,last_name,email,mobile,password,roleId} = req.body

    const existingUser = await client.db("tifProject").collection("user").find({ "email": email })

    if(existingUser) {
       throw new Error('Email is already registered')

    }

       const hashed = await Password.toHash(password)
       
       const hashedPassword = hashed;
    
    const user: User = {
        first_name,
        last_name,
        email,
        mobile,
        password: hashedPassword,
        roleId

    }
    const createdUser = await client.db("tifProject").collection("user").insertOne(user)

    if(createdUser){  
    res.status(201).send(createdUser)
    }else{
        res.status(400).send('Invalid user data')
    }
    

}

// GET ALL USERS
const getUsers = async (req: Request,res: Response) => {
    const users = await client.db("tifProject").collection("user").find({})

    if(users){
        res.json({
            "status": true,
            "content": {"data": users}
        })
    }else{
        res.status(404)
        throw new Error('Users not Found')
    }
}


// GET SINGLE USER
const getUserById = async (req: Request,res: Response) => {
    const id = req.params.id
    const user = await client.db("tifProject").collection("user").find({ _id : id})
    if(user){
        res.json({
            "status": true,
            "content": {"data": user}
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
}

export {
    authUser,
    registerUser,
    getUserById,
    getUsers
}
