const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando correctamente' });
});

// Ruta para recibir el formulario
app.post('/api/registro', (req, res) => {
  const { nombre, email, password, confirmarPassword, moduloFavorito } = req.body;

  // Validaciones en el servidor
  const errores = {};

  if (!nombre || nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errores.email = 'El email no es válido';
  }

  if (!password || password.length < 6) {
    errores.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (password !== confirmarPassword) {
    errores.confirmarPassword = 'Las contraseñas no coinciden';
  }

  const modulosValidos = ['DWCS', 'DWCC', 'Interfaces', 'Despregamento', 'Inglés'];
  if (!moduloFavorito || !modulosValidos.includes(moduloFavorito)) {
    errores.moduloFavorito = 'Debes seleccionar un módulo válido';
  }

  // Si hay errores, devolver 400
  if (Object.keys(errores).length > 0) {
    return res.status(400).json({
      success: false,
      errores,
      mensaje: 'Hay errores en el formulario'
    });
  }

  // Si todo está correcto
  console.log('Datos recibidos:', req.body);

  // Aquí podrías guardar en base de datos
  // await User.create({ nombre, email, password, moduloFavorito });

  res.status(201).json({
    success: true,
    mensaje: 'Usuario registrado correctamente',
    datos: {
      nombre,
      email,
      moduloFavorito
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    mensaje: 'Error en el servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
