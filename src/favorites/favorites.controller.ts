import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { GetTrackByIdParams } from 'src/track/params/get-track-by-id-params';
import { GetAlbumByIdParams } from 'src/album/params/get-album-by-id-params';
import { GetArtistByIdParams } from 'src/artist/params/get-artist-by-id-params';

import {
  albumExample,
  artistExample,
  favoritesExample,
  trackExample,
} from 'src/examples/open-api-examples';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, example: favoritesExample })
  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @ApiOperation({ summary: 'Add track to favorites by id' })
  @ApiParam({ name: 'id', example: '66b3d77f-6238-4f2d-ba6f-b3697e03b5aa' })
  @ApiResponse({ status: 201, example: trackExample })
  @Post('/track/:id')
  addTrackToFavorites(@Param() params: GetTrackByIdParams) {
    return this.favoritesService.addTrackToFavorites(params.id);
  }

  @ApiOperation({ summary: 'Remove track from favorites by id' })
  @ApiParam({ name: 'id', example: '283f7740-15b9-48af-b8d1-aa9dc39af8af' })
  @ApiResponse({ status: 204 })
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param() params: GetTrackByIdParams) {
    return this.favoritesService.removeTrackFromFavorites(params.id);
  }

  @ApiOperation({ summary: 'Add album to favorites by id' })
  @ApiParam({ name: 'id', example: '0b7f1be2-cd52-4643-8aef-8740b221dc81' })
  @ApiResponse({ status: 201, example: albumExample })
  @Post('/album/:id')
  addAlbumToFavorites(@Param() params: GetAlbumByIdParams) {
    return this.favoritesService.addAlbumToFavorites(params.id);
  }

  @ApiOperation({ summary: 'Remove album from favorites by id' })
  @ApiParam({ name: 'id', example: '0b7f1be2-cd52-4643-8aef-8740b221dc81' })
  @ApiResponse({ status: 204 })
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param() params: GetAlbumByIdParams) {
    return this.favoritesService.removeAlbumFromFavorites(params.id);
  }

  @ApiOperation({ summary: 'Add artist to favorites by id' })
  @ApiParam({ name: 'id', example: '3f215d85-81f9-4a2b-842f-5ce418ff3006' })
  @ApiResponse({ status: 201, example: artistExample })
  @Post('/artist/:id')
  addArtistToFavorites(@Param() params: GetArtistByIdParams) {
    return this.favoritesService.addArtistToFavorites(params.id);
  }

  @ApiOperation({ summary: 'Remove artist from favorites by id' })
  @ApiParam({ name: 'id', example: '3f215d85-81f9-4a2b-842f-5ce418ff3006' })
  @ApiResponse({ status: 204 })
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param() params: GetArtistByIdParams) {
    return this.favoritesService.removeArtistFromFavorites(params.id);
  }
}
