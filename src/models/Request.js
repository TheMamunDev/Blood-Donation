import { Schema, model, models } from 'mongoose';

const RequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    required: true,
    type: String,
  },
  bloodGroupNeeded: { type: String, required: true },
  unitsNeeded: { type: Number, required: true, min: 1 },
  hospitalName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Open', 'Fulfilled', 'Closed'],
    default: 'Open',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Doners = models.Doners || model('Doners', RequestSchema);

export default Doners;
