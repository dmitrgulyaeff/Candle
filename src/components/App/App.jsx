import { useState } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Popup from '../Popup/Popup';

function App() {
  const [popupOpened, setPopupOpened] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    setPopupOpened(true);
    setUrl(e.target[0].value);
  };
  
  return (
    <>
      <Header />
      <Form handleSubmit={handleSubmit} />
      {popupOpened && <Popup setOpened={setPopupOpened} url={url} />}
    </>
  );
}

export default App;
