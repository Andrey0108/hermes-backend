/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { IsPublic } from '../auth/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Roles('ADMIN', 'GUIDE')
  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({
    status: 200,
    description: 'Reservas obtenidas correctamente.',
  })
  @ApiResponse({ status: 400, description: 'Error al obtener las reservas.' })
  async findAll() {
    try {
      return await this.reservationsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN', 'GUIDE')
  @Get('travelers/:idDate')
  @ApiOperation({
    summary: 'Obtener todos los viajeros para una fecha específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Viajeros obtenidos correctamente.',
  })
  @ApiResponse({ status: 404, description: 'No se encontraron viajeros.' })
  @ApiResponse({ status: 400, description: 'Error al obtener los viajeros.' })
  async findAllTravelers(@Param('idDate') idDate: string) {
    try {
      const travelers =
        await this.reservationsService.findAllTravelers(+idDate);

      if (!travelers || travelers.length === 0) {
        throw new HttpException(
          'No se encontraron viajeros',
          HttpStatus.NOT_FOUND,
        );
      }

      return travelers;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Get('reservations-with-payments')
  @ApiOperation({ summary: 'Obtener todas las reservas con pagos' })
  @ApiResponse({
    status: 200,
    description: 'Reservas con pagos obtenidas correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron reservas con pagos.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al obtener las reservas con pagos.',
  })
  async findAllReservationWithPayments() {
    try {
      const reservation =
        await this.reservationsService.findAllReservationWithPayments();
      if (!reservation || reservation.length === 0) {
        throw new HttpException(
          'No se encontraron reservas con pagos',
          HttpStatus.NOT_FOUND,
        );
      }
      return reservation;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('CLIENT', 'ADMIN')
  @Get('user/:idUser')
  @ApiOperation({ summary: 'Obtener todas las reservas de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Reservas del usuario obtenidas correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al obtener las reservas del usuario.',
  })
  async findAllByUser(@Param('idUser') idUser: string) {
    try {
      return await this.reservationsService.findAllByUser(+idUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Crear una reserva.' })
  @ApiResponse({
    status: 201,
    description: 'Reserva creada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Información de la reserva incorrecta.',
  })
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      const createdReservation =
        await this.reservationsService.create(createReservationDto);

      if (!createdReservation) {
        throw new HttpException(
          'Error al crear la reserva',
          HttpStatus.BAD_REQUEST,
        );
      }

      return createdReservation;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reserva por ID' })
  @ApiResponse({
    status: 200,
    description: 'Reserva actualizada correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  @ApiResponse({ status: 400, description: 'Error al actualizar la reserva.' })
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const updatedReservation = await this.reservationsService.update(
        +id,
        updateReservationDto,
      );

      if (!updatedReservation) {
        throw new HttpException('Reserva no encontrada', HttpStatus.NOT_FOUND);
      }

      return updatedReservation;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id/change-status')
  @ApiOperation({ summary: 'Cambiar el estado de una reserva por ID' })
  @ApiResponse({
    status: 200,
    description: 'Estado de la reserva actualizado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al cambiar el estado de la reserva.',
  })
  async changeStatus(@Param('id') id: string, @Body('status') status: string) {
    try {
      return await this.reservationsService.changeStatus(+id, status);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
