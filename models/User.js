import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
     avatarUrl: String,
     bookedAppointments: Array,

},
{
     timestamps: true
}
);

export default mongoose.model('User', UserSchema);