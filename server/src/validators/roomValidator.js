function validateRoom(body) {
    const errors = [];
  
    if (!body.room_number?.trim())
      errors.push("Room number is required");
  
    if (!body.room_type?.trim())
      errors.push("Room type is required");
  
    if (!body.price_per_night)
      errors.push("Price is required");
  
    return errors;
  }
  
  module.exports = validateRoom;
  