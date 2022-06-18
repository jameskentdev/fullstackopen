import React from 'react';

const Notification = ({notification}) => {
    const { message, error } = notification;

    const notificationStyle = {
        color: error ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === '') {
        return null
    }

    return (
        <div style={notificationStyle}>
            {notification
                && message}
        </div>
    )
}

export default Notification;