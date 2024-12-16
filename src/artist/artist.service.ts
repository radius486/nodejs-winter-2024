import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateArtistDto } from './dto/create-artist-dto';
import { mockedArtists } from 'mocks/artist-mocks';
import { ErrorMessages } from 'src/constants/error-messages';

export type Artist = {
  id: string;
  name: string;
  grammy: boolean;
};

const artists: Artist[] = mockedArtists;

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

    const artist = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

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
  }
}
