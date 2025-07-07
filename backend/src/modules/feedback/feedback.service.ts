import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FeedbackDTO } from './feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async addFeedback(userId: number, dto: FeedbackDTO) {
    const existsUser = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existsUser) {
      throw new NotFoundException('Пользователь не найден');
    }
    await this.prisma.feedbacks.create({
      data: {
        productId: dto.productId,
        date: dto.date,
        time: dto.time,
        rating: dto.rating,
        feedbackEmail: dto.feedbackEmail,
        feedbackName: dto.feedbackName,
        feedbackMessage: dto.feedbackMessage,
        userId: existsUser.id,
      },
    });
    return {
      message: 'Отзыв успешно добавлен',
    };
  }

  async getFeedback(userId: number) {
    const feedbacks = await this.prisma.feedbacks.findMany({
      where: { userId },
    });
    return {
      message: 'Все отзывы успешно получены',
      data: { feedbacks },
    };
  }

  async deleteFeedback(userId: number, feedbackId: string) {
    const feedback = await this.prisma.feedbacks.findUnique({
      where: {
        id: Number(feedbackId),
      },
    });
    if (!feedback) {
      throw new NotFoundException('Отзыв не найден');
    }
    if (feedback.userId !== userId) {
      throw new ForbiddenException('Отзыв принадлежит другому пользователю');
    }
    await this.prisma.feedbacks.delete({
      where: {
        id: Number(feedbackId),
      },
    });
    return {
      message: 'Отзыв успешно удалён',
      success: true,
    };
  }
}
