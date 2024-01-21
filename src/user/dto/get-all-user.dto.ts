import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortOrder, UserSortBy } from '../constants/constants';
import { Transform } from 'class-transformer';

export class GetAllUsersDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsEnum(UserSortBy)
  @IsOptional()
  readonly sortBy: string;

  @IsEnum(SortOrder)
  @IsOptional()
  readonly order: string;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsOptional()
  readonly page: string;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(100)
  @IsOptional()
  readonly limit: string;
}
