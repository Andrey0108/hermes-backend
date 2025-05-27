import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Activity[]> {
    return await this.prisma.activities.findMany();
  }

  async findAllActive(): Promise<Activity[]> {
    return await this.prisma.activities.findMany({
      where: { status: true },
    });
  }

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    return await this.prisma.activities.create({
      data: createActivityDto,
    });
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.prisma.activities.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async changeStatus(id: number) {
    const activity = await this.prisma.activities.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new Error('No se encontro la actividad');
    }

    return this.prisma.activities.update({
      where: {
        id,
      },
      data: {
        status: !activity.status,
      },
    });
  }
}
