const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos.js')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

const router = Router()

// Crear un nuevo usuario
router.post('/new', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Agrega un email válido').isEmail(),
  check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 }),
  validarCampos
], crearUsuario)

// Login de usuario
router.post('/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
  validarCampos
], loginUsuario)

// Validar y revalidar token
router.get('/renew', revalidarToken)

module.exports = router
