import { Box, IconButton, Stack, Typography } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { SubjectFormProps } from '../../constants/form';
// import { SyncOrAsyncFunction } from '../../models';
import { Add, Delete } from '@mui/icons-material';
import { InputText } from '../form';
import { Form } from '../form/form';

export type SubjectRecordFormProps = {
  /** reactHookFormのインスタンス */
  form: UseFormReturn<SubjectFormProps>;
};

export const SubjectRecordForm = ({ form }: SubjectRecordFormProps): JSX.Element => {
  const { fields, append, remove } = useFieldArray({ name: 'referenceLinks', control: form.control });
  return (
    <Form
      form={form}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <Stack spacing={3}>
        <InputText name="name" placeholder="項目名" formLabel="項目名" sx={{ width: '100%' }} />
        <InputText
          name="description"
          sx={{ width: '100%' }}
          placeholder="メモ"
          multiline
          minRows={4}
          maxRows={10}
          formLabel="メモ"
        />
        <Box>
          <Typography variant="h6">参考リンク</Typography>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'flex', columnGap: 1, mt: 1 }}>
              <InputText name={`referenceLinks.${index}.linkName`} placeholder="リンク名" sx={{ flexGrow: 1 }} />
              <InputText name={`referenceLinks.${index}.link`} placeholder="URL" sx={{ flexGrow: 1 }} />
              <Box sx={{ pt: 1 }}>
                <IconButton onClick={() => remove(index)} size="small">
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
        {fields.length < 5 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={() => append({ linkName: '', link: '' })}>
              <Add />
            </IconButton>
          </Box>
        )}
      </Stack>
    </Form>
  );
};
