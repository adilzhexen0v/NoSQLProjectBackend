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
     appointmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment',
          required: true
     },
     timeId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
     },
}
);

export default mongoose.model('BookedAppointment', BookedAppointmentSchema);