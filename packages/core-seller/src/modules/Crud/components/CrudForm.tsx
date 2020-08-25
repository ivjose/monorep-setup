import React from 'react';
import Grid from '@material-ui/core/Grid';

import { InputText, Button } from '@project/shared-components';

type CrudFormProps = {
  register: any;
  errors: any;
};

const CrudForm: React.FC<CrudFormProps> = ({ register, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InputText
          inputRef={register}
          required
          label="Title"
          name="title"
          error={!!errors.title?.message}
          errorText={errors.title?.message}
        />

        <InputText
          inputRef={register}
          required
          name="body"
          label="Body"
          rows={4}
          multiline
          helperText={errors.body?.message}
          error={!!errors.body?.message}
        />
      </Grid>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Grid>
  );
};

export default CrudForm;
