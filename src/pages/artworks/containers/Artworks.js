import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import artworksActions from '../../../app/actions/artworks';
import Card from 'components/Card';
import CardTitle from 'components/CardTitle';
import CardContent from 'components/CardContent';
import IconButton from 'components/IconButton';
import Dialog from 'components/Dialog';
import Typography from 'components/Typography';
import Button from 'components/Button';
import Hover from 'components/Hover';
import Close from 'components/icons/Close';
import Delete from 'components/icons/Delete';
import Loading from 'components/Loading';
import { useNavigate } from 'react-router-dom';
import pageURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';


function Artworks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isFetching, errors } = useSelector(state => state.artworks);
  const { formatMessage } = useIntl();

  const [hoveredId, setHoveredId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, error: null });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(artworksActions.fetchArtworks({ page: 1, size: 10 }));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      dispatch(artworksActions.deleteArtwork(id));
      setDeleteDialog({ open: false, id: null, error: null });
      setSuccessMessage(formatMessage({ id: 'delete_success', defaultMessage: 'Entity deleted successfully!' }));
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setDeleteDialog(prev => ({
        ...prev,
        error: formatMessage({ id: 'delete_error', defaultMessage: 'Error while deleting. Try again.' })
      }));
    }
  };

  return (
    <>
      {(isFetching || (errors && errors.length > 0) || (!isFetching && items.length === 0)) ? (
        <Loading
          variant={isFetching ? 'loading' : errors?.length ? 'error' : 'noData'}
        >
          {isFetching && formatMessage({ id: 'loading_artworks', defaultMessage: 'Loading artworks...' })}
          {errors?.length > 0 && formatMessage({ id: 'artworks_error', defaultMessage: 'Error loading artworks' })}
          {!isFetching && items.length === 0 && formatMessage({ id: 'no_artworks', defaultMessage: 'No artworks found' })}
        </Loading>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {items.map(a => (
            <Hover
              key={a.id}
              onMouseEnter={() => setHoveredId(a.id)}
              onMouseLeave={() => setHoveredId(null)}
               onClick={() =>
    navigate(`${pageURLs[pages.artworks]}/${a.id}`)
  }
            >
             <Card
  sx={{ minHeight: 100, position: 'relative', cursor: 'pointer' }}
 
>

                <CardTitle>
                  <Typography variant="title">{a.title}</Typography>
                  {hoveredId === a.id && (
                   <IconButton
  onClick={(e) => {
    e.stopPropagation();
    setDeleteDialog({ open: true, id: a.id, error: null });
  }}
>

                      <Delete size={20} color="error" />
                    </IconButton>
                  )}
                </CardTitle>
                <CardContent>
                  <div>
                    <Typography variant="subTitle" color="default">{a.artistName}</Typography>
                    {a.yearCreated && <Typography variant="caption" color="default">{a.yearCreated}</Typography>}
                  </div>
                </CardContent>
              </Card>
            </Hover>
          ))}

          {deleteDialog.open && (
            <Dialog open onClose={() => setDeleteDialog({ open: false, id: null, error: null })}>
              <Card
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <IconButton onClick={() => setDeleteDialog({ open: false, id: null, error: null })}>
                    <Close size={20} />
                  </IconButton>
                </div>

                <Typography variant="subTitle">
                  {formatMessage({ id: 'delete_confirm', defaultMessage: 'Are you sure you want to delete this artwork?' })}
                </Typography>
                {deleteDialog.error && <Typography color="error">{deleteDialog.error}</Typography>}

                <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                  <Button colorVariant="primary" onClick={() => setDeleteDialog({ open: false, id: null, error: null })}>
                    {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
                  </Button>
                  <Button colorVariant="secondary" onClick={() => handleDelete(deleteDialog.id)}>
                    {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
                  </Button>
                </div>
              </Card>
            </Dialog>
          )}

          {successMessage && (
            <div
              style={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                background: 'green',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              {successMessage}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Artworks;
