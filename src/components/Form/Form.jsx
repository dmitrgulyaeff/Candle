import { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

function Form({ handleSubmit }) {
  const [address, setAddress] = useState('');
  return (
    <form
      className="custom-url"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(address);
        setAddress('');
      }}
    >
      <input
        className="custom-url__input"
        type="url"
        placeholder="Введите адрес видео"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button
        type="button"
        className="custom-url__paste-button"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.readText().then(setAddress);
        }}
      >
        Вставить ссылку
      </button>
      <button type="submit" className="custom-url__submit-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 492.004 492.004"
        >
          <path
            d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
