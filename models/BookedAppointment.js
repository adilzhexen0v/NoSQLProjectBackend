import mongoose from 'mongoose';

const BookedAppointmentSchema = new mongoose.Schema({
     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Doctor',
          required: true
     },
     time: {
          type: Date,
          required: true
     },
     finished: {
          type: Boolean,
          required: true
     },
     result: {
          type: String,
          required: false
     }
}
);

export default mongoose.model('BookedAppointment', BookedAppointmentSchema);