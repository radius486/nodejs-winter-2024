import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mockedArtists } from 'mocks/artist-mocks';
import * as uuid from 'uuid';
import { CreateArtistDto } from './dto/create-artist-dto';

type Artist = {
  id: string;
  name: string;
  grammy: boolean;
};

const artists: Artist[] = mockedArtists;

function isBoolean(value: unknown) {
  return typeof value === 'boolean';
}

@Injectable()
export class ArtistService {
  async getAllArtists() {
    return artists;
  }

  async getArtistById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException("record does't exist", HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    if (!dto.name || !isBoolean(dto.grammy)) {
      throw new HttpException(
        "request body does't contain required fields",
        HttpStatus.BAD_REQUEST,
      );
    }

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
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.name || !isBoolean(dto.grammy)) {
      throw new HttpException(
        "request body does't contain required fields",
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException("record does't exist", HttpStatus.NOT_FOUND);
    }

    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return artist;
  }

  async deleteArtistById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new HttpException("record does't exist", HttpStatus.NOT_FOUND);
    }

    artists.splice(index, 1);
  }
}
