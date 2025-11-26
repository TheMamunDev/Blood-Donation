import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: { type: String, default: null },
  email: {
    required: true,
    type: String,
    unique: true,
  },

  photo: {
    type: String,
  },
  authType: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
