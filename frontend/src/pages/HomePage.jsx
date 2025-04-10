import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      selecciona una opcion bro
    </div>
  )
}

const HomePageMunicipalidad = () => {
  const [comuna, setComuna] = useState('');
  const navigate = useNavigate();

  const handleContinuar = () => {
    if (comuna) {
      localStorage.setItem('comunaSeleccionada', comuna);
      navigate('/editor-zona');
    } else {
      alert('Por favor selecciona una comuna');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Selecciona tu comuna</h1>
      <select
        className="w-full border p-2 rounded mb-4"
        value={comuna}
        onChange={(e) => setComuna(e.target.value)}
      >
        <option value="">-- Elige una comuna --</option>
        <option value="Providencia">Providencia</option>
        <option value="Las Condes">Las Condes</option>
        <option value="Ñuñoa">Ñuñoa</option>
        <option value="Santiago">Santiago</option>
        <option value="La Florida">La Florida</option>
        <option value="Puente Alto">Puente Alto</option>
        <option value="Maipú">Maipú</option>
        <option value="Quilicura">Quilicura</option>
        <option value="Pudahuel">Pudahuel</option>
        <option value="Renca">Renca</option>
        <option value="Recoleta">Recoleta</option>
        <option value="Independencia">Independencia</option>
        <option value="Cerro Navia">Cerro Navia</option>
        <option value="Estación Central">Estación Central</option>
        <option value="La Granja">La Granja</option>
        <option value="La Cisterna">La Cisterna</option>
        <option value="San Miguel">San Miguel</option>
        <option value="San Joaquín">San Joaquín</option>
        <option value="San Ramón">San Ramón</option>
        <option value="La Pintana">La Pintana</option>
        <option value="El Bosque">El Bosque</option>
        <option value="Cerro Navia">Cerro Navia</option>
        <option value="Lo Espejo">Lo Espejo</option>
      </select>
      <button
        onClick={handleContinuar}
        className="w-full bg-cyan-600 text-white py-2 rounded"
      >
        Continuar
      </button>
    </div>
  );
};

export default HomePage
export { HomePageMunicipalidad };
