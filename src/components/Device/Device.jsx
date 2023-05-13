import PropTypes from 'prop-types';

function Device({ name = 'Неизвестно', handleClick }) {
  return (
    <div className="device" onClick={handleClick}>
      <div className="device__name">{name}</div>
      <div className="device__send">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 24 24"
        >
          <path
            d="M22.23 12c0 .73-.471 1.38-1.29 1.79L4.52 22c-.4.2-.79.3-1.15.3-.521 0-.98-.22-1.271-.609-.249-.341-.489-.931-.199-1.891l1.85-6.17c.06-.18.1-.399.12-.63H14c.55 0 1-.45 1-1s-.45-1-1-1H3.87a2.938 2.938 0 0 0-.12-.63L1.9 4.2c-.29-.96-.05-1.55.2-1.89.49-.66 1.42-.81 2.42-.31l16.421 8.21c.819.41 1.289 1.06 1.289 1.79z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}

Device.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default Device;
