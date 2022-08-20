const { Schema, model } = require('mongoose');

const adminAttendance = new Schema(
  {
    timeLimit: {
      type: Number,
      required: true,
      max: 30,
      min: 5,
      default: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ['RUNNING', 'COMPLECTED'],
      default: 'RUNNING',
    },
  },
  { timestamps: true }
);

const AdminAttendance = model('AdminAttencance', adminAttendance);
module.exports = AdminAttendance;
