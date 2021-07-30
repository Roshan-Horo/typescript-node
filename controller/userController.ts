import {Request, Response} from 'express'
import { User } from '../models/userModel'
import { client } from '../config/db'
import { Password } from '../utils/password'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'


// SIGN IN
const authUser = async (req: Request,res: Response) => {
    const {email,password} = req.body

   const user = await client.db("tifProject").collection("user").findOne({ "email": email })


   if(!user){
     throw new Error('Invalid Credentials')
   }

   const storedPassword = (user.password);

   const passwordMatch = await Password.compare(
      user.password,
      password
   )
   if(!passwordMatch){
      throw new Error('Password not correct')
   }
    // Generate jwt token
    const userJwt = jwt.sign({
        id: user._id,
        email: user.email
    },
     'random'
     );

    // Store it on session object
    // req.session = {
    //     jwt: userJwt
    // }
    const signedUser = {
        id: user._id,
        email: user.email,
        token: userJwt
    }
    
    res.status(200).send(signedUser)
  
}

// SIGN UP
const registerUser = async (req: Request, res: Response) => {

    const {first_name,last_name,email,mobile,password,roleId} = req.body

    const existingUser = await client.db("tifProject").collection("user").findOne({ "email": email })

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
    const cursor = await client.db("tifProject").collection("user").aggregate([
        { "$project": { "password": 0 } },
        { "$lookup": {
            "let": { "roleObjId": { "$toObjectId": "$roleId" } },
            "from": "role",
            "pipeline": [
            {"$match": { "$expr": { "$eq": ["$_id", "$$roleObjId"] } }}
            ],
            "as": "roles"
        }}
        ])

    const result = await cursor.toArray()
    if(result.length > 0){
        res.json({
            "status": true,
            "content": {"data": result}
        })
    }else{
        res.status(404)
        throw new Error('Users not Found')
    }
}


// GET SINGLE USER
const getUserById = async (req: Request,res: Response) => {
    const id: any = req.params.id
    let oid = new ObjectId(id)
    const user = await client.db("tifProject").collection("user").findOne({ "_id": oid})

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
