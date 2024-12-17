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

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { GetArtistByIdParams } from './params/get-artist-by-id-params';
import { CreateArtistDto } from './dto/create-artist-dto';

const artistExample = {
  id: '8f86d9c4-b057-47d2-aaf7-66c9945877e6',
  name: 'Artist 1',
  grammy: true,
};

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, example: [artistExample] })
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ApiParam({ name: 'id', example: '8f86d9c4-b057-47d2-aaf7-66c9945877e6' })
  @ApiResponse({ status: 200, example: artistExample })
  @Get(':id')
  getArtistById(@Param() params: GetArtistByIdParams) {
    return this.artistService.getArtistById(params.id);
  }

  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({ status: 201, example: artistExample })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'grammy'],
      properties: {
        name: { type: 'string', example: 'Artist 4' },
        grammy: { type: 'string', example: true },
      },
    },
  })
  @Post()
  createArtist(@Body() artistDto: CreateArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @ApiOperation({ summary: 'Update existing artist by id' })
  @ApiParam({ name: 'id', example: '8f86d9c4-b057-47d2-aaf7-66c9945877e6' })
  @ApiResponse({ status: 200, example: artistExample })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'grammy'],
      properties: {
        name: { type: 'string', example: 'Artist 4.1' },
        grammy: { type: 'string', example: true },
      },
    },
  })
  @Put(':id')
  updateArtistInfo(
    @Body() artistDto: CreateArtistDto,
    @Param() params: GetArtistByIdParams,
  ) {
    return this.artistService.updateArtistInfo(params.id, artistDto);
  }

  @ApiOperation({ summary: 'Remove existing artist by id' })
  @ApiParam({ name: 'id', example: '3f215d85-81f9-4a2b-842f-5ce418ff3006' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistById(@Param() params: GetArtistByIdParams) {
    return this.artistService.deleteArtistById(params.id);
  }
}
