import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { IMG_UPLOAD_TOOLTIP, VALID_MIME_TYPES, MAX_FILE_SIZE, ERROR_MESSAGE } from '@constants';

const useStyles = makeStyles(theme => ({
  mr: {
    marginRight: '0.7rem'
  },
  input: {
    display: 'none',
  },
}));

const FileUpload = ({ fileHandleChange, fileHandleError }) => {

  const classes = useStyles();
  const [ loading, setLoading ] = useState(false);

  const onChange = ({ target }) => {
    setLoading(true);

    const [ file ] = target.files;

    if (!file) {
      setLoading(false);
      return;
    };

    const validMimeType = VALID_MIME_TYPES.test(file.type);

    if (!validMimeType || file.size > MAX_FILE_SIZE) {
      fileHandleError(ERROR_MESSAGE);
      setLoading(false);
      return;
    };

    fileHandleChange(file).then(() => setLoading(false));
  };

  return (
    <>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        disabled={loading}
        onChange={onChange}
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
    </>
  );
};

export default FileUpload;
