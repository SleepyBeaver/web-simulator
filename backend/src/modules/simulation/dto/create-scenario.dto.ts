import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateScenarioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  config: any;
}
