import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
     doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Doctor',
          required: true,
          unique: true
     },
     price: {
          type: Number,
          required: true
     },
     days: {
          type: [Number],
          required: true
     },
     times: {
          type: [String],
          required: true
     }
});

export default mongoose.model('Appointment', AppointmentSchema);