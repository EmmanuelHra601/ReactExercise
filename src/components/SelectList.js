import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";

const SelectList = ({ title, url, handleChange }) => {
  const { data, error, loading } = useFetch(url);
  //console.log(data, error, loading);

  //Si data no tiene valor retornaremos null
  if (!data) return null;
  if (error) {
    return (
      <Message
        msg={`Error: ${error.status}: ${error.statusText}`} 
        bgColor="#dc3545"
      />
    );
  }

  let id = `select-${title}`;
  let label = title.charAt(0).toUpperCase() + title.slice(1);

  //data.response viene de la API, aqui indicamos que en options guarde lo que venga en data en la propiedad que se llama como el title
  let options = data.response[title];
  //console.log(options);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {/*Mientras loading sea verdadero se mostrara el Loader*/}
      {loading && <Loader />}
      <select name={id} id={id} onChange={handleChange}>
        <option value="">Elige un {title}</option>
        {/*data viene del hook es la que tiene los datos del API (condicional render) por cada elementos de options creamos una etiqueta option*/}
        {data && options.map((el) => <option value={el}>{el}</option>)}
      </select>
    </>
  );
};

export default SelectList;
