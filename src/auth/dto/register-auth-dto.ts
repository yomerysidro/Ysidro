import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class registerAuthDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    fechaNacimiento: string;

    @IsOptional()
    @IsString()
    dni: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsOptional()
    rolesIds: string[];
}
