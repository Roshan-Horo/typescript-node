import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'School'
    }
},{timestamps: true})

const Student = mongoose.model('Student',studentSchema)

export default Student