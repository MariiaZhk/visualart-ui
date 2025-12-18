import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Grid, Box } from '@mui/material';

import ArtworksFilter from './ArtworksFilter';
import Card from 'components/Card';
import CardTitle from 'components/CardTitle';
import CardContent from 'components/CardContent';
import Typography from 'components/Typography';
import IconButton from 'components/IconButton';
import Delete from 'components/icons/Delete';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import Snackbar from 'components/Snackbar';
import Pagination from 'components/Pagination';
import FloatingActionButton from 'app/components/FloatingActionButton';
import AddIcon from 'components/icons/Add';
import pageURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';
import theme from 'misc/providers/ThemeProvider/themes/default';
import artworksActions from '../../../app/actions/artworks';
import Loading from 'components/Loading';
import Hover from 'components/Hover';

function Artworks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { items, isFetching, errors, totalPages } = useSelector((state) => state.artworks);

  const [hoveredId, setHoveredId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, error: null });
  const [successMessage, setSuccessMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    artistId: searchParams.get('artistId') || null,
    title: searchParams.get('title') || '',
    sortBy: searchParams.get('sortBy') || 'title',
    sortDir: searchParams.get('sortDir') || 'asc',
    page: Number(searchParams.get('page')) || 1,
    size: Number(searchParams.get('size')) || 8,
  });

  useEffect(() => {
    const { artistId, title, sortBy, sortDir, page, size } = filters;
    dispatch(artworksActions.fetchArtworks({ artistId, title, sortBy, sortDir, page, size }));

    setSearchParams({
      artistId: artistId || '',
      title: title || '',
      sortBy,
      sortDir,
      page,
      size,
    });
  }, [dispatch, filters, setSearchParams]);

  const handleDelete = async (id) => {
    try {
      dispatch(artworksActions.deleteArtwork(id));
      setDeleteDialog({ open: false, id: null, error: null });
      setSuccessMessage(formatMessage({ id: 'delete_success' }));
    } catch {
      setDeleteDialog((prev) => ({ ...prev, error: formatMessage({ id: 'delete_error' }) }));
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <>
      <ArtworksFilter initialFilters={filters} onApply={handleApplyFilters} />

      {isFetching ? (
        <Loading variant='loading'>{formatMessage({ id: 'loading_artworks' })}</Loading>
      ) : errors.length > 0 ? (
        <Loading variant='error'>{formatMessage({ id: 'artworks_error' })}</Loading>
      ) : items.length === 0 ? (
        <Loading variant='noData'>{formatMessage({ id: 'no_artworks' })}</Loading>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Grid container spacing={2}>
            {items.map((a) => (
              <Grid item xs={12} sm={6} key={a.id}>
                <Hover
                  onMouseEnter={() => setHoveredId(a.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`${pageURLs[pages.artworks]}/${a.id}`)}
                >
                  <Card
                    sx={{
                      minHeight: 100,
                      backgroundColor:
                        hoveredId === a.id
                          ? theme.card.color.background.success
                          : theme.card.color.background.edit,
                    }}
                  >
                    <CardTitle>
                      <Typography variant='title'>{a.title}</Typography>
                      {hoveredId === a.id && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteDialog({ open: true, id: a.id, error: null });
                          }}
                        >
                          <Delete size={20} color='error' />
                        </IconButton>
                      )}
                    </CardTitle>

                    <CardContent>
                      <Typography variant='subTitle'>
                        <strong>{formatMessage({ id: 'artist' })}:</strong> {a.artistName}
                      </Typography>
                      {a.yearCreated && (
                        <Typography variant='subTitle'>
                          <strong>{formatMessage({ id: 'year' })}:</strong> {a.yearCreated}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Hover>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 'auto', p: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onChange={handlePageChange}
              disabled={isFetching}
            />
          </Box>
        </Box>
      )}

      {deleteDialog.open && (
        <Dialog open onClose={() => setDeleteDialog({ open: false, id: null, error: null })}>
          <Box sx={{ p: 2, minWidth: 300 }}>
            <Typography align='center'>{formatMessage({ id: 'delete_confirm' })}</Typography>
            {deleteDialog.error && (
              <Typography color='error' align='center' sx={{ mt: 1 }}>
                {deleteDialog.error}
              </Typography>
            )}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button onClick={() => setDeleteDialog({ open: false, id: null, error: null })}>
                {formatMessage({ id: 'cancel' })}
              </Button>
              <Button onClick={() => handleDelete(deleteDialog.id)}>
                {formatMessage({ id: 'delete' })}
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}

      {successMessage && (
        <Snackbar
          open
          message={successMessage}
          onClose={() => setSuccessMessage('')}
          severity='success'
          autoHideDuration={3000}
        />
      )}

      <FloatingActionButton
        icon={<AddIcon size={32} color={theme.button.color.primary.text} />}
        to={`${pageURLs[pages.artworks]}/new`}
        ariaLabel={formatMessage({ id: 'add_artwork' })}
      />
    </>
  );
}

export default Artworks;
