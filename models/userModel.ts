export type User = {
    first_name: string,
    last_name: string,
    email: string,
    mobile: string,
    password: string,
    roleId: string
}



// import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

// const userSchema = mongoose.Schema({
//     first_name: {
//         type: String,
//         required: true
//     },
//     last_name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     mobile: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     roleId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'Role'
//     }
// },{
//     timestamps: true
// })

// userSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

// userSchema.pre('save', async function (next) {
//     if(!this.isModified('password')){
//         next()
//     }
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

// const User = mongoose.model('User', userSchema)

// export default User