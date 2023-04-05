import { useState, useEffect } from "react";

export const useFetch = (url) => {
  //Guarda la data de la API que se esta consultando
  const [data, setData] = useState(null);
  //Guarda el error en caso de que la peticion fetch traega un error
  const [error, setError] = useState(null);
  //Almecena el estado de si se ha cargado o no la peticion
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        //Si res.ok es falso significa que hubo un error
        if (!res.ok) {
          let err = new Error("Error en la peticion fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Ocurrio un error";
          throw err;
        }
        //Convertimos la respuesta a formato JSON
        const json = await res.json()

        //Si signal es falso es decir no hubo error
        if(!signal.aborted){
          setData(json);
          setError(null);
        }

      } catch (error) {
        if(!signal.aborted){
          setData(null);
          setError(error);
        }
      } finally{
        if(!signal.aborted){
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, error, loading };
};
