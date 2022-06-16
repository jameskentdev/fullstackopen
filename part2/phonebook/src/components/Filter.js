import React from 'react';

const Filter = ({newFilter, handleFilterChanged}) => {
    return (
        <div>
            filter shown with
            <input
                value={newFilter}
                onChange={handleFilterChanged}
            />
        </div>
    )
}

export default Filter;