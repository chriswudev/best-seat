import React from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addMovie, updateMovie } from '../../utils/api';

export default function MovieModal({
  open,
  onClose,
  type,
  fetchMovies,
  values,
}) {
  const handleClose = () => {
    onClose();
  };

  const MovieSchema = Yup.object().shape({
    title: Yup.string().max(50, 'Too Long!').required('Title required'),
    summary: Yup.string().max(100, 'Too Long!').required('Summary required'),
    year: Yup.number()
      .test(
        'len',
        'Must be exactly 4 characters',
        (val) => val && val.toString().length === 4
      )
      .min(1900, 'Year must be greater than 1900')
      .max(new Date().getFullYear(), 'Year must be less than current year')
      .required('Year is required'),
    genre: Yup.string().required('Genre is required'),
  });

  const onSubmit = (values) => {
    let res = null;
    if (type === 'add') {
      res = addMovie(values);
    } else {
      res = updateMovie(values);
    }
    res
      .then((data) => {
        if (data.ok) {
          handleClose();
          return data.json();
        }
        throw new Error('Network error.');
      })
      .then(() => {
        fetchMovies();
      })
      .catch((err) => console.error('Error: ' + err));
  };

  const formik = useFormik({
    initialValues:
      type === 'edit'
        ? values
        : {
            title: '',
            summary: '',
            year: '',
            genre: '',
            link: '',
          },
    validationSchema: MovieSchema,
    onSubmit: onSubmit,
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Movie</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please fill out all required input fields.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              required
              {...getFieldProps('title')}
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title}
            />
            <TextField
              margin="dense"
              name="summary"
              multiline
              label="Summary"
              type="text"
              fullWidth
              variant="standard"
              required
              {...getFieldProps('summary')}
              error={Boolean(touched.summary && errors.summary)}
              helperText={touched.summary && errors.summary}
            />
            <TextField
              margin="dense"
              name="year"
              label="Year"
              type="text"
              fullWidth
              variant="standard"
              required
              {...getFieldProps('year')}
              error={Boolean(touched.year && errors.year)}
              helperText={touched.year && errors.year}
            />
            <TextField
              margin="dense"
              name="genre"
              label="Genre"
              type="text"
              fullWidth
              variant="standard"
              required
              {...getFieldProps('genre')}
              error={Boolean(touched.genre && errors.genre)}
              helperText={touched.genre && errors.genre}
            />
            <TextField
              margin="dense"
              name="link"
              label="IMDb"
              type="text"
              fullWidth
              variant="standard"
              {...getFieldProps('link')}
              error={Boolean(touched.link && errors.link)}
              helperText={touched.link && errors.link}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
