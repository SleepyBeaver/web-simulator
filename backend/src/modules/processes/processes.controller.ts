import { Controller, Get } from '@nestjs/common';

@Controller('processes')
export class ProcessesController {
  @Get()
  getAll() {
    return { message: 'Processes module works' };
  }
}