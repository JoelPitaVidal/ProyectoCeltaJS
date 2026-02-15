import { useState } from 'react'; 

function Parte2() {

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
    moduloFavorito: "",
  });
  const [errores, setErrores] = useState({});

  const [enviado, setEnviado] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = () => {

    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
    } 


    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es requerida';
    } else if (password < 6) {
      nuevosErrores.password = 'La contraseñad debe contener un mínimo de 6 caracteres';
    }
    if (!formData.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Debes confirmar la contraseña';
    } else if (formData.password != formData.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      nuevosErrores.email = 'El correo es requerido';
    } else if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'formato de correo electrónico invalido';
    }

    if (!formData.moduloFavorito) {
      nuevosErrores.moduloFavorito = 'Debe seleccionar un modulo favorito';
    }

    return nuevosErrores;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {

        setEnviado(true); 

        setTimeout(() => {
          setFormData({
            nombre: "",
            email: "",
            password: "",
            confirmarPassword: "",
            moduloFavorito: "",
          });

          setEnviado(false);
        }, 2000);

      } else {
        alert('Error al enviar el formulario');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };




  const handleReset = () => {

    setFormData({
      nombre: "",
      email: "",
      password: "",
      confirmarPassword: "",
      moduloFavorito: "",
    });

    setErrores({});
    setEnviado(false);
  };



  return (
    <div className="parte2">

      <header>
        <nav>
          <a>Formulario Registro</a>
        </nav>
      </header>

      <main>

        {enviado && (
          <div className="mensaje-exito">
            Registro realizado correctamente
          </div>
        )}

        
        <form onSubmit={handleSubmit}>

          
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa su nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </div>

          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errores.email && <span className="error">{errores.email}</span>}
          </div>

          
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.direccion}
              onChange={handleChange}
            />
            {errores.password && <span className="error">{errores.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarPassword">Confirmar contraseña:</label>
            <input
              type="text"
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.direccion}
              onChange={handleChange}
            />
            {errores.confirmarPassword && <span className="error">{errores.confirmarPassword}</span>}
          </div>

          
          <div className="form-group">
            <label htmlFor="moduloFavorito">Modulo preferido:</label>
            <select
              id="moduloFavorito"
              name="moduloFavorito"
              value={formData.moduloFavorito}
              onChange={handleChange}
            >
              <option value="">-- Selecciona una clase --</option>
              <option value="DWCS">DWCS</option>
              <option value="DWCC">DWCC</option>
              <option value="Interfaces">Interfaces</option>
              <option value="Despregamento">Despregamento</option>
              <option value="Inglés">Inglés</option>
            </select>
            {errores.moduloFavorito && <span className="error">{errores.moduloFavorito}</span>}
          </div>

          <div className="botones-container">
            <button type="submit">Enviar Formulario</button>
            <button type="button" onClick={handleReset}>
              Limpiar formulario
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default Parte2;
