import express,{Application,Request, Response, NextFunction} from 'express'
import { connectDB } from './config/db'

// Importing Routes
import roleRoutes from './routes/roleRoutes'
import schoolRoutes from './routes/schoolRoutes'
import userRoutes from './routes/userRoutes'
import studentRoutes from './routes/studentRoutes'
import { errorHandler, notFound } from './middleware/errorMiddleware'

const app: Application = express()
app.use(express.json())

// connect to DB
connectDB()

app.use("/role", roleRoutes)
app.use("/school", schoolRoutes)
app.use("/user", userRoutes)
app.use("/student", studentRoutes)

app.get("/", (req: Request,res: Response) => {
    res.send('Hello world')
})

app.use(notFound)
app.use(errorHandler)

app.listen(8000,() => console.log('Server listening at PORT 8000'))
