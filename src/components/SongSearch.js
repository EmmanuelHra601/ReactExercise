import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);

  //Esto se ejecutara cuando el valor de search cambie
  useEffect(() => {
    //Mientras no cambie el valor de search retornara ( es decir se saldra del useEffect)
    if (search === null) return;

    //Esta variable se usa para volver el useEffect asincrono
    const fetchData = async () => {
      const { artist, song } = search;

      //Endpoints de donde se tomaran los datos
      let artistUrl = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
      let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

      //console.log(artistUrl, songUrl);

      //Renderizamos el Loader mientras las api nos dan los datos
      setLoading(true);

      //Promise all se cumple cuando todas las promesas que se le pasen se han cumplido, si una promesa se rechazada descarta las demas promesas hayan o no sido cumplidas
      const [artisRes, songRes] = await Promise.all([
        //Hacemos la solicitudes a las respectivas APIs
        helpHttp().get(artistUrl),
        helpHttp().get(songUrl),
      ]);
      //console.log(artisRes, songRes);

      //Establecemos los datos obtenidos de las peticiones en sus respectivas variables
      setBio(artisRes);
      setLyric(songRes);
      //Una vez obtenidos los datos quitamos el Loader
      setLoading(false);
    };

    fetchData();
  }, [search]);

  //Data: es la informacion que el formulario tiene
  const handleSearch = (data) => {
    //Actualizamos la variable de estado search con los datos que se reciben del formulario
    setSearch(data);
  };

  return (
    <div>
      <h2>Song Search</h2>
      <article className="grid-1-3">
        {/*Pasamos como prop la funcion handleSearch*/}
        <SongForm handleSearch={handleSearch} />

        {/*Solo si loading es true muesta el componente Loader*/}
        {loading && <Loader />}

        {/*Renderizado condicional mientras search no sea nulo y mientras loading sea falso renderizamos songDetails*/}
        {search && !loading && (
          <SongDetails search={search} lyric={lyric} bio={bio} />
        )}
      </article>
    </div>
  );
};

export default SongSearch;
