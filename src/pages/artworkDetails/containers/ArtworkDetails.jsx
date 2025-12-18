import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtworkById } from '../../../app/actions/artworks';
import Typography from 'components/Typography';
import Loading from 'components/Loading';
import Card from 'components/Card';
import CardContent from 'components/CardContent';
import { useIntl } from 'react-intl';

function ArtworkDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const { artwork, isFetching, errors } = useSelector((state) => state.artworks);

  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [id, dispatch]);

  return (
    <>
      {isFetching ? (
        <Loading variant='loading'>{formatMessage({ id: 'loading_artwork' })}</Loading>
      ) : errors && errors.length > 0 ? (
        <Loading variant='error'>{formatMessage({ id: 'artwork_error' })}</Loading>
      ) : !artwork ? (
        <Loading variant='noData'>{formatMessage({ id: 'no_artwork' })}</Loading>
      ) : (
        <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
          <CardContent>
            <Typography variant='title'>{artwork.title}</Typography>
            <Typography variant='subTitle' color='default'>
              {artwork.artist?.name}
            </Typography>
            {artwork.yearCreated && (
              <Typography variant='caption' color='default'>
                {artwork.yearCreated}
              </Typography>
            )}
            {artwork.genres?.length > 0 && (
              <Typography variant='body' color='default'>
                {artwork.genres.join(', ')}
              </Typography>
            )}
            {artwork.media?.length > 0 && (
              <Typography variant='body' color='default'>
                {artwork.media.join(', ')}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ArtworkDetails;
