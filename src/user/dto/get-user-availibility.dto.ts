import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  Validate,
} from 'class-validator';
import { WeekDays } from '../constants/constants';
import { HasDuplicateValues } from './duplicateValueConstraint';

export class GetUserAvailibilityDto {
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsEnum(WeekDays, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsOptional()
  @Validate(HasDuplicateValues, {
    message: 'Availibility days contains duplicate days',
  })
  readonly availibilityDays: string;
}
