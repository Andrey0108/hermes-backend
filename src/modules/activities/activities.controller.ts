/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Actividades')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Obtener todas las actividades' })
  @ApiResponse({ status: 200, description: 'Devuelve todas las actividades.' })
  @ApiResponse({ status: 404, description: 'No se encontraron actividades.' })
  async findAll(): Promise<Activity[]> {
    try {
      const activitiesFound = await this.activitiesService.findAll();

      if (!activitiesFound || activitiesFound.length === 0) {
        throw new HttpException(
          'No se encontraron actividades.',
          HttpStatus.NOT_FOUND,
        );
      }

      return activitiesFound;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener las actividades.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles('ADMIN')
  @Get('active')
  @ApiOperation({ summary: 'Obtener todas las actividades activas' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todas las actividades con estado activo.',
  })
  @ApiResponse({ status: 404, description: 'No se encontraron actividades.' })
  async findAllActive(): Promise<Activity[]> {
    try {
      const activitiesFound = await this.activitiesService.findAllActive();

      if (!activitiesFound || activitiesFound.length === 0) {
        throw new HttpException(
          'No se encontraron actividades.',
          HttpStatus.NOT_FOUND,
        );
      }

      return activitiesFound;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener las actividades activas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Crear una nueva actividad' })
  @ApiResponse({
    status: 201,
    description: 'La actividad ha sido creada exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    try {
      const createdActivity: Activity =
        await this.activitiesService.create(createActivityDto);

      if (!createdActivity) {
        throw new HttpException(
          'No se pudo crear la actividad.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return createdActivity;
    } catch (error) {
      throw new HttpException(
        error.message || 'Datos de entrada inválidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una actividad por ID' })
  @ApiResponse({
    status: 200,
    description: 'La actividad ha sido actualizada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    try {
      const updatedActivity: Activity = await this.activitiesService.update(
        +id,
        updateActivityDto,
      );

      if (!updatedActivity) {
        throw new HttpException(
          'Actividad no encontrada.',
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedActivity;
    } catch (error) {
      throw new HttpException(
        error.message || 'Datos de entrada inválidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id/change-status')
  @ApiOperation({ summary: 'Cambiar el estado de una actividad por ID' })
  @ApiResponse({
    status: 200,
    description: 'El estado de la actividad ha sido cambiado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async changeStatus(@Param('id') id: string): Promise<Activity> {
    try {
      const updatedActivity: Activity =
        await this.activitiesService.changeStatus(+id);

      if (!updatedActivity) {
        throw new HttpException(
          'Actividad no encontrada.',
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedActivity;
    } catch (error) {
      throw new HttpException(
        error.message || 'Datos de entrada inválidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
