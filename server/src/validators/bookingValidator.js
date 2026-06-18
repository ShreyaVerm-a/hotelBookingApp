const validator = require("validator");

function validateBooking(body) {
  const errors = [];

  if (!body.guest_name?.trim())
    errors.push("Guest name is required");

  if (!validator.isEmail(body.guest_email || ""))
    errors.push("Valid email required");

  if (!body.booking_date)
    errors.push("Booking date required");

  return errors;
}

module.exports = validateBooking;