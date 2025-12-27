import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import Button from 'components/Button';

function ArtworksFilter({ onApply, initialFilters }) {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.items || []);

  const [filters, setFilters] = useState(() => ({
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
  }));

  useEffect(() => {
    if (!artists.length) dispatch(fetchArtists());
  }, [dispatch, artists.length]);

  const handleApply = useCallback(() => {
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
      title: filters.title || '',
      sortBy,
      sortDir,
      page: 1,
      size: 8,
    });
  }, [filters, onApply]);

  const handleClear = useCallback(() => {
    setFilters({ artist: null, title: '', sort: 'titleAsc' });
    onApply({ artistId: null, title: '', sortBy: 'title', sortDir: 'asc', page: 1, size: 8 });
  }, [onApply]);

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
          <TextField {...params} label='Search by Artist' variant='standard' />
        )}
        sx={{ minWidth: 220 }}
      />

      <TextField
        label='Search by Title'
        variant='standard'
        value={filters.title}
        onChange={(e) => setFilters((prev) => ({ ...prev, title: e.target.value }))}
        sx={{ minWidth: 220 }}
      />

      <FormControl variant='standard' sx={{ minWidth: 220 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={filters.sort}
          onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
        >
          <MenuItem value='titleAsc'>Title A → Z</MenuItem>
          <MenuItem value='titleDesc'>Title Z → A</MenuItem>
          <MenuItem value='yearAsc'>Year (Oldest first)</MenuItem>
          <MenuItem value='yearDesc'>Year (Newest first)</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={handleApply}>Apply</Button>
        <Button onClick={handleClear}>Clear</Button>
      </Box>
    </Box>
  );
}

export default ArtworksFilter;
