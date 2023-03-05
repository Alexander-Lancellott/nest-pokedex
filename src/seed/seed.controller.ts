import { Controller, Get, Query } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedDto } from './dto/seed.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed(@Query() seedDto: SeedDto) {
    return this.seedService.executeSeed(seedDto);
  }
}
