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

import { ArtistService } from './artist.service';
import { GetArtistByIdParams } from './params/get-artist-by-id-params';
import { CreateArtistDto } from './dto/create-artist-dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param() params: GetArtistByIdParams) {
    return this.artistService.getArtistById(params.id);
  }

  @Post()
  createArtist(@Body() artistDto: CreateArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @Put(':id')
  updateArtistInfo(
    @Body() artistDto: CreateArtistDto,
    @Param() params: GetArtistByIdParams,
  ) {
    return this.artistService.updateArtistInfo(params.id, artistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistById(@Param() params: GetArtistByIdParams) {
    return this.artistService.deleteArtistById(params.id);
  }
}
