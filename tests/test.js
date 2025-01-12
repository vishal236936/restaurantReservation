const request = require("supertest");
const app = require("../index");

const { resetReservations } = require("../src/services/reservationServices");

describe("Reservation System Tests", () => {
  beforeEach(() => {
    // Reset reservations before each test
    resetReservations();
  });

  // Test case 1 Allow users to reserve a table and return reservation details
  it("should allow users to reserve a table and return reservation details", async () => {
    const res = await request(app)
      .post("/reservations/reserve")
      .send({ name: "Valid Reservation", email: "valid@test.com", guests: 4, time: "18:00" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.reservation).toHaveProperty("table");
    expect(res.body.reservation.name).toBe("Valid Reservation");
    expect(res.body.reservation.time).toBe("18:00");
  });


  // Test case 2: View reservation by email
  it("should retrieve reservation details by email", async () => {
    await request(app)
      .post("/reservations/reserve")
      .send({ name: "View Reservation", email: "view@test.com", guests: 4, time: "18:00" });

    const res = await request(app)
      .get("/reservations/viewByEmail")
      .query({ email: "view@test.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.reservation).toHaveProperty("table");
    expect(res.body.reservation.name).toBe("View Reservation");
  });


//   Test case 3: View all reservations at particular time
  it("should retrieve all reservations for a particular time", async () => {
    // Reserve multiple tables at different times
    await request(app)
      .post("/reservations/reserve")
      .send({ name: "Reservation 1", email: "email1@test.com", guests: 4, time: "18:00" });
  
    await request(app)
      .post("/reservations/reserve")
      .send({ name: "Reservation 2", email: "email2@test.com", guests: 2, time: "18:00" });
  
    await request(app)
      .post("/reservations/reserve")
      .send({ name: "Reservation 3", email: "email3@test.com", guests: 3, time: "19:00" });
  
    // Test case to view all reservations by time ("18:00")
    const res = await request(app)
      .get("/reservations/viewAllByTime")
      .query({ time: "18:00" });
  
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.reservations).toHaveLength(2);
    expect(res.body.reservations[0].time).toBe("18:00");
    expect(res.body.reservations[1].time).toBe("18:00");
  });


    // Test case 4: Cancel Reservation
    it("should allow a user to cancel their reservation", async () => {
        await request(app)
          .post("/reservations/reserve")
          .send({ name: "Test Cancel", email: "testcancel@test.com", guests: 4, time: "18:00" });
    
        const res = await request(app)
          .delete("/reservations/cancel")
          .send({ email: "testcancel@test.com", time: "18:00" });
    
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Reservation cancelled.");
      });



  //   Test case 5: Modify Reservation Time
  it("should allow users to modify their reservation time if the table is available", async () => {
    await request(app)
      .post("/reservations/reserve")
      .send({ name: "John Doe", email: "john@example.com", guests: 4, time: "18:00" });

    const res = await request(app)
      .put("/reservations/update")
      .send({ email: "john@example.com", currentTime: "18:00", newTime: "19:00" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.reservation.time).toBe("19:00");
  });

});
