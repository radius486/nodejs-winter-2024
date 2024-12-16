import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { GetTrackByIdParams } from 'src/track/params/get-track-by-id-params';
import { GetAlbumByIdParams } from 'src/album/params/get-album-by-id-params';
import { GetArtistByIdParams } from 'src/artist/params/get-artist-by-id-params';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAllTracks() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  addTrackToFavorites(@Param() params: GetTrackByIdParams) {
    return this.favoritesService.addTrackToFavorites(params.id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param() params: GetTrackByIdParams) {
    return this.favoritesService.removeTrackFromFavorites(params.id);
  }

  @Post('/album/:id')
  addAlbumToFavorites(@Param() params: GetAlbumByIdParams) {
    return this.favoritesService.addAlbumToFavorites(params.id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param() params: GetAlbumByIdParams) {
    return this.favoritesService.removeAlbumFromFavorites(params.id);
  }

  @Post('/artist/:id')
  addArtistToFavorites(@Param() params: GetArtistByIdParams) {
    return this.favoritesService.addArtistToFavorites(params.id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param() params: GetArtistByIdParams) {
    return this.favoritesService.removeArtistFromFavorites(params.id);
  }
}
