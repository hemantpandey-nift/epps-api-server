import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MembershipTypes, WeekDays } from '../constants/constants';

@Schema()
export class Member {
  @Prop({
    required: [true, 'User membership type is required'],
    enum: MembershipTypes,
  })
  membershipType: string;

  @Prop({
    type: [String],
    required: [true, 'User availibility days is required'],
    enum: WeekDays,
  })
  availibilityDays: string;
}
export const MembershipSchema = SchemaFactory.createForClass(Member);
