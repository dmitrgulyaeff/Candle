import { useState } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Popup from '../Popup/Popup';

function App() {
  const [popupOpened, setPopupOpened] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = (inputUrl) => {
    setPopupOpened(true);
    setUrl(inputUrl);
  };

  return (
    <>
      <div className='wrapper'>
        <Header />
        <Form handleSubmit={handleSubmit} />
      </div>
      {popupOpened && <Popup setOpened={setPopupOpened} url={url} />}
    </>
  );
}

export default App;
