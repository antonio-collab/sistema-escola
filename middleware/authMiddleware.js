import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ message: "Token inválido" });
  // }
  try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Token decodificado:", decoded);
  req.user = decoded;
  next();
} catch (error) {
  console.error("Erro ao verificar token:", error.message);
  return res.status(401).json({ message: "Token inválido" });
}

};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
};
