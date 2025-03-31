import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const CreateJwt = (user) => {
  const payload = {
    id: user._id,
    nombre_completo: user.nombre_completo,
    email: user.email,
    rol: user.rol,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
export default CreateJwt;