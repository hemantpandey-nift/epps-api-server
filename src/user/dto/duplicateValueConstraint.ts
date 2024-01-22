import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'hasDuplicateValues' })
export class HasDuplicateValues implements ValidatorConstraintInterface {
  validate(data: string): boolean {
    if (!data) return false;
    return Array.from(new Set(data)).length === data.length ? true : false;
  }
}
