import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { MembershipDto } from './membership.dto';
import { IMembership } from '../interfaces/membership.interface';

export class CreateUsertDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  @Max(60)
  readonly age: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(30)
  @Max(150)
  readonly weight: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MembershipDto)
  userMembership: IMembership;
}
