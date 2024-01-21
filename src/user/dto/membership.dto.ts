import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { MembershipTypes, WeekDays } from '../constants/constants';
import { HasDuplicateValues } from './duplicateValueConstraint';

export class MembershipDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(MembershipTypes)
  readonly membershipType: string;

  @IsArray()
  @IsEnum(WeekDays, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsNotEmpty()
  @Validate(HasDuplicateValues, {
    message: 'Availibility days contains duplicate days',
  })
  readonly availibilityDays: WeekDays[];
}
