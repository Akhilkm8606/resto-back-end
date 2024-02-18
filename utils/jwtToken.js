const jwt = require("jsonwebtoken");

exports.getTOken = (req, res) => {
    const options = {
        id: res.user._id,
        time: Date.now()
    }
    const token = jwt.sign(options, process.env.JWT_SECRET_KEY, { expiresIn: '5min' });


    // // Set the token as a cookie in the response
    // res.cookie("token", token, { httpOnly: true });
    if (!token) {

        res.status(500).json({
        success: false,
        
        message: "token generation field",
        isAuthenticated: false,
    });
    }
    
    return res.status(200).cookie("token",token).json({
        success: true,
        user: req.user,
        token,
        message: "Login successful",
        isAuthenticated: true,
        user: { fullname: res.user.fullname, email: res.user.email } // Access user from res object
    });
}
