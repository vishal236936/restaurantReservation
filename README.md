# Reservation System API

A simple table reservation system that allows users to reserve, view, modify, and cancel reservations. The API handles table booking, checking availability, and managing reservation details.

## Features

- **Make a reservation**: Users can reserve a table with their details, including name, email, number of guests, and reservation time.
- **View reservation by email**: Users can check their reservation details by providing their email.
- **View all reservations by time**: Retrieve all reservations for a specific time slot.
- **Cancel a reservation**: Users can cancel their reservation by email and time.
- **Update reservation time**: Users can change their reservation time if tables are available at the new time.
- **Handle full booking**: The system checks availability and prevents multiple reservations for the same table at the same time.

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** (package manager)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/vishal236936/restaurantReservation.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd restaurantReservation
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the worker**:
   ```bash
   npm start
   ```

7. **Running Tests**:
    1. **Test Framework:**
        - This project uses Jest for testing.
    2. **Run Tests**
       ```bash
       npm start
       ```
       
     **Test cases include:**
        1. Successful table reservation.
        2. Retrieving reservations by email and reservation time.
        3. Retrieving all reservations by time.
        4. Canceling reservations.
        5. Updating reservation times.
---


## Project Structure
```
restaurantReservation/
├── src/
│   ├── controllers/
│   │   └── reservations.js 
│   ├── services/
│   │   └── reservationService.sjs
│   ├── routes.js
├── tests/
│   ├── test.js
├── .gitignore
├── index.js
├── package.json
├── README.md

```

---

## API Endpoints Descriptions

## API Endpoints

### **1. Reserve a Table**
**Method**: `POST`  
**Endpoint**: `/reservations/reserve`  
**Description**: Allows a user to reserve a table. The system ensures availability before confirming the reservation.

---

### **2. Retrieve Reservation by Email and Reservation Time**
**Method**: `GET`  
**Endpoint**: `/reservations/viewByEmail`  
**Description**: Fetch reservation details using the user's email address.

---

### **3. Retrieve Reservations by Time**
**Method**: `GET`  
**Endpoint**: `/reservations/viewAllByTime`  
**Description**: Retrieve all reservations for a specific time slot.

---

### **4. Cancel a Reservation**
**Method**: `DELETE`  
**Endpoint**: `/reservations/cancel`  
**Description**: Cancel an existing reservation using the user's email and reservation time.

---

### **5. Update a Reservation**
**Method**: `PUT`  
**Endpoint**: `/reservations/update`  
**Description**: Update the reservation time to a new time slot if a table is available.

---
## Note: 
**No Database is connected. 
As per the requirement the data is stored in the current session/in memory.**
