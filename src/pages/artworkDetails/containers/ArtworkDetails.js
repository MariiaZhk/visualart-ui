import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import axios from 'misc/requests';
import Typography from 'components/Typography';
import Loading from 'components/Loading';
import Card from 'components/Card';
import CardContent from 'components/CardContent';

function ArtworkDetails() {
  const { id } = useParams();
  const { formatMessage } = useIntl();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/artworks/${id}`);
        setArtwork(response);
      } catch (err) {
        setError(formatMessage({ id: 'artwork_load_error', defaultMessage: 'Error loading artwork details' }));
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id, formatMessage]);

  if (loading) return <Loading>{formatMessage({ id: 'loading_artwork', defaultMessage: 'Loading artwork...' })}</Loading>;
  if (error) return <Loading variant="error">{error}</Loading>;
  if (!artwork) return <Loading variant="noData">{formatMessage({ id: 'no_artwork', defaultMessage: 'Artwork not found' })}</Loading>;

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <CardContent>
        <Typography variant="title">{artwork.title}</Typography>
        <Typography variant="subTitle" color="default">{artwork.artist?.name}</Typography>
        {artwork.yearCreated && <Typography variant="caption" color="default">{artwork.yearCreated}</Typography>}
        {artwork.genres?.length > 0 && (
          <Typography variant="body" color="default">Genres: {artwork.genres.join(', ')}</Typography>
        )}
        {artwork.media?.length > 0 && (
          <Typography variant="body" color="default">Media: {artwork.media.join(', ')}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default ArtworkDetails;
