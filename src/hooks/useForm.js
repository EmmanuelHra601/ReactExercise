import  { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  //Funcion para el cambio de valores
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Aqui se lanzaran las validaciones cuando los elementos del formulario perdadn el foco de la pagina
  const handleBlur = (e) => {
    handleChange(e);
    //Ejecutamos la funcion validateForm que viene de contactForm valida cada una de los input del formulario
    setErrrors(validateForm(form));
  };

  //Funcion para controlar el input submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Evaluamos nuevamente que no existan errores
    setErrrors(validateForm(form));

    //validamos que el objeto errores venga vacio es
    if (Object.keys(errors).length === 0) {
      //Mostramos el loader
      setLoading(true);
      helpHttp()
        .post("https://formsubmit.co/ajax/skkipernautha@gmail.com", {
          body: form,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          //Una vez recibida la respuesta ocultamos el setLoading
          setLoading(false);
          //recibimos la informacion y esta variable es la encargada de mostrar el mensaje
          setResponse(true);
          //Reseteamos los input
          setForm(initialForm);
          //Depues de 5s desaparecemos el mensaje de exito
          setTimeout(() => {
            setResponse(false);
          }, 5000);
        });
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
