const { Schema, model } = require('mongoose');

const studentAttendance = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adminAttendance: {
      type: Schema.Types.ObjectId,
      ref: 'AdminAttencance',
      required: true,
    },
  },
  { timestamps: true }
);

const StudentAttendance = model('StudentAttendance', studentAttendance);
module.exports = StudentAttendance;
