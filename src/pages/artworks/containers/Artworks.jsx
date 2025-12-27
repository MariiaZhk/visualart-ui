import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

import ArtworksFilter from './components/ArtworksFilter';
import { fetchArtworks, deleteArtwork } from 'app/actions/artworksList';

import Pagination from 'components/Pagination';
import Loading from 'components/Loading';
import Hover from 'components/Hover';
import Card from 'components/Card';
import CardTitle from 'components/CardTitle';
import CardContent from 'components/CardContent';
import Typography from 'components/Typography';
import IconButton from 'components/IconButton';
import Delete from 'components/icons/Delete';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import Snackbar from 'components/Snackbar';
import FloatingActionButton from 'app/components/FloatingActionButton';
import AddIcon from 'components/icons/Add';

import pageURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';
import theme from 'misc/providers/ThemeProvider/themes/default';

function Artworks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { items, totalItems, isLoading, error } = useSelector((state) => state.artworksList);

  const [hoveredId, setHoveredId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, error: null });

  const [notification, setNotification] = useState({
    open: location.state?.successMessage ? true : false,
    message: location.state?.successMessage || '',
    type: 'success',
  });

  useEffect(() => {
    if (location.state?.successMessage) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const normalize = (v) => (v === 'null' || v === '' ? null : v);
  const filters = useMemo(
    () => ({
      artistId: normalize(searchParams.get('artistId')),
      title: normalize(searchParams.get('title')) || '',
      sortBy: searchParams.get('sortBy') || 'title',
      sortDir: searchParams.get('sortDir') || 'asc',
      page: Number(searchParams.get('page')) || 1,
      size: Number(searchParams.get('size')) || 8,
    }),
    [searchParams],
  );

  useEffect(() => {
    dispatch(fetchArtworks(filters));
  }, [dispatch, filters]);

  const updateSearch = (next) => {
    const params = { ...filters, ...next };
    Object.keys(params).forEach((k) => {
      if (params[k] === null || params[k] === '') delete params[k];
    });
    setSearchParams(params);
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteArtwork(id));
    if (result.error) {
      setDeleteDialog((prev) => ({ ...prev, error: 'Error while deleting. Try again.' }));
      setNotification({ open: true, message: 'Error deleting artwork', type: 'error' });
    } else {
      setDeleteDialog({ open: false, id: null, error: null });
      setNotification({ open: true, message: 'Artwork deleted successfully!', type: 'success' });
    }
  };

  return (
    <>
      <ArtworksFilter initialFilters={filters} onApply={(f) => updateSearch({ ...f, page: 1 })} />

      {isLoading ? (
        <Loading>Loading artworks...</Loading>
      ) : error ? (
        <Loading variant='error'>Error loading artworks</Loading>
      ) : !items.length ? (
        <Loading variant='noData'>No artworks found</Loading>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Grid container spacing={2}>
            {items.map((a) => (
              <Grid item xs={12} sm={6} key={a.id}>
                <Hover
                  onMouseEnter={() => setHoveredId(a.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() =>
                    navigate(`${pageURLs[pages.artworks]}/${a.id}?${searchParams.toString()}`, {
                      state: { from: location.pathname + location.search },
                    })
                  }
                >
                  <Card
                    sx={{
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
                      <Typography variant='subTitle' color='default'>
                        <strong>Artist:</strong> {a.artistName}
                      </Typography>
                      {a.yearCreated && (
                        <Typography variant='subTitle' color='default'>
                          <strong>Year:</strong> {a.yearCreated}
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
              totalPages={Math.ceil(totalItems / filters.size)}
              onChange={(p) => updateSearch({ page: p })}
              disabled={isLoading}
            />
          </Box>
        </Box>
      )}

      {deleteDialog.open && (
        <Dialog open onClose={() => setDeleteDialog({ open: false, id: null, error: null })}>
          <Box sx={{ p: 2, minWidth: 300 }}>
            <Typography align='center'>Are you sure you want to delete this artwork?</Typography>
            {deleteDialog.error && (
              <Typography color='error' align='center' sx={{ mt: 1 }}>
                {deleteDialog.error}
              </Typography>
            )}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button onClick={() => setDeleteDialog({ open: false, id: null, error: null })}>
                Cancel
              </Button>
              <Button onClick={() => handleDelete(deleteDialog.id)}>Delete</Button>
            </Box>
          </Box>
        </Dialog>
      )}

      <Snackbar
        open={notification.open}
        message={notification.message}
        severity={notification.type}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />

      <FloatingActionButton
        icon={<AddIcon color={theme.button.color.primary.text} />}
        ariaLabel='Add artwork'
        to={{
          pathname: `${pageURLs[pages.artworks]}/new`,
          search: searchParams.toString(),
          state: { from: location.pathname + location.search },
        }}
      />
    </>
  );
}

export default Artworks;
