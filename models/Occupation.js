import mongoose from 'mongoose';

const OccupationSchema = new mongoose.Schema({
     occupation: {
          type: String,
          required: true
     },
});

export default mongoose.model('Occupation', OccupationSchema);