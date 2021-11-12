const express = require('express')
const cors = require('cors')
const path = require('path')
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

// Manejar demas rutas
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})
