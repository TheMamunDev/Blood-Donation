import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  location: {
    required: true,
    type: String,
  },
  bloodGroup: {
    required: true,
    type: String,
  },
  photo: {
    required: true,
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
