import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
     doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Doctor',
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     times: {
          type: Array,
          required: true,
     },
}
);

export default mongoose.model('Appointment', AppointmentSchema);