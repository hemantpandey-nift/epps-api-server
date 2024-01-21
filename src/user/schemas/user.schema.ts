import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Membership, WeekDays } from '../constants/constants';
import { MembershipSchema } from './membership.schema';
import { IMembership } from '../interfaces/membership.interface';

@Schema()
export class User {
  @Prop({
    required: [true, 'User name is required'],
    minlength: [2, 'User name should contain atleast 2 characters'],
    maxlength: [150, 'User name can contain maximum 150 characters'],
  })
  name: string;

  @Prop({
    required: [true, 'User Age is required'],
    min: [18, 'User age should be above 18 years'],
    max: [60, 'Maximun permissible user age is 60 years'],
  })
  age: number;

  @Prop({
    required: [true, 'User weight is required'],
    min: [30, 'User weight should be more than 30 Kg'],
    max: [150, 'Maximun permissible user weight is 150 Kg'],
  })
  weight: number;

  @Prop({
    type: MembershipSchema,
  })
  userMembership: IMembership;

  // @Prop({
  //   required: [true, 'User membership type is required'],
  //   enum: Membership,
  // })
  // membershipType: string;

  // @Prop({
  //   type: [String],
  //   required: [true, 'User availibility days is required'],
  //   enum: WeekDays,
  // })
  // availibilityDays: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
