import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginUserDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль' })
  @IsString()
  password: string;
}

export class GetUserDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта',
  })
  @IsEmail()
  email: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  userName: string;
}

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}

export class DeleteUserResponseDto {
  @ApiProperty({ example: 'Пользователь успешно удалён' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;
}
