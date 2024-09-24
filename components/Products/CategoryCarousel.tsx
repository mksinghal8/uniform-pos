// ScrollableCardComponent.js

import React from 'react';

const HorizontalCardScroll = () => {
  const cards = [
    { id: 1, title: 'Card 1', content: 'Content for Card 1' },
    { id: 2, title: 'Card 2', content: 'Content for Card 2' },
    { id: 3, title: 'Card 3', content: 'Content for Card 3' },
    { id: 4, title: 'Card 4', content: 'Content for Card 4' },
    { id: 5, title: 'Card 5', content: 'Content for Card 5' },
    // Add more cards as needed
  ];

  return (
    <div className="overflow-x-auto scrollbar-hidden">
      <div className="flex space-x-4 p-4">
        {cards.map((card) => (
          <div key={card.id} className="flex-none w-64 h-40 bg-white shadow-md rounded-lg p-4">
            <h2 className="font-bold text-lg">{card.title}</h2>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCardScroll;
