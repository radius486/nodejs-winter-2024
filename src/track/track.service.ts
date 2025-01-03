import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTrackDto } from './dto/create-track-dto';
import { ErrorMessages } from 'src/constants/error-messages';
import { Favorites } from 'src/favorites/favorites.service';
import { mockedTracks } from 'mocks/track-mocks';
import { mockedFavorites } from 'mocks/favorites-mocks';

export type Track = {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

const tracks: Track[] = mockedTracks;
const favorites: Favorites = mockedFavorites;

@Injectable()
export class TrackService {
  async getAllTracks() {
    return tracks;
  }

  async getTrackById(id: string) {
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
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async createTrack(dto: CreateTrackDto) {
    const track = {
      id: uuid.v4(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    };

    tracks.push(track);

    return track;
  }

  async updateTrackInfo(id: string, dto: CreateTrackDto) {
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
        HttpStatus.NOT_FOUND,
      );
    }

    track.name = dto.name;
    track.duration = dto.duration;
    track.albumId = dto.albumId;
    track.artistId = dto.artistId;

    return track;
  }

  async deleteTrackById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        `trackId ${ErrorMessages.isNotUuid}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    tracks.splice(index, 1);

    const favoriteIndex = favorites.tracks.indexOf(id);

    if (favoriteIndex >= -1) {
      favorites.tracks.splice(favoriteIndex, 1);
    }
  }
}
