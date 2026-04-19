/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Catalog Service is running correctly';
  }

  getHealth(): object {
    return {
      status: 'ok',
      service: 'catalog-service',
      timestamp: new Date().toISOString(),
    };
  }
}