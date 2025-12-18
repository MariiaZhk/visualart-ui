import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import Button from 'components/Button';
import { fetchArtists } from 'app/actions/artists';
import {
  Box,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function ArtworksFilter({ onApply, initialFilters }) {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const artists = useSelector((state) => state.artists.items || []);

  const [filters, setFilters] = useState({
    artist: null,
    title: '',
    sort: 'titleAsc',
  });

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists());
    }
  }, [dispatch, artists.length]);

  useEffect(() => {
    if (!initialFilters) return;

    setFilters({
      artist: artists.find((a) => a.id === initialFilters.artistId) || null,
      title: initialFilters.title || '',
      sort:
        initialFilters.sortBy === 'yearCreated'
          ? initialFilters.sortDir === 'asc'
            ? 'yearAsc'
            : 'yearDesc'
          : initialFilters.sortDir === 'desc'
          ? 'titleDesc'
          : 'titleAsc',
    });
  }, [initialFilters, artists]);

  const handleApply = () => {
    let sortBy = 'title';
    let sortDir = 'asc';

    switch (filters.sort) {
      case 'titleDesc':
        sortDir = 'desc';
        break;
      case 'yearAsc':
        sortBy = 'yearCreated';
        break;
      case 'yearDesc':
        sortBy = 'yearCreated';
        sortDir = 'desc';
        break;
      default:
        break;
    }

    onApply({
      artistId: filters.artist?.id || null,
      title: filters.title || null,
      sortBy,
      sortDir,
      page: 1,
      size: 8,
    });
  };

  const handleClear = () => {
    setFilters({
      artist: null,
      title: '',
      sort: 'titleAsc',
    });

    onApply({
      artistId: null,
      title: null,
      sortBy: 'title',
      sortDir: 'asc',
      page: 1,
      size: 8,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        mb: 4,
      }}
    >
      <Autocomplete
        options={artists}
        value={filters.artist}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => setFilters((prev) => ({ ...prev, artist: value }))}
        renderInput={(params) => (
          <TextField
            {...params}
            label={formatMessage({ id: 'filter.artist' })}
            variant='standard'
          />
        )}
        sx={{ minWidth: 220 }}
      />

      <TextField
        label={formatMessage({ id: 'filter.title' })}
        variant='standard'
        value={filters.title}
        onChange={(e) => setFilters((prev) => ({ ...prev, title: e.target.value }))}
        sx={{ minWidth: 220 }}
      />

      <FormControl variant='standard' sx={{ minWidth: 220 }}>
        <InputLabel>{formatMessage({ id: 'filter.sortBy' })}</InputLabel>
        <Select
          value={filters.sort}
          onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
        >
          <MenuItem value='titleAsc'>{formatMessage({ id: 'filter.sort.titleAsc' })}</MenuItem>
          <MenuItem value='titleDesc'>{formatMessage({ id: 'filter.sort.titleDesc' })}</MenuItem>
          <MenuItem value='yearAsc'>{formatMessage({ id: 'filter.sort.yearAsc' })}</MenuItem>
          <MenuItem value='yearDesc'>{formatMessage({ id: 'filter.sort.yearDesc' })}</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={handleApply}>{formatMessage({ id: 'apply' })}</Button>
        <Button onClick={handleClear}>{formatMessage({ id: 'clear' })}</Button>
      </Box>
    </Box>
  );
}

export default ArtworksFilter;
