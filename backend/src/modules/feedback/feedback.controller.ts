import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { FeedbackDTO } from './feedback.dto';

@Controller('feedbacks')
@ApiTags('Feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('add')
  @ApiOperation({ summary: 'Добавление нового отзыва' })
  @ApiResponse({
    status: 200,
    description: 'Новый отзыв успешно добавлен',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @UseGuards(JwtAuthGuard)
  addFeedback(@Body() dto: FeedbackDTO, @Req() request) {
    const userId = request.user.id;
    return this.feedbackService.addFeedback(userId, dto);
  }

  // ------------------------------------------------

  @Get('get')
  @ApiOperation({ summary: 'Получение всех отзывов пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Отзывы успешно получены',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @UseGuards(JwtAuthGuard)
  getFeedback(@Req() request) {
    const userId = request.user.id;
    return this.feedbackService.getFeedback(userId);
  }

  // ------------------------------------------------

  @Delete('delete')
  @ApiOperation({ summary: 'Удаление текущего отзыва' })
  @ApiResponse({
    status: 200,
    description: 'Текущий отзыв успешно удалён',
  })
  @ApiResponse({
    status: 404,
    description: 'Отзыв не найден',
  })
  @UseGuards(JwtAuthGuard)
  deleteFeedback(@Query('id') feedbackId: string, @Req() request) {
    const user = request.user;
    return this.feedbackService.deleteFeedback(user.id, feedbackId);
  }
}
