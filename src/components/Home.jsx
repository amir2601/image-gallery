import React, { useEffect, useState } from 'react';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';

const Home = () => {
    const [items, setItems] = useState([]);

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

    return (
        <div>
            <h1>Hello Boys</h1>
            <div className='grid'>
                <GridContextProvider onChange={onChange}>
                    <GridDropZone
                        id='items'
                        boxesPerRow={5}
                        rowHeight={280}
                        style={{ height: 280 * Math.ceil(items.length) }}
                    >
                        {items.map((item, index) => (
                            <GridItem key={index}>
                                <div className="relative select-none">
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
