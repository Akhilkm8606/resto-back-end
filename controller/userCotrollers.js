const bcrypt = require("bcrypt");
const saltround = 10;
const User = require("../model/usermodel");
const {  getTOken } = require("../utils/jwtToken");



exports.postRegister = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, saltround);
        const user = await User.create({
            fullname,
            email,
            password: hashedPass
        });

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User registration failed"
            });
        }

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            isAuthenticated: true,
            user: { fullname: user.fullname, email: user.email } // Use the user object here
        });
    } catch (error) { 
        res.status(500).json({
            success: false,
            message: error.message  
        });
    }
};

exports.userLogin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        // Log the fetched user and its hashed password
        console.log("User:", user);
        console.log("Hashed Password:", user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Is Password Valid?", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        

    res.user= user;
        getTOken(req,res);
        // return res.status(200).json({
        //     success: true,
        //     message: "Login successful",
        //     isAuthenticated: true,
        //     user: { fullname: user.fullname, email: user.email }
        // });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
};

exports.getAllUsers = async (req, res) => {
    console.log("======>",req.cookies.token);
    try {
        const users = await User.find();
        if (!users) {
            return res.status(500).json({
                success: false,
                message: "Users not found"
            });
        }
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateUserDetails = async (req, res) => {
    const userId = req.params.id;   //select bay id
    
    const { fullname, email } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        user.fullname = fullname;
        user.email = email;
        await user.save(); // Ensure to await for the save operation
        console.log(user);


        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
            user: user // Return updated user object if needed
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getUserDetails = async (req, res) => {
    const userId = req.params.id;
  console.log("id",userId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        console.log(User);
        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deletetUser = async (req, res) => {
    const {id} = req.params;
//   console.log("id",userId);
 try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        console.log(User);
        return res.status(200).json({
            success: true,
           massege : "user deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
