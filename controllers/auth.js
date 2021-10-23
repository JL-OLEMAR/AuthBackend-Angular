const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

const crearUsuario = async (req, res = response) => {
  const { name, email, password } = req.body

  try {
    // Verificar el email
    const usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese email'
      })
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body)

    // Hashear el password 10 veces
    const salt = bcrypt.genSaltSync()
    dbUser.password = bcrypt.hashSync(password, salt)

    // Generar el JWT

    // Crear el usuario de DB
    await dbUser.save()

    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser._id,
      name
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Por favor, comuniquese con el administrador'
    })
  }
}

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body
  return res.json({
    ok: true,
    msg: 'Login de usuario /'
  })
}

const revalidarToken = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'Renew'
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}
