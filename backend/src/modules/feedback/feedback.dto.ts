import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FeedbackDTO {
  @ApiProperty({ example: 123, description: 'ID товара' })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: '2025-06-20', description: 'Дата отзыва' })
  @IsString()
  date: string;

  @ApiProperty({ example: '14:30', description: 'Время отзыва' })
  @IsString()
  time: string;

  @ApiProperty({ example: '5', description: 'Оценка от 1 до 5' })
  @IsString()
  rating: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsString()
  feedbackEmail: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString()
  feedbackName: string;

  @ApiProperty({ example: 'Отличный товар!', description: 'Сам отзыв' })
  @IsString()
  feedbackMessage: string;
}
