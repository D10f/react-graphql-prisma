import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Toast from '@components/Toast';
import { UPLOAD_FILE } from '@services/files/mutations';

import { IMG_UPLOAD_TOOLTIP, VALID_MIME_TYPES, MAX_FILE_SIZE, ERROR_MESSAGE } from '@constants';

const useStyles = makeStyles(theme => ({
  mr: {
    marginRight: '0.7rem'
  },
  input: {
    display: 'none',
  },
}));

const FileUpload = () => {

  const classes = useStyles();
  const [ error, setError ] = useState('');

  const [ fileUpload, { loading } ] = useMutation(UPLOAD_FILE, {
    onCompleted: data => console.log(data),
    onError: err => setError(err.message),
  });

  const fileHandleChange = ({ target }) => {
    const [ file ] = target.files;
    if (!file) return;

    const validMimeType = VALID_MIME_TYPES.test(file.type);

    if (!validMimeType || file.size > MAX_FILE_SIZE) {
      setError(ERROR_MESSAGE)
    };

    fileUpload({ variables: { file }});
  };

  return (
    <>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        disabled={loading}
        onChange={fileHandleChange}
      />
      <label htmlFor="contained-button-file">
        <Tooltip arrow title={IMG_UPLOAD_TOOLTIP}>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            className={classes.mr}
          >
            <span className={classes.mr}>Upload Image</span>
            {loading ? <CircularProgress size={24} color="primary" /> : <PhotoCamera />}
          </Button>
        </Tooltip>
      </label>
      {error && (
        <Toast
          message={error}
          severity='error'
          onClose={() => setError('')}
        />
      )}
    </>
  );
};

export default FileUpload;
