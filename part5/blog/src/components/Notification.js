import React from 'react';

const Notification = ({ error, message }) => {
  if (message === '') {
    return null;
  }

  const style = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  if (error) {
    const error = { ...style, color: 'red' };
    return (
      <div className="notification" style={error}>
        {message}
      </div>
    );
  } else {
    const ok = { ...style, color: 'green' };
    return (
      <div className="notification" style={ok}>
        {message}
      </div>
    );
  }
};

export default Notification;
