import PropTypes from 'prop-types';
import './Popup.scss';
import { useEffect, useState } from 'react';
import Device from '../Device/Device';
import checkLink from '../../utils/checkLink';

function Popup({ setOpened, url }) {
  const [devices, setDevices] = useState([]);
  const [socket, setSocket] = useState(null);

  const handleClose = () => {
    if (socket) socket.close();
    setOpened(false);
  };

  useEffect(() => {
    const newSocket = new WebSocket('wss://cub.red:8010');
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const result = JSON.parse(event.data);
      if (result.method === 'devices') {
        const devices = result.data.filter((d) =>
          Object.hasOwnProperty.call(d, 'device_id')
        );
        console.log(devices);
        setDevices(devices);
      }
    };

    newSocket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
        );
      } else {
        console.log('[close] Соединение прервано');
      }
    };

    return function cleanup() {
      if (newSocket) newSocket.close;
    };
  }, []);

  useEffect(() => {
    let interval;
    if (socket) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ method: 'start', data: {} }));
        socket.send(JSON.stringify({ method: 'devices', data: {} }));
        interval = setInterval(() => {
          if (socket.readyState === 1)
            socket.send(JSON.stringify({ method: 'devices', data: {} }));
        }, 5000);
      };
    }

    return function cleanup() {
      if (interval) clearInterval(interval);
    };
  }, [socket]);

  return (
    <div
      className="devices"
      onClick={(e) => {
        if (e.target.className !== 'device') {
          console.log(e.target.className);
          handleClose();
        }
      }}
    >
      <div className="devices__title">Поиск устройств</div>

      <div className="devices__scan">
        <div></div>
      </div>

      <div className="wrapper devices__list">
        {socket &&
          devices.map((device) => {
            const { device_id, name, uid } = device;
            return (
              <Device
                key={device_id}
                socket={socket}
                uid={uid}
                name={name}
                handleClick={() => {
                  const play = {
                    title: 'Candle',
                    url: checkLink(url),
                  };

                  socket.send(
                    JSON.stringify({
                      method: 'other',
                      params: {
                        submethod: 'play',
                        object: {
                          player: play,
                          playlist: [play],
                        },
                      },
                      uid: device.uid,
                    })
                  );
                  
                  handleClose();
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

Popup.propTypes = {
  setOpened: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Popup;
