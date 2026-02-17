const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ;
const JWT_SECRET = process.env.JWT_SECRET ;

// Login
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    // Generate JWT tokens
    const accessToken = jwt.sign(
      { role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    const refreshToken = jwt.sign(
      { role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send success with tokens
    res.json({
      success: true,
      data: {
        tokens: {
          accessToken,
          refreshToken
        }
      },
      message: "Authenticated"
    });
  } else {
    res.status(401).json({ success: false, message: "Wrong password" });
  }
});

// Refresh token
router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    
    // Generate new access token
    const accessToken = jwt.sign(
      { role: decoded.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    const newRefreshToken = jwt.sign(
      { role: decoded.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      data: {
        tokens: {
          accessToken,
          refreshToken: newRefreshToken
        }
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
});

module.exports = router;
