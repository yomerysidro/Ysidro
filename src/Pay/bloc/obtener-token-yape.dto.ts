import { IsNotEmpty, IsString } from 'class-validator';

export class ObtenerTokenYapeDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
