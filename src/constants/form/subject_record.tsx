import { z } from 'zod';

export type SubjectReferenceLinkRecord = {
  linkName?: string;
  link: string;
};

export type SubjectFormProps = {
  name: string;
  description: string;
  referenceLinks: SubjectReferenceLinkRecord[];
};

export const defaultSubjectFormValue: SubjectFormProps = {
  name: '',
  description: '',
  referenceLinks: [{ link: '', linkName: '' }],
};

export const subjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  referenceLinks: z.array(
    z.object({
      linkName: z.string().min(1),
      link: z.string().url(),
    })
  ),
});
