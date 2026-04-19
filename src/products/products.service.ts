/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const product = await this.productRepository.create({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
      });

      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findById(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Producto no existe');
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'Error al obtener el producto',
      );
    }
  }

  async validateAndGetProduct(id: string, quantity: number) {
    try {
      const product = await this.findById(id);

      if (product.stock < quantity) {
        throw new BadRequestException('Stock insuficiente');
      }

      return product;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error al validar el producto',
      );
    }
  }

  async decreaseStock(id: string, quantity: number) {
    try {
      const product = await this.findById(id);

      if (!product) {
        throw new NotFoundException('producto no encontrado');
      }  
      if (product.stock < quantity) {
        throw new BadRequestException('Stock insuficiente');
      }

      product.stock -= quantity;

      const updatedProduct = await this.productRepository.save(product);

      if (!updatedProduct) {
        throw new NotFoundException('Producto no encontrado');
      }
      
      return updatedProduct;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error al actualizar el stock',
      );
    }
  }
}