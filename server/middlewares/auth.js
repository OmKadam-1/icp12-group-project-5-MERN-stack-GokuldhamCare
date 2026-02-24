import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token missing" });

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer")
    return res.status(401).json({ message: "Invalid format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

 const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied" });
    next();
  };
};

export { authenticateJWT, authorizeRole };

