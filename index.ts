import express,{Application,Request, Response, NextFunction} from 'express'
import { connectDB } from './config/db'
import roleRoutes from './routes/roleRoutes'
import schoolRoutes from './routes/schoolRoutes'
import userRoutes from './routes/userRoutes'

const app: Application = express()
app.use(express.json())

// connect to DB
connectDB()

app.use("/role", roleRoutes)
app.use("/school", schoolRoutes)
app.use("/user", userRoutes)

app.get("/", (req: Request,res: Response) => {
    res.send('Hello world')
})

app.listen(8000,() => console.log('Server listening at PORT 8000'))
