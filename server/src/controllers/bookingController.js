const db = require("../db/database");
const validateBooking = require("../validators/bookingValidator");

exports.createBooking = (req, res) => {
  const errors = validateBooking(req.body);

  if (errors.length)
    return res.status(400).json({ errors });

  const room = db.prepare(`
      SELECT *
      FROM rooms
      WHERE id=?
  `).get(req.body.room_id);

  if (!room)
    return res.status(404).json({
      error: "Room not found"
    });

  const existing = db.prepare(`
      SELECT *
      FROM bookings
      WHERE room_id=?
      AND booking_date=?
  `).get(
    req.body.room_id,
    req.body.booking_date
  );

  if (existing) {
    return res.status(409).json({
      error: `Room ${room.room_number} is already booked on ${req.body.booking_date}`
    });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO bookings
      (
        room_id,
        guest_name,
        guest_email,
        booking_date
      )
      VALUES (?,?,?,?)
    `);

    const result = stmt.run(
      req.body.room_id,
      req.body.guest_name,
      req.body.guest_email,
      req.body.booking_date
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      message: "Booking created"
    });

  } catch {
    res.status(409).json({
      error: "Booking conflict"
    });
  }
};

exports.getBookings = (req, res) => {
    const search = req.query.search || "";
  
    const rows = db.prepare(`
      SELECT
        b.*,
        r.room_number
      FROM bookings b
      JOIN rooms r
      ON r.id=b.room_id
      WHERE
        b.guest_name LIKE ?
        OR r.room_number LIKE ?
      ORDER BY b.created_at DESC
    `).all(
      `%${search}%`,
      `%${search}%`
    );
  
    res.json(rows);
  };