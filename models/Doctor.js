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
     occupation: {
          type: String,
          required: true
     },
     workExperience: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     hospitalId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
     }
},
{
     timestamps: true
}
);

export default mongoose.model('Doctor', DoctorSchema);