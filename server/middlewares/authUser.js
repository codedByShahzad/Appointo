import jwt from "jsonwebtoken";

// Admin Authentication Middleware
export const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        // Store userId on req object, not req.body
        req.userId = decoded_token.id;

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};
