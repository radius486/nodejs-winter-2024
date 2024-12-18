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

import { AlbumService } from './album.service';
import { GetAlbumByIdParams } from './params/get-album-by-id-params';
import { CreateAlbumDto } from './dto/create-album-dto';
import { albumExample } from 'src/examples/open-api-examples';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, example: [albumExample] })
  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @ApiParam({ name: 'id', example: '495b9ffb-687b-401a-9b10-a1a764e9deca' })
  @ApiResponse({ status: 200, example: albumExample })
  @Get(':id')
  getAlbumById(@Param() params: GetAlbumByIdParams) {
    return this.albumService.getAlbumById(params.id);
  }

  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({ status: 201, example: albumExample })
  @Post()
  createAlbum(@Body() albumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(albumDto);
  }

  @ApiOperation({ summary: 'Edit existing album by id' })
  @ApiParam({ name: 'id', example: '495b9ffb-687b-401a-9b10-a1a764e9deca' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'year'],
      properties: {
        name: { type: 'string', example: 'Album 1.1' },
        year: { type: 'number', example: 2024 },
        artistId: {
          type: 'string | null',
          example: '8f86d9c4-b057-47d2-aaf7-66c9945877e6',
        },
      },
    },
  })
  @ApiResponse({ status: 200, example: albumExample })
  @Put(':id')
  updateAlbumInfo(
    @Body() albumDto: CreateAlbumDto,
    @Param() params: GetAlbumByIdParams,
  ) {
    return this.albumService.updateAlbumInfo(params.id, albumDto);
  }

  @ApiOperation({ summary: 'Remove existing album by id' })
  @ApiParam({ name: 'id', example: '0b7f1be2-cd52-4643-8aef-8740b221dc81' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumById(@Param() params: GetAlbumByIdParams) {
    return this.albumService.deleteAlbumById(params.id);
  }
}
