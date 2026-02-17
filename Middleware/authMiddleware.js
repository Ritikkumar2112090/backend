export const adminAuth = (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password required" });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized — wrong password" });
    }

    next(); // allow to proceed! 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
