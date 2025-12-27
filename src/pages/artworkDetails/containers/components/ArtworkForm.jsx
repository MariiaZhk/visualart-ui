import React, { useEffect, useState } from 'react';
import { Stack, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const normalizeCommaSeparated = (text) =>
  Array.from(
    new Set(
      text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  );

const ArtworkForm = ({ artwork, errors, mode, onChange }) => {
  const { items: artists } = useSelector((state) => state.artists);
  const isViewMode = mode === 'view';

  const [genresText, setGenresText] = useState('');
  const [mediaText, setMediaText] = useState('');

  useEffect(() => {
    setGenresText((artwork.genres || []).join(', '));
    setMediaText((artwork.media || []).join(', '));
  }, [artwork.genres, artwork.media]);

  const handleNumberChange = (field, value) => {
    onChange(field, value === '' ? '' : Number(value));
  };

  return (
    <Stack spacing={2} marginTop={2}>
      <TextField
        label='Title'
        value={artwork.title || ''}
        onChange={(e) => onChange('title', e.target.value)}
        InputProps={{
          readOnly: isViewMode,
          style: { caretColor: isViewMode ? 'transparent' : undefined },
        }}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
        required
      />

      <TextField
        label='Year Created'
        value={artwork.yearCreated ? String(artwork.yearCreated) : ''}
        onChange={(e) => handleNumberChange('yearCreated', e.target.value)}
        InputProps={{
          readOnly: isViewMode,
          style: { caretColor: isViewMode ? 'transparent' : undefined },
        }}
        error={!!errors.yearCreated}
        helperText={errors.yearCreated}
        fullWidth
        required
      />

      {isViewMode ? (
        <TextField
          label='Artist'
          value={artwork.artistName || ''}
          InputProps={{
            readOnly: true,
            style: { caretColor: 'transparent' },
          }}
          fullWidth
        />
      ) : (
        <Autocomplete
          freeSolo
          options={artists}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={
            artists.find((a) => a.id === artwork.artistId) ||
            (artwork.artistName ? { id: artwork.artistId, name: artwork.artistName } : null)
          }
          onChange={(_, value) => {
            if (!value) {
              onChange('artistId', '');
              onChange('artistName', '');
              return;
            }
            if (typeof value === 'object') {
              onChange('artistId', value.id);
              onChange('artistName', value.name);
            }
          }}
          onInputChange={(_, value) => {
            onChange('artistId', '');
            onChange('artistName', value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Artist'
              error={!!errors.artistId || !!errors.artistName}
              helperText={errors.artistId || errors.artistName}
              required
            />
          )}
        />
      )}

      <TextField
        label='Genres (comma separated)'
        value={genresText}
        onChange={(e) => setGenresText(e.target.value)}
        onBlur={() => onChange('genres', normalizeCommaSeparated(genresText))}
        InputProps={{
          readOnly: isViewMode,
          style: { caretColor: isViewMode ? 'transparent' : undefined },
        }}
        fullWidth
      />

      <TextField
        label='Media (comma separated)'
        value={mediaText}
        onChange={(e) => setMediaText(e.target.value)}
        onBlur={() => onChange('media', normalizeCommaSeparated(mediaText))}
        InputProps={{
          readOnly: isViewMode,
          style: { caretColor: isViewMode ? 'transparent' : undefined },
        }}
        fullWidth
      />
    </Stack>
  );
};

export default ArtworkForm;
