import React from 'react';
import Card from 'components/Card';
import CardTitle from 'components/CardTitle';
import CardContent from 'components/CardContent';
import IconButton from 'components/IconButton';
import Typography from 'components/Typography';
import Hover from 'components/Hover';
import Delete from 'components/icons/Delete';
import theme from 'misc/providers/ThemeProvider/themes/default';

function ArtworksItem({ artwork, isHovered, onHover, onLeave, onOpen, onDelete }) {
  return (
    <Hover onMouseEnter={onHover} onMouseLeave={onLeave} onClick={onOpen}>
      <Card
        sx={{
          minHeight: 80,
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: isHovered
            ? theme.card.color.background.success
            : theme.card.color.background.paper,
        }}
      >
        <CardTitle>
          <Typography variant='title'>{artwork.title}</Typography>

          {isHovered && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Delete size={20} color='error' />
            </IconButton>
          )}
        </CardTitle>

        <CardContent>
          <Typography variant='subTitle' color='default'>
            {artwork.artistName}
          </Typography>

          {artwork.yearCreated && (
            <Typography variant='caption' color='default'>
              {artwork.yearCreated}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Hover>
  );
}

export default ArtworksItem;
