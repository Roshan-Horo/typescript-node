import jwt from 'jsonwebtoken'
import { User } from '../models/userModel'
import { client } from '../config/db'
import { Request, Response, NextFunction} from 'express'
import { ObjectId } from 'mongodb'
import { getRoles } from '../controller/roleController'

const protect = async (req: Request,res: Response,next: NextFunction) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, 'random')
            
            // console.log("decoded: ",decoded)
            let oid = new ObjectId((<any>decoded).id)

            // const user = await client.db("tifProject").collection("user").findOne({ "_id": oid})
            
            
           // req.currentUser = await User.findById(decoded.id).populate("roleId").select('-password')
            
            const cursor = await client.db("tifProject").collection("user").aggregate([
                {"$match": { "_id" : oid  } },
                { "$project": { "password": 0 } },
                { "$lookup": {
                    "let": { "roleObjId": { "$toObjectId": "$roleId" } },
                    "from": "role",
                    "pipeline": [
                    {"$match": { "$expr": { "$eq": ["$_id", "$$roleObjId"] } }}
                    ],
                    "as": "roles"
                },}
            ])

            const user = await cursor.toArray()
            
            if(user.length > 0){
            // console.log('user: ', user[0],user[0].scopes)
            req.currentUser = await (<any>user[0]);

            next()
            }

        } catch (err) {
            console.error(err)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }

}

// FUNCTIONAL PROGRAMMING WAY
const checkScopes = (currentScope: string) => {
    let isAuthorized = false;
    return (req: Request, res: Response, next: NextFunction) => {

        if(req.currentUser && req.currentUser.roles){
            let scopes = req.currentUser.roles[0].scopes
            scopes.map(scope => {
                if(scope === currentScope){
                    isAuthorized = true
                }
            })

        }

        if(isAuthorized){
            next()
        }else{

            res.status(401)
            throw new Error('No Access')

        }

    }
}

export {
    protect,
    checkScopes
}

// const checkScopes = async (req: Request,res: Response,next: NextFunction) => {
//     let isAssigned = false
//     // console.log(req.currentUser)

//     if(req.currentUser && req.currentUser.roles){

//     let scopes = (req.currentUser.roles[0].scopes)
//     // console.log(scopes)




//     let path = req.originalUrl
//     // console.log(path)

//     // console.log(path.split('/').length)



//     function check(passScope: string){
//     for(let scope of scopes){
//     if(passScope === scope){
//         isAssigned = true
//       }
//      }
//     }

//     if(path.split('/').length === 3){

//         // switch(path){
//         // case "/school/students":check("school-students");
//         // break;
        
//         // }
//         if(path === "/school/students"){
//             check("school-student")
//         }else if(path.includes('/user/')){
//             if(req.method === 'GET'){
//             check("user-get")
//             } 
//         }else{

//         }
//     }   
    


//     if(path.split('/').length === 2){
    
//         switch(path){
        
//             case "/user": check("user-get")
//             break;
            
//             case "/role": check("role-get")
//             break;
            
//             case "/student": 
//             if(req.method === 'GET'){
//                 check("student-get")
//             }else if(req.method === 'POST'){
//                 check("student-create")
//             }else{
            
//             }
//             break;

//             case "/school": 
//             if(req.method === 'GET'){
//                 check("school-get")
//             }else if(req.method === 'POST'){
//                 check("school-create")
//             }else{
            
//             }
//             break;


//         } // end switch 
    
//     }

// } // End if
 
//   if(!isAssigned){
//       res.status(401).send('No Access')
//       throw new Error('No Access')
//   }

//   next()

// }



