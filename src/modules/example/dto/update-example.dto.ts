import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString } from 'class-validator';
import { CreateExampleDto } from './create-example.dto';

export class UpdateExampleDto extends PartialType(CreateExampleDto) {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
