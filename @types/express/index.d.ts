import { resUser } from '../../models/userModel'

declare global{
    namespace Express {
        interface Request {
            currentUser: resUser
        }
    }
}