import { Add, Edit } from '@mui/icons-material';
import { Box, Button, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { StudyRecordFormProps } from '../../constants/form';
import { SyncOrAsyncFunction } from '../../models';
import { InputDate, InputSelect, InputText, SelectOption } from '../form';
import { Form } from '../form/form';
import { BaseBackDropProgress } from '../layout';

export type RecordFormProps = {
  /** reactHookFormのインスタンス */
  form: UseFormReturn<StudyRecordFormProps>;
  /** 登録時の処理 */
  onRegister: SyncOrAsyncFunction<StudyRecordFormProps>;
  /** subjectの選択肢 */
  subjectOptions?: SelectOption[];
  /** 登録ボタン */
  onClickAddSubject: SyncOrAsyncFunction<never, void>;
  /** ローディング中 */
  loading?: boolean;
};

export const RecordForm = ({
  form,
  onRegister,
  subjectOptions = [],
  onClickAddSubject,
  loading = false,
}: RecordFormProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit(onRegister)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      {loading && <BaseBackDropProgress open inBox />}
      {!loading && (
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <Edit
              sx={{
                fontSizeAdjust: theme.typography.h5.fontSize?.toString(),
                mr: 1,
              }}
            />
            <Typography variant="h5">学習記録</Typography>
          </Box>

          <InputSelect
            name="subjectId"
            formLabel="学習項目"
            options={subjectOptions}
            sx={{ width: '100%' }}
            customOption={
              <MenuItem onClick={onClickAddSubject}>
                <Add />
                項目を追加する
              </MenuItem>
            }
          />

          <InputText
            name="studyDuration"
            type="number"
            placeholder="学習時間(分)"
            inputProps={{ min: 0 }}
            formLabel="学習時間(分)"
            sx={{ width: '100%' }}
          />
          <InputDate name="studyDate" sx={{ width: '100%' }} formLabel="学習日" />
          <InputText
            name="memo"
            sx={{ width: '100%' }}
            placeholder="学習の内容を記載"
            multiline
            minRows={4}
            maxRows={10}
            formLabel="メモ"
          />
          <Box sx={{ flexDirection: 'row-reverse', width: '100%', display: 'flex', pt: 2 }}>
            <Button type="submit" variant="contained" fullWidth>
              登録
            </Button>
          </Box>
        </Stack>
      )}
    </Form>
  );
};
