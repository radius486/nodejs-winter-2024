import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TrackService } from './track.service';
import { GetTrackByIdParams } from './params/get-track-by-id-params';
import { CreateTrackDto } from './dto/create-track-dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param() params: GetTrackByIdParams) {
    return this.trackService.getTrackById(params.id);
  }

  @Post()
  createTrack(@Body() trackDto: CreateTrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @Put(':id')
  updateTrackInfo(
    @Body() trackDto: CreateTrackDto,
    @Param() params: GetTrackByIdParams,
  ) {
    return this.trackService.updateTrackInfo(params.id, trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackById(@Param() params: GetTrackByIdParams) {
    return this.trackService.deleteTrackById(params.id);
  }
}
