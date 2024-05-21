import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAsyncFn, useEffectOnce } from 'react-use';
import { addStudyRecord, addSubject, getAllStudyRecords, getAllSubjects } from '../api';
import { useDialog } from '../components/common';
import { RecentTotalGraph, RecordForm, Widget } from '../components/top';
import { RecentSubjectGraph } from '../components/top/recent_subject_graph';
import { SubjectRecordForm } from '../components/top/subject_form';
import {
  StudyRecordFormProps,
  SubjectFormProps,
  defaultStudyRecordFormValue,
  defaultSubjectFormValue,
  studyRecordSchema,
  subjectSchema,
} from '../constants/form';
import { useNotice } from '../hooks';

/** 学習ページのトップ */
export const TopPage = () => {
  const notice = useNotice();

  /** 学習記録のフォーム */
  const recordForm = useForm<StudyRecordFormProps>({
    defaultValues: defaultStudyRecordFormValue,
    reValidateMode: 'onChange',
    resolver: zodResolver(studyRecordSchema),
  });
  /** 科目登録のフォーム */
  const subjectForm = useForm<SubjectFormProps>({
    defaultValues: defaultSubjectFormValue,
    reValidateMode: 'onChange',
    resolver: zodResolver(subjectSchema),
  });
  /** 科目登録ダイアログ */
  const subjectRegisterDialog = useDialog();
  // API
  const [getAllSubjectsState, getAllSubjectsApi] = useAsyncFn(getAllSubjects);
  const [getAllStudyRecordsState, getAllStudyRecordsApi] = useAsyncFn(getAllStudyRecords);
  // マウント時に実行
  useEffectOnce(() => {
    getAllSubjectsApi();
    getAllStudyRecordsApi();
  });

  /** 学習記録処理 */
  const onRegisterStudyRecord = React.useCallback(
    async ({ studyDate, studyDuration, memo, subjectId }: StudyRecordFormProps) => {
      if (!subjectId) throw new Error('学習項目を選択してください');

      try {
        await addStudyRecord({ studyDate: studyDate.toISO(), studyDuration: Number(studyDuration), memo: memo ?? '', subjectId });
        recordForm.reset(defaultStudyRecordFormValue);
        notice.success('学習記録を追加しました');
        getAllStudyRecordsApi();
        recordForm.reset({ ...defaultStudyRecordFormValue, subjectId: null });
      } catch (e) {
        notice.error('学習記録の追加に失敗しました');
        console.error(e);
      }
    },
    [getAllStudyRecordsApi, notice, recordForm]
  );

  /** 科目登録処理 */
  const onRegisterSubject = React.useCallback(
    async (v: SubjectFormProps) => {
      const { name, description, referenceLinks } = v;
      if (new Set(getAllSubjectsState.value?.map((v) => v.name)).has(name)) {
        subjectForm.setError('name', { message: '同じ名前の科目が既に存在します' });
        return;
      }

      try {
        const subjectId = await addSubject(
          { name, description },
          referenceLinks.map((r) => ({ linkName: r.linkName || '', link: r.link }))
        );

        subjectRegisterDialog.hide();
        subjectForm.reset(defaultSubjectFormValue);
        notice.success('科目を追加しました');
        recordForm.setValue('subjectId', subjectId);
        getAllSubjectsApi();
      } catch (e) {
        notice.error('科目の追加に失敗しました');
        console.error(e);
      }
    },
    [getAllSubjectsApi, getAllSubjectsState.value, notice, recordForm, subjectForm, subjectRegisterDialog]
  );

  return (
    <>
      <Grid container sx={{ height: '100%', width: '100%', justifyContent: 'center', p: 2, m: 0 }} columnSpacing={2}>
        <Grid item sm={6}>
          <Widget elevation={2} sx={{ height: '100%' }}>
            <RecordForm
              form={recordForm}
              onRegister={onRegisterStudyRecord}
              subjectOptions={getAllSubjectsState.value?.map((v) => ({ label: v.name, value: v.id })) ?? []}
              onClickAddSubject={subjectRegisterDialog.show}
              loading={getAllSubjectsState.loading}
            />
          </Widget>
        </Grid>
        <Grid item sm={6}>
          <Stack spacing={2} direction="column" sx={{ height: '100%' }}>
            <Widget elevation={2} sx={{ maxHeight: '50%', display: 'flex', flexFlow: 'column' }}>
              <RecentTotalGraph
                xDataKey="studyDate"
                yDataKey="studyDuration"
                data={getAllStudyRecordsState.value ?? []}
                loading={getAllStudyRecordsState.loading}
              />
            </Widget>
            <Widget elevation={2} sx={{ maxHeight: '50%', display: 'flex', flexFlow: 'column' }}>
              <RecentSubjectGraph
                xDataKey="subjectName"
                yDataKey="studyDuration"
                dateTimeKey="studyDate"
                data={getAllStudyRecordsState.value ?? []}
                loading={getAllStudyRecordsState.loading}
              />
            </Widget>
          </Stack>
        </Grid>
      </Grid>
      <subjectRegisterDialog.Dialog
        title="項目の追加"
        negativeLabel="キャンセル"
        onClickNegative={() => {
          subjectForm.reset(defaultSubjectFormValue);
          subjectRegisterDialog.hide();
        }}
        fullWidth
        positiveLabel="追加"
        onClickPositive={subjectForm.handleSubmit(onRegisterSubject)}
      >
        <SubjectRecordForm form={subjectForm} />
      </subjectRegisterDialog.Dialog>
    </>
  );
};
