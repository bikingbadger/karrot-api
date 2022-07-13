import mongoose from 'mongoose';

const ChoreSchema = {
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  icon: {
    type: String,
  },
  value: {
    type: Number,
    default: 1,
  },
};

export default mongoose.model('Chore', ChoreSchema);
