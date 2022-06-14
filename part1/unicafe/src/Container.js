import React from 'react';

const Container = ({header, items}) => {
    return (
        <div>
            <h2>{header}</h2>
            { items.map((item, index) => {
                
            })}
        </div>
    )
}

export default Container;