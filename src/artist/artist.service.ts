import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateArtistDto } from './dto/create-artist-dto';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { Album } from 'src/album/album.service';
import { Track } from 'src/track/track.service';
import { Favorites } from 'src/favorites/favorites.service';
import { mockedArtists } from 'mocks/artist-mocks';
import { mockedAlbums } from 'mocks/album-mocks';
import { mockedTracks } from 'mocks/track-mocks';
import { mockedFavorites } from 'mocks/favorites-mocks';

export type Artist = {
  id: string;
  name: string;
  grammy: boolean;
};

const artists: Artist[] = mockedArtists;
const albums: Album[] = mockedAlbums;
const tracks: Track[] = mockedTracks;
const favorites: Favorites = mockedFavorites;

@Injectable()
export class ArtistService {
  async getAllArtists() {
    return artists;
  }

  async getArtistById(id: string) {
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
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    const artist = {
      id: uuid.v4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    artists.push(artist);

    return artist;
  }

  async updateArtistInfo(id: string, dto: CreateArtistDto) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `artistId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.getArtistById(id);

    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return artist;
  }

  async deleteArtistById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `artistId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    artists.splice(index, 1);

    const track = tracks.find((track) => track.artistId === id);

    if (track) {
      track.artistId = null;
    }

    const album = albums.find((album) => album.artistId === id);

    if (album) {
      album.artistId = null;
    }

    const favoriteIndex = favorites.artists.indexOf(id);

    if (favoriteIndex >= -1) {
      favorites.artists.splice(favoriteIndex, 1);
    }
  }
}
