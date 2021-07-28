import { Request, Response} from 'express'
import { Role } from '../models/roleModel'
import { client} from '../config/db'


const getRoles = async (req: Request,res: Response) => {
     const cursor = await client.db("tifProject").collection("role").find() 

     const roles = await cursor.toArray();

     roles.map(role => console.log("Roles: ", role))
     
     res.send(roles)
}

const createRole = async (req: Request,res: Response) => {
    const { name, scopes} = req.body

    if(name === null || name === undefined ){
      res.status(400).send({Error: "Invalid Entries"})
      throw new Error('Invalid entries')
    }

    const newRole: Role = {name, scopes}

    try {
      const result = await client.db("tifProject").collection("role").insertOne(newRole)
      console.log(`Role id: ${result.insertedId}`)

      res.status(201).send(result)

    } catch (error) {
      console.log(error)
    }
 
}

export {
    getRoles,
    createRole
}

