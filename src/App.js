import React from 'react';
import ContactForm from './components/ContactForm';
import CrudApi from './components/CrudApi';
import CrudApp from "./components/CrudApp";
import Modals from './components/Modals';
import SelectAnidados from './components/SelectsAnidados';
import SongSearch from './components/SongSearch';

function App() {
  return (
    <>
      <h1>Ejercicios Con React</h1>
      <CrudApp/>
      <hr/>
      <CrudApi/>
      <hr/>
      <SongSearch/>
      <hr/>
      <SelectAnidados/>
      <hr/>
      <ContactForm/>
      <hr/>
      <Modals/>
    </>
  );
}

export default App;
