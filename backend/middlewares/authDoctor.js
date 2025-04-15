import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const dToken = req.headers.dtoken || req.headers["dToken"];

    console.log("Received token:", dToken); // Debug log

    if (!dToken) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug log

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Token missing doctor ID",
      });
    }

    req.body.docId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // Detailed error logging

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
export default authDoctor;
