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
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Package } from './entities/package.entity';
import { IsPublic } from '../auth/decorators/public.decorator';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los paquetes' })
  @ApiResponse({
    status: 200,
    description: 'Paquetes obtenidos correctamente.',
  })
  @ApiResponse({ status: 404, description: 'No se encontraron paquetes.' })
  async findAll(): Promise<Package[]> {
    const packagesFound = await this.packagesService.findAll();

    if (!packagesFound || packagesFound.length === 0) {
      throw new HttpException(
        'No se encontraron paquetes',
        HttpStatus.NOT_FOUND,
      );
    }

    return packagesFound;
  }

  @Roles('ADMIN')
  @Get('active')
  @ApiOperation({ summary: 'Obtener todos los paquetes activos' })
  @ApiResponse({
    status: 200,
    description: 'Paquetes activos obtenidos correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron paquetes activos.',
  })
  async findAllActive(): Promise<Package[]> {
    const packagesFound = await this.packagesService.findAllActive();

    if (!packagesFound || packagesFound.length === 0) {
      throw new HttpException(
        'No se encontraron paquetes activos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return packagesFound;
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Crear un paquete' })
  @ApiResponse({
    status: 201,
    description: 'Paquete creado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Información del paquete incorrecta.',
  })
  async create(@Body() createPackageDto: CreatePackageDto): Promise<Package> {
    try {
      const createdPackage =
        await this.packagesService.create(createPackageDto);

      if (!createdPackage) {
        throw new HttpException(
          'No se pudo crear el paquete',
          HttpStatus.BAD_REQUEST,
        );
      }

      return createdPackage;
    } catch (error) {
      throw new HttpException(
        error.message || 'Información del paquete incorrecta',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un paquete por ID' })
  @ApiResponse({
    status: 200,
    description: 'Paquete actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado.' })
  @ApiResponse({ status: 400, description: 'Error al actualizar el paquete.' })
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    try {
      const updatedPackage = await this.packagesService.update(
        +id,
        updatePackageDto,
      );

      if (!updatedPackage) {
        throw new HttpException('Paquete no encontrado', HttpStatus.NOT_FOUND);
      }

      return updatedPackage;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar el paquete',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id/change-status')
  @ApiOperation({ summary: 'Cambiar el estado de un paquete por ID' })
  @ApiResponse({
    status: 200,
    description: 'Estado del paquete actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado.' })
  @ApiResponse({
    status: 400,
    description: 'Error al cambiar el estado del paquete.',
  })
  async changeStatus(@Param('id') id: string): Promise<Package> {
    try {
      const updatedStatus = await this.packagesService.changeStatus(+id);

      if (!updatedStatus) {
        throw new HttpException('Paquete no encontrado', HttpStatus.NOT_FOUND);
      }

      return updatedStatus;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al cambiar el estado del paquete',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
