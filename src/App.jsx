import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Popup from './components/Popup/Popup';

function App() {
  const [popupOpened, setPopupOpened] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = (inputUrl) => {
    setPopupOpened(true);
    setUrl(inputUrl);
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
