import React from 'react'; // Importa el núcleo de React
import ReactDOM from 'react-dom/client'; // Importa el cliente de renderizado DOM de React 18
import App from './App.jsx'; // Importa el componente principal App

ReactDOM.createRoot(document.getElementById('root')).render( // Selecciona el nodo HTML #root y monta la aplicación React
  <React.StrictMode> {/* Activa verificaciones adicionales de buenas prácticas durante el desarrollo */}
    <App /> {/* Ejecuta el componente principal de LearnFlow en la interfaz */}
  </React.StrictMode> // Cierra el modo estricto de React
); // Finaliza el montaje en el DOM
