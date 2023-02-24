import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     surname: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     hashedPassword: {
          type: String,
          required: true,
     },
     occupation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Occupation',
          required: true
     },
     experience: {
          type: String,
          required: true
     },
     hospitalId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hospital',
          required: true
     },
     cv: {
          type: String,
          required: false
     },
     imageUrl: {
          type: String,
          required: false
     },
     access: {
          type: Boolean,
          required: false
     },
     appointmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment'
     }
},
{
     timestamps: true
}
);

export default mongoose.model('Doctor', DoctorSchema);