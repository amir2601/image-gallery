import React from 'react';

const ItemCard = ({ item }) => {
    return (
        <div className="avatar">
            <div className="w-64 rounded-lg shadow-xl">
                <img src={item.image} />
            </div>
        </div>
    );
};

export default ItemCard;