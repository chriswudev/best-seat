import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MovieModal from '../modals/MovieModal';
import ConfirmModal from '../modals/ConfirmModal';
import { deleteMovie } from '../../utils/api';

// ----------------------------------------------------------------------

export default function MovieMoreMenu({ movie, fetchMovies }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEditMovie = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDeleteMovie = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDeleteMovie = () => {
    if (movie) {
      deleteMovie(movie.id)
        .then((data) => {
          if (data.ok) {
            fetchMovies();
            return;
          }
          throw new Error('Something went wrong.');
        })
        .catch((err) => message.error('Error: ' + err));
    }
    setOpenDeleteModal(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeleteMovie}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={handleEditMovie}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MovieModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          type="edit"
          values={movie}
          fetchMovies={fetchMovies}
        />
        <ConfirmModal
          open={openDeleteModal}
          title="Are you sure you want to delete this movie?"
          text="Once you delete the movie, it can't be recovered."
          handleCancel={handleCloseDeleteModal}
          handleConfirm={handleConfirmDeleteMovie}
        />
      </Menu>
    </>
  );
}
