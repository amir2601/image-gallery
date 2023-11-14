import React, { useEffect, useState } from 'react';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';

const Home = () => {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetch('/public/items.json')
            .then(res => res.json())
            .then(data => setItems(data))
    }, []);

    const onChange = (sourceId, sourceIndex, targetIndex) => {
        if (sourceId === 'items') {
            const nextstate = swap(items, sourceIndex, targetIndex);
            setItems(nextstate);
        }
        // Stop event propagation
        return false;
    };

    const handleSelectItem = (_id) => {
        const updatedSelection = selectedItems.includes(_id)
            ? selectedItems.filter((item) => item !== _id)
            : [...selectedItems, _id];
        setSelectedItems(updatedSelection);
    };

    const handleDeleteSelected = () => {
        const updatedItems = items.filter(item => !selectedItems.includes(item._id));
        setItems(updatedItems);
        setSelectedItems([]);
    };

    return (
        <div>
            <div className='flex justify-between my-10'>
                <h1>Hello Boys</h1>
                <div>
                    {selectedItems.length > 0 && (
                        <div>
                            <button className='btn btn-warning btn-sm' onClick={handleDeleteSelected}>Delete Selected</button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <GridContextProvider onChange={onChange}>
                    <GridDropZone
                        id='items'
                        boxesPerRow={5}
                        rowHeight={280}
                        style={{
                            height: 280 * Math.ceil(items.length),
                            margin: '0 8px'
                        }}
                    >
                        {items.map((item, index) => (
                            <GridItem key={index}>
                                <div onClick={() => handleSelectItem(item._id)} className={`relative select-none ${selectedItems.includes(item._id) ? 'selected' : ''}`}>
                                    <input className='absolute top-3 left-3'
                                        type="checkbox"
                                        checked={selectedItems.includes(item._id)}
                                        onChange={() => { }}
                                        onClick={(e) => e.stopPropagation()} // Prevent item click when checkbox is clicked
                                    />
                                    <div className="rounded-lg overflow-hidden hover:brightness-75 transition-all">
                                        <img
                                            src={item.image}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center hover:cursor-grabbing opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity rounded-lg">
                                        {/* Additional content for the overlay if needed */}
                                    </div>
                                </div>
                            </GridItem>
                        ))}
                    </GridDropZone>
                </GridContextProvider>
            </div>
        </div>
    );
};

export default Home;
