import { z } from 'zod';

export type SubjectReferenceLinkRecord = {
  linkName?: string;
  linkUrl: string;
};

export type SubjectFormProps = {
  name: string;
  description: string;
  referenceLinks: SubjectReferenceLinkRecord[];
};

export const defaultSubjectFormProps: SubjectFormProps = {
  name: '',
  description: '',
  referenceLinks: [],
};

export const subjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  referenceLinks: z.array(
    z.object({
      linkName: z.string().optional(),
      linkUrl: z.string(),
    })
  ),
});
