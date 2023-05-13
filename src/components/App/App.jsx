import { useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Popup from '../Popup/Popup';

function App() {
  const [popupOpened, setPopupOpened] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupOpened(true);
  };
  return (
    <>
      <Header />
      <Form handleSubmit={handleSubmit} />
      {popupOpened && <Popup setOpened={setPopupOpened} />}
    </>
  );
}

export default App;
