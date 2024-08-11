import React, { useState } from 'react';
import { Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialCategories = [
    { id: 'algos', name: 'Algorithms', img: '/path-to-algo-img.jpg', count: 120 },
    { id: 'ds', name: 'Data Structures', img: '/path-to-ds-img.jpg', count: 98 },
    { id: 'db', name: 'Databases', img: '/path-to-db-img.jpg', count: 75 },
    { id: 'net', name: 'Networking', img: '/path-to-net-img.jpg', count: 65 },
    { id: 'os', name: 'Operating Systems', img: '/path-to-os-img.jpg', count: 85 },
    { id: 'lang', name: 'Programming Languages', img: '/path-to-lang-img.jpg', count: 105 }
];

function CategoryCards() {
    const [categories, setCategories] = useState(initialCategories);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return; // dropped outside the list
        const items = Array.from(categories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCategories(items);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="categories">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <Draggable key={category.id} draggableId={category.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`transition-transform duration-200 ease-out ${snapshot.isDragging ? 'z-50' : ''}`}
                                        style={{
                                            ...provided.draggableProps.style,
                                            transform: snapshot.isDragging ? provided.draggableProps.style.transform : ''
                                        }}
                                    >
                                        <Card
                                            bordered={false}
                                            className="flex flex-row items-center hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
                                            style={{ height: '120px' }}
                                        >
                                            <img src={category.img} alt={category.name} className="w-40 h-full object-cover rounded-l-lg" />
                                            <div className="flex-grow flex flex-col justify-between p-4">
                                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                                <p>{category.count} topics</p>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default CategoryCards;
