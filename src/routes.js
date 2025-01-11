const express = require("express");
const {
  reserveTable,
  viewReservation,
  viewAllReservations,
  cancelReservation,
  modifyReservation,
} = require("./controllers/reservations");

const apiRoutes = express.Router();

apiRoutes.post("/reserve", reserveTable);
apiRoutes.get("/viewByEmail", viewReservation);
apiRoutes.get("/viewAllByTime", viewAllReservations);
apiRoutes.delete("/cancel", cancelReservation);
apiRoutes.put("/update", modifyReservation);

module.exports = apiRoutes;