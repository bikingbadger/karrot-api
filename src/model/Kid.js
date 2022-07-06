import mongoose from 'mongoose';

const kidSchema = {
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  icon: {
    type: String,
  },
  chores: {
    type: Array,
  },
  parentId: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
};

export default mongoose.model('Kid', kidSchema);
