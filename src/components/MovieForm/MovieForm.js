import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../shared/Button/Button';
import { genres as defaultGenres } from '../../data/genres';
import { API_URL } from '../../constants';
import { validateMovieForm } from './movieValidator';
import './movie-form.scss';

function MovieForm({ initialMovieInfo = {}, method = 'POST', movieId = null }) {
  const navigate = useNavigate();
  // Merge and deduplicate genres
  const movieGenres = initialMovieInfo?.genres || [];
  const allGenres = Array.from(new Set([...defaultGenres, ...movieGenres]));
  const filteredGenres = allGenres.filter((genre) => genre !== 'All');

  const initialValues = {
    title: initialMovieInfo?.title || '',
    release_date: initialMovieInfo?.release_date || '',
    poster_path: initialMovieInfo?.poster_path || '',
    vote_average: initialMovieInfo?.vote_average?.toString() || '',
    genres: movieGenres,
    runtime: initialMovieInfo?.runtime?.toString() || '',
    overview: initialMovieInfo?.overview || '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formattedValues = {
      ...values,
      vote_average: parseFloat(values.vote_average),
      runtime: parseInt(values.runtime, 10),
    };
    handleMovieFormSubmit(formattedValues);
    setSubmitting(false);
    resetForm();
  };

  const handleMovieFormSubmit = async (formData) => {
    if (!formData) {
      navigate('/');
      return;
    }

    if (method === 'PUT') {
      formData.id = Number(movieId);
    }

    try {
      const response = await fetch(API_URL, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${method === 'POST' ? 'add' : 'edit'} movie`
        );
      }

      const responseData = await response.json();

      if (responseData.id) {
        navigate(`/${responseData.id}`);
      } else {
        console.error('Response does not contain an ID');
      }
    } catch (error) {
      console.error(`Error submitting form (${method}):`, error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateMovieForm}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, resetForm }) => (
        <Form className="movie-form" role="form">
          <div className="movie-form__row">
            <div className="movie-form__group">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter movie title"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="movie-form__group">
              <label htmlFor="release_date">Release Date</label>
              <Field type="date" id="release_date" name="release_date" />
              <ErrorMessage
                name="release_date"
                component="div"
                className="error"
              />
            </div>
          </div>

          <div className="movie-form__row">
            <div className="movie-form__group">
              <label htmlFor="poster_path">Movie URL</label>
              <Field
                type="url"
                id="poster_path"
                name="poster_path"
                placeholder="Enter movie poster URL"
              />
              <ErrorMessage
                name="poster_path"
                component="div"
                className="error"
              />
            </div>

            <div className="movie-form__group">
              <label htmlFor="vote_average">Rating</label>
              <Field
                type="number"
                id="vote_average"
                name="vote_average"
                placeholder="Enter movie rating"
                min="0"
                max="10"
                step="0.1"
              />
              <ErrorMessage name="vote_average" component="div" className="error" />
            </div>
          </div>

          <div className="movie-form__row">
            <div className="movie-form__group">
              <label htmlFor="genres">Genre</label>
              <Field
                as="select"
                id="genres"
                name="genres"
                multiple
                className="movie-form__select"
              >
                {filteredGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="genres" component="div" className="error" />
            </div>

            <div className="movie-form__group">
              <label htmlFor="runtime">Runtime</label>
              <Field
                type="number"
                id="runtime"
                name="runtime"
                placeholder="Enter runtime in minutes"
              />
              <ErrorMessage name="runtime" component="div" className="error" />
            </div>
          </div>

          <div className="movie-form__row">
            <div className="movie-form__group movie-form__group--full">
              <label htmlFor="overview">Overview</label>
              <Field
                as="textarea"
                id="overview"
                name="overview"
                placeholder="Enter movie overview"
              />
              <ErrorMessage name="overview" component="div" className="error" />
            </div>
          </div>

          <div className="movie-form__actions">
            <Button
              text="Reset"
              className="secondary"
              onClick={(e) => {
                e.preventDefault();
                resetForm();
              }}
            />
            <Button
              text={isSubmitting ? 'Submitting...' : 'Submit'}
              className="primary"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default MovieForm;
