import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado del componente

function GestionAcademica() { // Declara el componente funcional GestionAcademica del proyecto LearnFlow
  const [cursos, setCursos] = useState([ // Define el estado inicial con la lista de cursos académicos registrados
    { id: 1, nombre: 'Arquitectura de Software ADSO', docente: 'Ing. Carlos Ramírez', trimestre: 'Trimestre IV', estado: 'En Curso' }, // Primer curso de ejemplo en el estado inicial
    { id: 2, nombre: 'Desarrollo Frontend con React', docente: 'Ing. Laura Gómez', trimestre: 'Trimestre V', estado: 'En Curso' }, // Segundo curso de ejemplo en el estado inicial
    { id: 3, nombre: 'Modelado de Bases de Datos SQL', docente: 'Ing. Andrés Pérez', trimestre: 'Trimestre III', estado: 'Completado' } // Tercer curso de ejemplo en el estado inicial
  ]); // Cierra la declaración del arreglo de estado cursos

  const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del nuevo curso ingresado en el formulario
  const [docente, setDocente] = useState(''); // Estado para almacenar el nombre del docente asignado al curso
  const [trimestre, setTrimestre] = useState('Trimestre V'); // Estado para almacenar el trimestre académico seleccionado
  const [filtro, setFiltro] = useState('Todos'); // Estado para filtrar la visualización de cursos (Todos, En Curso, Completado)
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar notificaciones de confirmación al usuario en la interfaz

  const agregarCurso = (evento) => { // Función que procesa el envío del formulario para registrar un nuevo curso
    evento.preventDefault(); // Evita que el navegador recargue la página al enviar el formulario HTML
    if (!nombre.trim() || !docente.trim()) return; // Valida que los campos de nombre y docente no estén vacíos antes de guardar
    const nuevoCurso = { // Crea un nuevo objeto con los datos del curso a registrar en LearnFlow
      id: Date.now(), // Genera un identificador único basado en la marca de tiempo actual
      nombre: nombre.trim(), // Asigna el nombre del curso eliminando espacios en blanco innecesarios
      docente: docente.trim(), // Asigna el nombre del docente eliminando espacios en blanco innecesarios
      trimestre: trimestre, // Asigna el trimestre académico seleccionado en el menú desplegable
      estado: 'En Curso' // Define por defecto el estado inicial del nuevo curso como 'En Curso'
    }; // Cierra la construcción del objeto nuevoCurso
    setCursos([...cursos, nuevoCurso]); // Actualiza el estado copiando los cursos existentes y agregando el nuevo curso
    setNombre(''); // Limpia el campo de texto del nombre del curso tras el registro exitoso
    setDocente(''); // Limpia el campo de texto del docente tras el registro exitoso
    setMensaje(`Curso "${nuevoCurso.nombre}" registrado exitosamente en LearnFlow.`); // Muestra mensaje de confirmación en pantalla
  }; // Cierra la función agregarCurso

  const cambiarEstado = (id) => { // Función que alterna el estado de un curso entre 'En Curso' y 'Completado'
    const actualizados = cursos.map((curso) => // Recorre la lista de cursos para localizar el que coincide con el id recibido
      curso.id === id // Verifica si el identificador del curso actual coincide con el seleccionado
        ? { ...curso, estado: curso.estado === 'En Curso' ? 'Completado' : 'En Curso' } // Invierte el estado del curso encontrado
        : curso // Mantiene sin cambios los demás cursos que no coinciden con el id
    ); // Finaliza el recorrido de transformación con map
    setCursos(actualizados); // Actualiza el estado principal con la nueva lista de cursos modificada
  }; // Cierra la función cambiarEstado

  const eliminarCurso = (id) => { // Función encargada de eliminar un curso académico según su identificador
    setCursos(cursos.filter((curso) => curso.id !== id)); // Filtra y conserva únicamente los cursos cuyo id sea distinto al eliminado
    setMensaje('Registro académico eliminado correctamente.'); // Actualiza el mensaje informativo tras eliminar el curso
  }; // Cierra la función eliminarCurso

  const cursosFiltrados = cursos.filter((curso) => // Crea una lista derivada aplicando el filtro de estado seleccionado
    filtro === 'Todos' ? true : curso.estado === filtro // Devuelve todos los cursos o solo los que coinciden con el estado elegido
  ); // Finaliza el filtrado de cursos a renderizar

  return ( // Inicia el retorno de la estructura visual JSX que se dibuja en la interfaz de usuario
    <div className="learnflow-contenedor"> {/* Contenedor principal del módulo académico de la plataforma LearnFlow */}
      <header className="learnflow-encabezado"> {/* Encabezado principal del componente con el título de la plataforma */}
        <div> {/* Agrupador de los textos principales del encabezado */}
          <span className="insignia-adso">Módulo</span> {/* Etiqueta superior que identifica el módulo de la aplicación */}
          <h1>LearnFlow</h1> {/* Título principal de la aplicación web en la interfaz */}
          <p>Módulo React de Control de Cursos, Docentes y Progreso Académico</p> {/* Subtítulo descriptivo de la funcionalidad */}
        </div> {/* Fin del agrupador de textos del encabezado */}
        <div className="resumen-indicadores"> {/* Contenedor de tarjetas de resumen estadístico (KPIs académicos) */}
          <div className="tarjeta-kpi"> {/* Tarjeta que muestra el número total de cursos registrados */}
            <strong>{cursos.length}</strong> {/* Imprime dinámicamente la cantidad total de elementos en el estado cursos */}
            <span>Total Cursos</span> {/* Etiqueta descriptiva del indicador total */}
          </div> {/* Fin de la tarjeta de total de cursos */}
          <div className="tarjeta-kpi activa"> {/* Tarjeta que contabiliza los cursos completados */}
            <strong>{cursos.filter((c) => c.estado === 'Completado').length}</strong> {/* Calcula cuántos cursos están en estado Completado */}
            <span>Completados</span> {/* Etiqueta descriptiva del indicador de cursos finalizados */}
          </div> {/* Fin de la tarjeta de cursos completados */}
        </div> {/* Fin del contenedor de indicadores de resumen */}
      </header> {/* Fin del encabezado del componente */}

      {mensaje && <div className="alerta-exito">{mensaje}</div>} {/* Renderizado condicional: muestra la alerta solo si existe un mensaje */}

      <main className="learnflow-rejilla"> {/* Contenedor principal dividido en dos columnas: formulario y listado */}
        <section className="panel-formulario"> {/* Sección izquierda destinada al registro de nuevos cursos académicos */}
          <h2>Registrar Nuevo Curso</h2> {/* Título de la sección del formulario */}
          <form onSubmit={agregarCurso}> {/* Formulario controlado que invoca la función agregarCurso al enviarse */}
            <label>Nombre de la Asignatura o Módulo</label> {/* Etiqueta descriptiva para el campo de nombre del curso */}
            <input type="text" placeholder="Ej: Programación Orientada a Objetos" value={nombre} onChange={(e) => setNombre(e.target.value)} required /> {/* Campo de texto vinculado al estado nombre */}
            <label>Docente / Instructor Asignado</label> {/* Etiqueta descriptiva para el campo del docente */}
            <input type="text" placeholder="Ej: Ing. María Fernanda López" value={docente} onChange={(e) => setDocente(e.target.value)} required /> {/* Campo de texto vinculado al estado docente */}
            <label>Trimestre Académico</label> {/* Etiqueta descriptiva para el selector de trimestre */}
            <select value={trimestre} onChange={(e) => setTrimestre(e.target.value)}> {/* Lista desplegable vinculada al estado trimestre */}
              <option value="Trimestre III">Trimestre III</option> {/* Opción seleccionable para el tercer trimestre */}
              <option value="Trimestre IV">Trimestre IV</option> {/* Opción seleccionable para el cuarto trimestre */}
              <option value="Trimestre V">Trimestre V</option> {/* Opción seleccionable para el quinto trimestre */}
              <option value="Trimestre VI">Trimestre VI</option> {/* Opción seleccionable para el sexto trimestre */}
            </select> {/* Fin de la lista desplegable de trimestres */}
            <button type="submit" className="btn-primario">+ Guardar en LearnFlow</button> {/* Botón que dispara el envío del formulario */}
          </form> {/* Fin del formulario de registro */}
        </section> {/* Fin de la sección del formulario */}

        <section className="panel-listado"> {/* Sección derecha que presenta el catálogo interactivo de cursos */}
          <div className="cabecera-listado"> {/* Barra superior del listado con título y botones de filtro */}
            <h2>Catálogo Académico ({cursosFiltrados.length})</h2> {/* Muestra el título del listado y la cantidad de cursos visibles */}
            <div className="grupo-filtros"> {/* Contenedor de botones para filtrar por estado */}
              {['Todos', 'En Curso', 'Completado'].map((opcion) => ( /* Recorre las opciones de filtro para generar sus botones */
                <button key={opcion} onClick={() => setFiltro(opcion)} className={filtro === opcion ? 'btn-filtro activo' : 'btn-filtro'}> {/* Botón que cambia el filtro activo al hacer clic */}
                  {opcion} {/* Muestra el nombre del filtro dentro del botón */}
                </button> /* Fin del botón de filtro individual */
              ))} {/* Fin del recorrido de botones de filtro */}
            </div> {/* Fin del contenedor de filtros */}
          </div> {/* Fin de la barra superior del listado */}

          <div className="lista-tarjetas"> {/* Contenedor donde se renderizan las tarjetas de cada curso académico */}
            {cursosFiltrados.map((curso) => ( /* Itera sobre los cursos filtrados para transformar cada objeto en un elemento JSX */
              <article key={curso.id} className="tarjeta-curso"> {/* Tarjeta individual identificada por la propiedad única key */}
                <div className="info-curso"> {/* Bloque con los datos textuales del curso */}
                  <span className="etiqueta-trimestre">{curso.trimestre}</span> {/* Muestra el trimestre al que pertenece el curso */}
                  <h3>{curso.nombre}</h3> {/* Muestra el nombre de la asignatura o módulo académico */}
                  <p>Docente: <strong>{curso.docente}</strong></p> {/* Muestra el nombre del instructor responsable */}
                </div> {/* Fin del bloque de información textual */}
                <div className="acciones-curso"> {/* Bloque derecho con el estado actual y los botones de acción */}
                  <span className={curso.estado === 'Completado' ? 'estado completado' : 'estado en-curso'}>{curso.estado}</span> {/* Insignia visual dinámica según el estado del curso */}
                  <button onClick={() => cambiarEstado(curso.id)} className="btn-estado">Cambiar Estado</button> {/* Botón que alterna el estado del curso al hacer clic */}
                  <button onClick={() => eliminarCurso(curso.id)} className="btn-eliminar">Eliminar</button> {/* Botón que elimina el curso del listado al hacer clic */}
                </div> {/* Fin del bloque de acciones del curso */}
              </article> /* Fin de la tarjeta del curso individual */
            ))} {/* Fin de la iteración map de cursos */}
          </div> {/* Fin del contenedor de tarjetas */}
        </section> {/* Fin de la sección del listado académico */}
      </main> {/* Fin del contenedor principal de dos columnas */}
    </div> // Fin del contenedor raíz del componente GestionAcademica
  ); // Finaliza la instrucción return del componente
} // Cierra la declaración de la función GestionAcademica

export default GestionAcademica; // Exporta el componente para poder utilizarlo en App.jsx y renderizarlo en la interfaz
