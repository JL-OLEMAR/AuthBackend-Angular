const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConnection = require('./db/config.js')

// Crear el servidor/aplicación de express
const app = express()

// Base de datos
dbConnection()

// Directorio público
app.use(express.static('public'))

// CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})
