import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Album } from 'src/album/album.service';
import { Artist } from 'src/artist/artist.service';
import { Track } from 'src/track/track.service';
import { mockedFavorites } from 'mocks/favorites-mocks';
import { mockedArtists } from 'mocks/artist-mocks';
import { mockedAlbums } from 'mocks/album-mocks';
import { mockedTracks } from 'mocks/track-mocks';
import { ErrorMessages } from 'src/constants/error-messages';

export type Favorites = {
  artists: string[];
  albums: string[];
  tracks: string[];
};

type FavoritesResponse = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};

const favorites: Favorites = mockedFavorites;
const artists: Artist[] = mockedArtists;
const albums: Album[] = mockedAlbums;
const tracks: Track[] = mockedTracks;

@Injectable()
export class FavoritesService {
  async getAllFavorites() {
    const response: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    Object.keys(favorites).forEach((key) => {
      return favorites[key].forEach((id: string) => {
        const instance = eval(key).find((instance: any) => instance.id === id);
        response[key].push(instance);
      });
    });

    return response;
  }

  async addTrackToFavorites(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `trackId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (favorites.tracks.includes(id)) {
      throw new HttpException(
        `track ${ErrorMessages.isAlreadyInFavorites}`,
        HttpStatus.CONFLICT,
      );
    }

    favorites.tracks.push(id);

    return track;
  }

  async removeTrackFromFavorites(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `trackId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = favorites.tracks.indexOf(id);

    if (index === -1) {
      throw new HttpException(
        `track ${ErrorMessages.notFoundInFavorites}`,
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.tracks.splice(index, 1);
  }

  async addAlbumToFavorites(id: string) {
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
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (favorites.albums.includes(id)) {
      throw new HttpException(
        `album ${ErrorMessages.isAlreadyInFavorites}`,
        HttpStatus.CONFLICT,
      );
    }

    favorites.albums.push(id);

    return album;
  }

  async removeAlbumFromFavorites(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `albumId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = favorites.albums.indexOf(id);

    if (index === -1) {
      throw new HttpException(
        `album ${ErrorMessages.notFoundInFavorites}`,
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.albums.splice(index, 1);
  }

  async addArtistToFavorites(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `artistId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (favorites.artists.includes(id)) {
      throw new HttpException(
        `artist ${ErrorMessages.isAlreadyInFavorites}`,
        HttpStatus.CONFLICT,
      );
    }

    favorites.artists.push(id);

    return artist;
  }

  async removeArtistFromFavorites(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `artistId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = favorites.artists.indexOf(id);

    if (index === -1) {
      throw new HttpException(
        `artist ${ErrorMessages.notFoundInFavorites}`,
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.artists.splice(index, 1);
  }
}
