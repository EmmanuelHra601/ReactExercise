import React, { useState } from "react";

//Esta variable controla el estado de cada input del formulario es necesario poner un atributo por cada campo del formulario
const initialForm = {
  artist: "",
  song: "",
};

const SongForm = ({ handleSearch }) => {
  const [form, setForm] = useState(initialForm);

  //Sirve para cambiar o establecer el valor que el usuario introdujo en los input del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //Evento para el botón submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validamos si el campo artista o cancion vienen vacioas
    if (!form.artist || !form.song) {
      alert("Datos incompletos");
      return;
    }
    //Ejecutamos la prop handleSeacrh que es una funcion que viene de SonSearch, recibe como parametro los datos que tenga el formulaio en la variable form
    handleSearch(form);

    //Se procesa el formulario y los valores se vuelven a restablecer en vacios
    setForm(initialForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/*En value asignamos el valor que estaran controlando de la variable de estado form*/}
        <input
          type="text"
          name="artist"
          placeholder="Nombre del Interprete"
          onChange={handleChange}
          value={form.artist}
        />
        <input
          type="text"
          name="song"
          placeholder="Nombre de la canción"
          onChange={handleChange}
          value={form.song}
        />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default SongForm;
