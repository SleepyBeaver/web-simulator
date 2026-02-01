import { Controller, Get } from '@nestjs/common';

@Controller('simulation')
export class SimulationController {
  @Get()
  getAll() {
    return { message: 'Simulation module works' };
  }
}