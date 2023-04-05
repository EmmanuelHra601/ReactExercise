import React, { useState } from "react";
import SelectList from "./SelectList";

const SelectAnidados = () => {
  //Estas variables guardaran el valor de cada select
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [suburb, setSuburb] = useState("");

  //const TOKEN = "a887f80c-d79e-4ba7-b734-dfa1ef2c9d68";
  const TOKEN = "d81a7ac7-976d-4e1e-b7d3-b1979d791b6c";
  return (
    <div>
      <h2>Select Anidados</h2>
      <h3>México</h3>

      {/*Recibe como props title, url que sera el endpoint de donde recibe la informacion, y un evento que actualiza el estado de una variable dependiendo de lo seleccionado en el select*/}
      <SelectList
        title="estado"
        url={`https://api.copomex.com/query/get_estados?token=${TOKEN}`}
        handleChange={(e) => {
          setState(e.target.value);
        }}
      />
      {/*Condicional render: hasta que state tenga valor carga town*/}
      {state && (
        <SelectList
          title="municipios"
          url={`https://api.copomex.com/query/get_municipio_por_estado/${state}?token=${TOKEN}`}
          handleChange={(e) => {
            setTown(e.target.value);
          }}
        />
      )}
      {/*Condicional render: hasta que town tenga valor carga town*/}
      {town && (
        <SelectList
          title="colonia"
          url={`https://api.copomex.com/query/get_colonia_por_municipio/${town}?token=${TOKEN}`}
          handleChange={(e) => {
            setSuburb(e.target.value);
          }}
        />
      )}
      <pre>
        <code>
          {state} - {town} - {suburb}
        </code>
      </pre>
    </div>
  );
};

export default SelectAnidados;
