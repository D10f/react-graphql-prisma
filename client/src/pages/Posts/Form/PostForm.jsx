import { makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';

import FileUpload from '@components/FileUpload';

import { PUBLISH_POST_TOOLTIP, ALLOW_COMMENTS_TOOLTIP } from '@constants';
import { PADI_COLORS } from '@enums';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3)
  },
  ml: {
    // marginLeft: theme.spacing(2)
  },
  submitBtn: {
    display: 'flex',
    marginTop: theme.spacing(2),
    background: PADI_COLORS.OPEN_WATER
  },
  form: {
    marginBottom: theme.spacing(3)
  }
}));

const validators = {
  title: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  body: {
    required: true,
    minLength: 2
  },
  excerpt: {
    required: false,
    minLength: 2,
    maxLength: 240
  }
};

const PostForm = ({ onSubmit, loading, post, fileHandleChange, fileHandleError }) => {

  const classes = useStyles();
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <Container className={classes.form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Controller
          name="title"
          control={control}
          defaultValue={post?.title || ""}
          rules={validators.title}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              className={classes.field}
              error={!!errors?.title}
              fullWidth
              required
            />
          )}
        />

        <Controller
          name="body"
          control={control}
          defaultValue={post?.body || "" }
          rules={validators.body}
          render={({ field }) => (
            <TextField
              {...field}
              label="Content"
              variant="outlined"
              className={classes.field}
              error={!!errors?.body}
              multiline
              minRows={3}
              fullWidth
              required
            />
          )}
        />

        <Controller
          name="excerpt"
          control={control}
          defaultValue={post?.excerpt || ""}
          rules={validators.excerpt}
          render={({ field }) => (
            <TextField
              {...field}
              label="Excerpt"
              variant="outlined"
              placeholder="(Optional) short description displayed in the post preview"
              className={classes.field}
              error={!!errors?.excerpt}
              fullWidth
            />
          )}
        />

        {/* Only show file upload when editing a post */}
        {post && (
          <FileUpload
            fileHandleChange={fileHandleChange}
            fileHandleError={fileHandleError}
          />
        )}

        <Controller
          name="published"
          control={control}
          defaultValue={post?.published || true}
          render={({ field }) => (
            <Tooltip arrow title={PUBLISH_POST_TOOLTIP}>
              <FormControlLabel
                {...field}
                label="Make Public"
                className={classes.ml}
                control={
                  <Checkbox
                    checked={field.value}
                    color="primary"
                  />
                }
              />
            </Tooltip>
          )}
        />

        <Controller
          name="allowComments"
          control={control}
          defaultValue={post?.allowComments || true}
          render={({ field }) => (
            <Tooltip arrow title={ALLOW_COMMENTS_TOOLTIP}>
              <FormControlLabel
                {...field}
                label="Allow Comments"
                className={classes.ml}
                control={
                  <Checkbox
                    checked={field.value}
                    color="primary"
                  />
                }
              />
            </Tooltip>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitBtn}
          disableElevation
          disabled={loading}
          endIcon={loading ? <CircularProgress size={22} color="secondary" /> :<SendIcon />}
        >
          {post ? "Update Post" : "Create Post"}
        </Button>

      </form>
    </Container>
  );
};

export default PostForm;
