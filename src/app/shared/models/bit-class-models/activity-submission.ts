import { ModelBase } from '../core/model-base';
import { ClassMember } from './class-member';
import { Activity } from './activity';

export interface ActivitySubmission extends ModelBase {
  id: number;
  activity: Activity;
  class_member: ClassMember;
  submitted_at: Date;
  grade: number | null;
  answer: string;
  file_submission: string;
}
