/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  async getProduct(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() dto: CreateProductDto) {
    return await this.service.create(dto);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validar producto y stock' })
  @ApiResponse({ status: 200, description: 'Producto válido' })
  @ApiResponse({ status: 400, description: 'Stock insuficiente o producto inválido' })
  @ApiBody({
    schema: {
      example: {
        id: 'uuid-del-producto',
        quantity: 2,
      },
    },
  })
  async validateProduct(@Body() body: { id: string; quantity: number }) {
    return await this.service.validateAndGetProduct(body.id, body.quantity);
  }

  @Post('decrease-stock')
  @ApiOperation({ summary: 'Disminuir stock del producto' })
  @ApiResponse({ status: 200, description: 'Stock actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Stock insuficiente' })
  @ApiBody({
    schema: {
      example: {
        id: 'uuid-del-producto',
        quantity: 2,
      },
    },
  })
  async decreaseStock(@Body() body: { id: string; quantity: number }) {
    return await this.service.decreaseStock(body.id, body.quantity);
  }
}