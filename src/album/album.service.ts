import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateAlbumDto } from './dto/create-album-dto';
import { ErrorMessages } from 'src/constants/error-messages';
import { Track } from 'src/track/track.service';
import { Favorites } from 'src/favorites/favorites.service';
import { mockedAlbums } from 'mocks/album-mocks';
import { mockedFavorites } from 'mocks/favorites-mocks';
import { mockedTracks } from 'mocks/track-mocks';

export type Album = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

const albums: Album[] = mockedAlbums;
const tracks: Track[] = mockedTracks;
const favorites: Favorites = mockedFavorites;

@Injectable()
export class AlbumService {
  async getAllAlbums() {
    return albums;
  }

  async getAlbumById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `albumId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const album = {
      id: uuid.v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };

    albums.push(album);

    return album;
  }

  async updateAlbumInfo(id: string, dto: CreateAlbumDto) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `albumId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;

    return album;
  }

  async deleteAlbumById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `albumId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    albums.splice(index, 1);

    const track = tracks.find((track) => track.albumId === id);

    if (track) {
      track.albumId = null;
    }

    const favoriteIndex = favorites.albums.indexOf(id);

    if (favoriteIndex >= -1) {
      favorites.albums.splice(favoriteIndex, 1);
    }
  }
}
