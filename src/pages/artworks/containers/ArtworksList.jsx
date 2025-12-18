import React, { useState } from 'react';
import ArtworksItem from './ArtworksItem';

function ArtworksList({ items, onOpenArtwork, onDeleteArtwork }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}
    >
      {items.map((artwork) => (
        <ArtworksItem
          key={artwork.id}
          artwork={artwork}
          isHovered={hoveredId === artwork.id}
          onHover={() => setHoveredId(artwork.id)}
          onLeave={() => setHoveredId(null)}
          onOpen={() => onOpenArtwork(artwork.id)}
          onDelete={() => onDeleteArtwork(artwork.id)}
        />
      ))}
    </div>
  );
}

export default ArtworksList;
