const Restaurant = require("../model/resturantsModel");

exports.getResturant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().exec();
console.log(restaurants);

        console.log("------->",restaurants);
        if (!restaurants) {
            res.status(500).json({
                success: false,
                message: "Restaurant not found",
               })
            
        }
        res.status(201).json({
            success: true,
            restaurants
           })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
           })
    }
};
exports.addResturant = async (req, res) => {
    const { name, address, neighborhood } = req.body;
    const photograph = req.file.path; // Get the uploaded file path
console.log(photograph);
    try {
        const restaurant = await Restaurant.create({
            name,
            address,
            neighborhood,
            photograph,// Assuming the path to the uploaded file is stored in req.file.path
        });

        if (!restaurant) {
            return res.status(400).json({ success: false, message: "Restaurant registration failed" });
        }

        console.log("Restaurant added successfully:", restaurant);
        res.status(201).json({
            success: true,
            message: "Restaurant registration successfully completed!",
            restaurant: restaurant
        });
    } catch (error) {
        console.error('Error adding restaurant:', error);
        res.status(500).json({ success: false, message: "Failed to register restaurant" });
    }
};
