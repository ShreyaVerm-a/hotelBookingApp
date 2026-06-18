const Database = require("better-sqlite3");

const db = new Database("hotel.db");

db.exec(`
CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_number TEXT UNIQUE NOT NULL,
    room_type TEXT NOT NULL,
    price_per_night REAL NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(room_id) REFERENCES rooms(id),

    UNIQUE(room_id, booking_date)
);
`);

module.exports = db;