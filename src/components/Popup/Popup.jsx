import PropTypes from 'prop-types';
import './Popup.css';
import { useEffect, useState } from 'react';
function Popup({ setOpened }) {
  const [devices, setDevices] = useState([]);
  const socket = new WebSocket('wss://cub.watch:8020');

  const handleClose = () => {
    socket.close();
    setOpened(false);
  };

  socket.onmessage = (event) => {
    const result = JSON.parse(event.data);
    if (result.method === 'devices') {
      const devices = result.data.filter((d) => Object.hasOwn(d, 'device_id'));
      console.log(devices);
      setDevices(devices);
    }
  };

  const send = (method, data) => {
    data.method = method;
    if (socket && socket.readyState == 1) socket.send(JSON.stringify(data));
  };

  useEffect(() => {
    let interval;
    socket.onopen = () => {
      send('start', {});
      send('devices', {});
      interval = setInterval(() => {
        send('devices', {});
      }, 5000);
    };

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="devices"
      onClick={(e) => {
        if (e.target.className) {
          console.log(e.target.className);
          handleClose();
        }
      }}
    >
      <div className="devices__title">Поиск устройств</div>

      <div className="devices__scan">
        <div></div>
      </div>

      <div className="devices__list"></div>
    </div>
  );
}

Popup.propTypes = {
  setOpened: PropTypes.func.isRequired,
};

export default Popup;
