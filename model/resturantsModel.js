const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your restaurant's name"],
    },
    address: {
        type: String,
        required: [true, "Enter your restaurant's address"],
    },
    neighborhood: {
        type: String,
        required: [true, "Enter your restaurant's neighborhood"],
    },
    photograph: { 
        type: String,
    },
});

const Restaurant = mongoose.model("Restaurant", restaurantsSchema);

module.exports = Restaurant;
