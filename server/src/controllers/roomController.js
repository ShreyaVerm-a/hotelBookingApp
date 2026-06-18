const db = require("../db/database");
const validateRoom = require("../validators/roomValidator");

exports.createRoom = (req, res) => {
  const errors = validateRoom(req.body);

  if (errors.length)
    return res.status(400).json({ errors });

  try {
    const stmt = db.prepare(`
      INSERT INTO rooms
      (room_number, room_type, price_per_night, description)
      VALUES (?,?,?,?)
    `);

    const result = stmt.run(
      req.body.room_number,
      req.body.room_type,
      req.body.price_per_night,
      req.body.description
    );

    res.status(201).json({
      id: result.lastInsertRowid
    });
  } catch {
    res.status(409).json({
      error: "Room number already exists"
    });
  }
};

exports.getRooms = (req, res) => {
  const rooms = db.prepare(`
      SELECT * FROM rooms
  `).all();

  res.json(rooms);
};