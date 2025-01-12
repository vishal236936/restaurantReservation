const Joi = require("joi");

let reservations = [];
const tables = Array.from({ length: 10 }, (_, i) => i + 1); // Initializing 10 tables

const resetReservations = () => {
    reservations = [];
  };

const reservationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  guests: Joi.number().integer().min(1).max(10).required(),
  time: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(), // Validates HH:mm format
});

const validateInput = (input) => {
  const { error } = reservationSchema.validate(input);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const makeReservation = async (name, email, guests, time) => {
  try {
    validateInput({ name, email, guests, time });
    // console.info("Received reservation request:", { name, email, guests, time });

    if (reservations.find(r => r.email === email && r.time === time && r.status === "booked")) {
      console.log("Reservation already exists for:", email, time);
      return { success: false, message: "Reservation already exists." };
    }

    const availableTable = tables.find(
      table => !reservations.some(r => r.table === table && r.time === time && r.status === "booked")
    );

    if (!availableTable) {
    //   console.info("No tables available for time:", time);
      return { success: false, message: "No tables available." };
    }

    const newReservation = { name, email, guests, time, table: availableTable, status: "booked" };
    reservations.push(newReservation);
    // console.info("Reservation successful:", newReservation);
    return { success: true, reservation: newReservation };
  } catch (error) {
    console.error("Error while making reservation:", error);
    return { success: false, message: error.message || "An error occurred while making the reservation." };
  }
};

const getReservationByEmail = async (email) => {
  try {
    if (Joi.string().email().validate(email).error) {
      throw new Error("Invalid email format.");
    }

    const reservation = reservations.find(r => r.email === email && r.status === "booked");
    if (!reservation) {
      return { success: false, message: "No reservation found." };
    }
    return { success: true, reservation };
  } catch (error) {
    console.error("Error while getting reservation:", error);
    return { success: false, message: error.message || "An error occurred while retrieving the reservation." };
  }
};

const getAllReservationsByTime = async (time) => {
  try {
    if (Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).validate(time).error) {
      throw new Error("Invalid time format. Use HH:mm.");
    }

    const result = reservations.filter(r => r.time === time && r.status === "booked");
    return { success: true, reservations: result };
  } catch (error) {
    console.error("Error while fetching reservations by time:", error);
    return { success: false, message: error.message || "An error occurred while fetching reservations." };
  }
};

const deleteReservation = async (email, time) => {
  try {
    if (Joi.string().email().validate(email).error) {
      throw new Error("Invalid email format.");
    }
    if (Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).validate(time).error) {
      throw new Error("Invalid time format. Use HH:mm.");
    }

    const index = reservations.findIndex(r => r.email === email && r.time === time && r.status === "booked");
    if (index === -1) {
      return { success: false, message: "No reservation found." };
    }
    reservations[index].status = "cancelled"; 
    return { success: true, message: "Reservation cancelled." };
  } catch (error) {
    console.error("Error while cancelling reservation:", error);
    return { success: false, message: error.message || "An error occurred while cancelling the reservation." };
  }
};

const updateReservationTime = async (email, currentTime, newTime) => {
  try {
    if (Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).validate(newTime).error) {
      throw new Error("Invalid new time format. Use HH:mm.");
    }

    const reservation = reservations.find(r => r.email === email && r.time === currentTime && r.status === "booked");
    if (!reservation) {
      return { success: false, message: "Reservation not found." };
    }

    const availableTable = tables.find(
      table => !reservations.some(r => r.table === table && r.time === newTime && r.status === "booked")
    );

    if (!availableTable) {
      return { success: false, message: "No tables available at the new time." };
    }

    reservation.time = newTime;
    reservation.table = availableTable;
    return { success: true, reservation };
  } catch (error) {
    console.error("Error while updating reservation time:", error);
    return { success: false, message: error.message || "An error occurred while updating the reservation." };
  }
};

module.exports = {
  makeReservation,
  getReservationByEmail,
  getAllReservationsByTime,
  deleteReservation,
  updateReservationTime,
  resetReservations
};
