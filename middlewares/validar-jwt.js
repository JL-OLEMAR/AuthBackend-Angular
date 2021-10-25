const { response } = require('express')
const jwt = require('jsonwebtoken')

// Middleware para validar el JWT
const validarJWT = (req, res = response, next) => {
  // Obtener el token del header
  const token = req.header('x-token')

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Error en el token'
    })
  }

  try {
    // Verificar el token
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }

  // Todo OK!
  next()
}

module.exports = { validarJWT }
