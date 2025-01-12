const Joi = require('joi');
const {
  makeReservation,
  getReservationByEmail,
  getAllReservationsByTime,
  deleteReservation,
  updateReservationTime,
} = require('../services/reservationServices');

// Validation schemas
const reservationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  guests: Joi.number().integer().min(1).max(10).required(),
  time: Joi.string().regex(/^\d{2}:\d{2}$/).required(), // HH:mm format
});

const emailQuerySchema = Joi.object({
  email: Joi.string().email().required(),
});

const timeQuerySchema = Joi.object({
  time: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
});

const cancelSchema = Joi.object({
  email: Joi.string().email().required(),
  time: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
});

const modifySchema = Joi.object({
  email: Joi.string().email().required(),
  currentTime: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
  newTime: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
});


const reserveTable = async (req, res) => {
  const { error } = reservationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { name, email, guests, time } = req.body;
  const result = await makeReservation(name, email, guests, time);
  console.log("\ud83d\ude80 ~ reserveTable ~ result:", result);
  res.status(result.success ? 200 : 400).json(result);
};
// view reservation by email
const viewReservation = async (req, res) => {
  const { error } = emailQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { email } = req.query;
  const result = await getReservationByEmail(email);
  res.status(result.success ? 200 : 404).json(result);
};

// view all reservations for a specific time
const viewAllReservations = async (req, res) => {
  const { error } = timeQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { time } = req.query;
  const result = await getAllReservationsByTime(time);
  res.status(200).json(result);
};

// Cancel a reservation with email and time
const cancelReservation = async (req, res) => {
  const { error } = cancelSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { email, time } = req.body;
  const result = await deleteReservation(email, time);
  res.status(result.success ? 200 : 404).json(result);
};

// Modify a reservation time
const modifyReservation = async (req, res) => {
  const { error } = modifySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { email, currentTime, newTime } = req.body;
  const result = await updateReservationTime(email, currentTime, newTime);
  res.status(result.success ? 200 : 400).json(result);
};

// Export the functions as a module
module.exports = {
  reserveTable,
  viewReservation,
  viewAllReservations,
  cancelReservation,
  modifyReservation,
};
