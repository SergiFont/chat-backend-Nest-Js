import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Execute seed', type: String })
  @ApiResponse({ status: 403, description: 'Forbidden. Not valid role' })
  executeSeed() {
    return this.seedService.runSeed();
  }
}
