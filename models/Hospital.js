import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
     hospital: {
          type: String,
          required: true
     },
     city: {
          type: String,
          required: true
     },
     address: {
          type: String,
          required: true
     },
     time: {
          type: String,
          required: false
     },
     imageUrl: {
          type: String,
          required: false
     },
     phone: {
          type: String,
          required: false
     },
});

export default mongoose.model('Hospital', HospitalSchema);