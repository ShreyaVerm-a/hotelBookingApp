# Hotel Booking System

A simple Hotel Booking System built using React and Node.js that allows hotel staff to add rooms, book rooms for guests, view room availability, and check booking history.

---

# Features

* Add new hotel rooms
* Prevent duplicate room numbers
* Book rooms for guests
* Prevent double booking of rooms on the same date
* Search booking history by guest name or room number

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* SQLite

## API Testing

* Postman

---

# Project Structure

```text

server/
│
├── controllers/
├── routes/
├── validators/
├── db/
├── database.sqlite
└── server.js
```

---

# Setup Instructions

## Prerequisites

Install:

* Node.js (v18 or later recommended)
* npm
* Postman

---

## Backend Setup

### 1. Navigate to server folder

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start backend server

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

# Testing Using Postman

## 1. Add Room

### Request

```http
POST /api/rooms
```

### Sample Body

```json
{
  "room_number": "101",
  "room_type": "Single",
  "price_per_night": 1000,
  "description": "Single occupancy room"
}
```

### Expected Response

```json
{
  "message": "Room added successfully"
}
```

### Duplicate Room Test

Attempt to add the same room again.

Expected:

```json
{
  "error": "Room number already exists"
}
```

---

## 2. Get Available Rooms

### Request

```http
GET /api/rooms?date=2026-07-01
```

### Expected Response

```json
[
  {
    "room_number": "101",
    "room_type": "Single",
    "price_per_night": 1000,
    "booked": true
  },
  {
    "room_number": "102",
    "room_type": "Double",
    "price_per_night": 1800,
    "booked": false
  }
]
```

---

## 3. Book Room

### Request

```http
POST /api/bookings
```

### Sample Body

```json
{
  "room_id": 1,
  "guest_name": "Shreya",
  "guest_email": "shreya@test.com",
  "booking_date": "2026-07-01"
}
```

### Expected Response

```json
{
  "message": "Booking successful"
}
```

### Conflict Test

Try booking the same room again on the same date.

Expected:

```json
{
  "error": "Room 101 is already booked on 2026-07-01"
}
```

---

## 4. Get Booking History

### Request

```http
GET /api/bookings
```

### Expected Response

```json
[
  {
    "guest_name": "Shreya",
    "guest_email": "shreya@test.com",
    "room_number": "101",
    "booking_date": "2026-07-01"
  }
]
```

---

## 5. Search Booking History

### Request

```http
GET /api/bookings?search=Shreya
```

or

```http
GET /api/bookings?search=101
```

### Expected Response

Filtered booking records matching the search query.

---

# Assumptions Made During Development

1. A room number must be unique across the hotel.

2. A room can only be booked once per date.

3. Multiple bookings for the same room are allowed on different dates.

4. Guest email validation is performed before saving a booking.

5. Room pricing is stored as a numeric value representing price per night.

6. Room availability is determined based on booking records for the selected date.

7. All dates are stored and compared using the YYYY-MM-DD format.

8. Authentication and authorization are not required for this assessment.

9. The API will be tested using Postman rather than a frontend interface.

---

# Design Decisions

* React Router was intentionally not used to keep the application lightweight.
* Global state management libraries such as Redux were not required.
* A single Axios instance is used for all API communication.
* Plain CSS was used instead of UI frameworks to reduce complexity.
* Browser alert messages were used instead of third-party notification libraries.

---
