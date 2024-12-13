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

import { AlbumService } from './album.service';
import { GetAlbumByIdParams } from './params/get-album-by-id-params';
import { CreateAlbumDto } from './dto/create-album-dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param() params: GetAlbumByIdParams) {
    return this.albumService.getAlbumById(params.id);
  }

  @Post()
  createAlbum(@Body() albumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(albumDto);
  }

  @Put(':id')
  updateAlbumInfo(
    @Body() albumDto: CreateAlbumDto,
    @Param() params: GetAlbumByIdParams,
  ) {
    return this.albumService.updateAlbumInfo(params.id, albumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumById(@Param() params: GetAlbumByIdParams) {
    return this.albumService.deleteAlbumById(params.id);
  }
}
