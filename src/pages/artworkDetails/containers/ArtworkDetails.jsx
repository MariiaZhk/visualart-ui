import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArtworkById, saveArtwork } from 'app/actions/artworkDetails';
import { createArtist, fetchArtists } from 'app/actions/artists';
import { CLEAR_ARTWORK_DETAILS } from 'app/constants/actionTypes';

import Card from 'components/Card';
import CardTitle from 'components/CardTitle';
import CardContent from 'components/CardContent';
import CardActions from 'components/CardActions';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Snackbar from 'components/Snackbar';

import Cancel from 'components/icons/Cancel';
import ArrowBack from 'components/icons/ArrowBack';
import Save from 'components/icons/Save';
import Edit from 'components/icons/Edit';

import Typography from 'components/Typography';
import theme from 'misc/providers/ThemeProvider/themes/default';
import pageURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';

import ArtworkForm from './components/ArtworkForm';

const convertServerErrors = (errData) => {
  if (Array.isArray(errData)) return errData;
  if (errData?.errors && typeof errData.errors === 'object') return errData.errors;
  if (errData?.message) return { _error: errData.message };
  return { _error: 'Something went wrong' };
};

function ArtworkDetails() {
  const { id } = useParams();
  const isNew = id === 'new';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || pageURLs[pages.artworks];

  const { entity: artworkFromState } = useSelector((state) => state.artworkDetails);
  const { items: artists } = useSelector((state) => state.artists);

  const emptyArtwork = {
    title: '',
    yearCreated: '',
    genres: [],
    media: [],
    artistId: '',
    artistName: '',
  };

  const [artwork, setArtwork] = useState(emptyArtwork);
  const [editArtwork, setEditArtwork] = useState(emptyArtwork);
  const [mode, setMode] = useState(isNew ? 'edit' : 'view');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: !!location.state?.successMessage,
    message: location.state?.successMessage || '',
    type: 'success',
  });

  useEffect(() => {
    if (location.state?.successMessage) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const loadArtwork = useCallback(() => {
    if (!isNew) dispatch(fetchArtworkById(id));
    if (!artists.length) dispatch(fetchArtists());
  }, [id, isNew, dispatch, artists.length]);

  useEffect(() => loadArtwork(), [loadArtwork]);

  useEffect(() => {
    if (!artworkFromState) return;

    const mapped = {
      ...artworkFromState,
      artistId: artworkFromState.artist?.id || '',
      artistName: artworkFromState.artist?.name || '',
      genres: artworkFromState.genres || [],
      media: artworkFromState.media || [],
    };

    setArtwork(mapped);
    setEditArtwork(mapped);
  }, [artworkFromState]);

  useEffect(() => () => dispatch({ type: CLEAR_ARTWORK_DETAILS }), [dispatch]);

  const validateField = (field, value) => {
    switch (field) {
      case 'title':
        if (!value?.trim()) return 'Title is required';
        if (value.length > 100) return 'Maximum 100 characters';
        return '';
      case 'yearCreated':
        if (value === '' || value === null) return 'Year is required';
        const year = Number(value);
        if (!Number.isInteger(year)) return 'Year must be a number';
        if (year <= 0) return 'Year must be positive';
        const currentYear = new Date().getFullYear();
        if (year > currentYear) return `Year cannot be in the future (max ${currentYear})`;
        return '';
      case 'artistName':
        if (!value?.trim() && !editArtwork.artistId) return 'Artist is required';
        return '';
      case 'genres':
      case 'media':
        if (!value) return '';
        return '';
      default:
        return '';
    }
  };

  const validate = () => {
    const errors = {};
    let valid = true;

    Object.keys(editArtwork).forEach((field) => {
      const error = validateField(field, editArtwork[field]);
      if (error) {
        errors[field] = error;
        valid = false;
      }
    });

    setFieldErrors(errors);
    return valid;
  };

  const handleChange = (field, value) => setEditArtwork((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      let artistId = editArtwork.artistId;

      if (!artistId && editArtwork.artistName?.trim()) {
        const exists = artists.find(
          (a) => a.name.toLowerCase() === editArtwork.artistName.trim().toLowerCase(),
        );

        if (exists) {
          artistId = exists.id;
        } else {
          const result = await dispatch(createArtist({ name: editArtwork.artistName.trim() }));
          if (result.error) throw result.error;

          artistId = result.payload?.id;
          if (!artistId) throw new Error('Failed to get new artist id');
        }
      }

      const artworkToSave = { ...editArtwork, artistId };
      delete artworkToSave.artistName;

      const result = await dispatch(saveArtwork(artworkToSave, isNew));
      if (result.error) throw result.error;

      const savedArtwork = result.payload;
      const updatedArtwork = {
        ...savedArtwork,
        artistId: savedArtwork.artist?.id || artistId,
        artistName: savedArtwork.artist?.name || editArtwork.artistName || '',
      };

      setArtwork(updatedArtwork);
      setEditArtwork(updatedArtwork);

      if (isNew) {
        navigate(from, { state: { successMessage: 'Artwork created successfully!' } });
      } else {
        setMode('view');
        setNotification({ open: true, message: 'Artwork updated successfully!', type: 'success' });
      }
    } catch (err) {
      const formErrors = convertServerErrors(err);

      setFieldErrors(formErrors);

      if (err?.message && !formErrors.title) {
        setNotification({ open: true, message: err.message, type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isNew) navigate(from);
    else {
      setEditArtwork(artwork);
      setFieldErrors({});
      setMode('view');
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 4,
        position: 'relative',
        backgroundColor: theme.card.color.background.edit,
      }}
    >
      <CardTitle>
        <Typography variant='title'>
          {isNew ? 'New Artwork' : mode === 'view' ? 'Artwork Details' : 'Edit Artwork'}
        </Typography>
        {!isNew && mode === 'view' && (
          <IconButton onClick={() => setMode('edit')}>
            <Edit />
          </IconButton>
        )}
      </CardTitle>

      <CardContent>
        <ArtworkForm
          artwork={editArtwork}
          errors={fieldErrors}
          mode={mode}
          onChange={handleChange}
        />
      </CardContent>

      <CardActions>
        {mode === 'edit' ? (
          <>
            <Button startIcon={<Save />} onClick={handleSave} isLoading={loading}>
              {isNew ? 'Create' : 'Save'}
            </Button>
            <Button startIcon={<Cancel />} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button startIcon={<ArrowBack />} onClick={() => navigate(from)}>
            Back
          </Button>
        )}
      </CardActions>

      <Snackbar
        open={notification.open}
        message={notification.message}
        severity={notification.type}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Card>
  );
}

export default ArtworkDetails;
