const db = require("./database");

db.prepare(`
INSERT OR IGNORE INTO rooms
(room_number, room_type, price_per_night, description)
VALUES
('101','Single',1000,'Single room'),
('102','Double',1800,'Double room'),
('201','Suite',3500,'Premium suite')
`).run();

console.log("Seed complete");