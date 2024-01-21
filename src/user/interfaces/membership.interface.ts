import { Document } from 'mongoose';

export interface IMembership extends Document {
  readonly membershipType: string;
  readonly availibilityDays: string[];
}
