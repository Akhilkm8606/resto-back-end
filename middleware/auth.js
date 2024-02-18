const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized request",
            isAuthenticated: false,
        });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Error decoding token:", err);
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                isAuthenticated: false,
            });
        }
        
        console.log("Decoded token:", decoded);
        req.userId = decoded.id;
        next();
    });
};
