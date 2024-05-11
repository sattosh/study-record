import { Grid, Stack } from '@mui/material';
import { RecentTotalGraph, RecordForm, Widget } from '../components/home';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  StudyRecordFormProps,
  SubjectFormProps,
  defaultStudyRecordFormValue,
  defaultSubjectFormValue,
  studyRecordSchema,
  subjectSchema,
} from '../constants/form';
import { RecentSubjectGraph } from '../components/home/recent_subject_graph';
import { useDialog } from '../components/common';
import { SubjectRecordForm } from '../components/home/subject_form';
import { useAsyncFn, useEffectOnce } from 'react-use';
import { getAllSubjects } from '../api';

const dummyData = [
  {
    date: '2024-02-20 00:00',
    duration: 10,
    subject: '英会話',
  },
  {
    date: '2024-02-19 00:00',
    duration: 20,
    subject: 'ML',
  },
  {
    date: '2024-02-18 00:00',
    duration: 30,
    subject: 'フロントエンド',
  },
  {
    date: '2024-02-18 00:00',
    duration: 30,
    subject: '英会話',
  },
];

export const HomePage = () => {
  const recordForm = useForm<StudyRecordFormProps>({
    defaultValues: defaultStudyRecordFormValue,
    reValidateMode: 'onChange',
    resolver: zodResolver(studyRecordSchema),
  });
  const subjectForm = useForm<SubjectFormProps>({
    defaultValues: defaultSubjectFormValue,
    reValidateMode: 'onChange',
    resolver: zodResolver(subjectSchema),
  });
  const { show, hide, Dialog } = useDialog();

  // API
  const [getAllSubjectsApiState, getAllSubjectsApi] = useAsyncFn(getAllSubjects);

  useEffectOnce(() => {
    getAllSubjectsApi();
  });

  console.log('getAllSubjectsApiState', getAllSubjectsApiState);

  return (
    <>
      <Grid container sx={{ height: '100%', width: '100%', justifyContent: 'center', p: 2, m: 0 }} columnSpacing={2}>
        <Grid item sm={6}>
          <Widget elevation={2} sx={{ height: '100%' }}>
            <RecordForm
              form={recordForm}
              onRegister={(v) => console.log('record', v)}
              subjectOptions={[{ label: 'test', value: '1' }]}
              onClickAddSubject={show}
            />
          </Widget>
        </Grid>
        <Grid item sm={6}>
          <Stack spacing={2} direction="column" sx={{ height: '100%' }}>
            <Widget elevation={2} sx={{ maxHeight: '50%', display: 'flex', flexFlow: 'column' }}>
              <RecentTotalGraph xDataKey="date" yDataKey="duration" data={dummyData} />
            </Widget>
            <Widget elevation={2} sx={{ maxHeight: '50%', display: 'flex', flexFlow: 'column' }}>
              <RecentSubjectGraph xDataKey="subject" yDataKey="duration" data={dummyData} dateTimeKey="date" />
            </Widget>
          </Stack>
        </Grid>
      </Grid>
      <Dialog
        title="項目の追加"
        negativeLabel="キャンセル"
        onClickNegative={() => {
          subjectForm.reset(defaultSubjectFormValue);
          hide();
        }}
        fullWidth
        positiveLabel="追加"
        onClickPositive={subjectForm.handleSubmit((v) => console.log('subject', v))}
      >
        <SubjectRecordForm form={subjectForm} />
      </Dialog>
    </>
  );
};
