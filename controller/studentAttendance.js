const { addMinutes, isAfter } = require('date-fns');
const AdminAttendance = require('../models/AdminAttendance');
const StudentAttendance = require('../models/StudentAttendance');
const error = require('../utils/error');

const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw error('Invalid Attendance Id', 400);
    }

    if (adminAttendance.status === 'COMPLECTED') {
      throw error('Attendacne already complected');
    }
    let attendance = await StudentAttendance.findOne({
      adminAttendance: id,
      user: req.user._id,
    });
    if (attendance) {
      throw error('Atready Register', 400);
    }
    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });
    await attendance.save();
    return res.status(201).json({ message: 'Attendance success', attendance });
  } catch (e) {
    next(e);
  }
};
const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: 'RUNNING' });
    if (!running) {
      throw error('Not running', 400);
    }
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = 'COMPLECTED';
      await running.save();
    }
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
