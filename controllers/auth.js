const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

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
    const token = await generarJWT(dbUser.id, name)

    // Crear el usuario de DB
    await dbUser.save()

    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser._id,
      name,
      token
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Por favor, comuniquese con el administrador'
    })
  }
}

// Login
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body
  try {
    // Verificar el email
    const dbUser = await Usuario.findOne({ email })
    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    // Verificar el password
    const validPassword = bcrypt.compareSync(password, dbUser.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'El password es incorrecto'
      })
    }

    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name)

    // Generar respuesta exitosa
    return res.status(200).json({
      ok: true,
      uid: dbUser._id,
      name: dbUser.name,
      token
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      ok: false,
      msg: 'Por favor, comuniquese con el administrador'
    })
  }
}

// Revalidar token
const revalidarToken = async (req, res = response) => {
  // Obtener uid y name mediante el token
  const { uid, name } = req

  // Generar el nuevo JWT
  const token = await generarJWT(uid, name)

  // Generar respuesta exitosa
  return res.json({
    ok: true,
    uid,
    name,
    token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}
