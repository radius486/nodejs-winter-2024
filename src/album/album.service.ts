import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateAlbumDto } from './dto/create-album-dto';
import { mockedAlbums } from 'mocks/album-mocks';

type Album = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

const albums: Album[] = mockedAlbums;

@Injectable()
export class AlbumService {
  async getAllAlbums() {
    return albums;
  }

  async getAlbumById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException("record does't exist", HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    if (!dto.name || !dto.year || dto.artistId === undefined) {
      throw new HttpException(
        "request body does't contain required fields",
        HttpStatus.BAD_REQUEST,
      );
    }

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
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.name || !dto.year || dto.artistId === undefined) {
      throw new HttpException(
        "request body does't contain required fields",
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException("record does't exist", HttpStatus.NOT_FOUND);
    }

    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;

    return album;
  }

  async deleteAlbumById(id: string) {
    if (!uuid.validate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new HttpException("record does't exist", HttpStatus.NOT_FOUND);
    }

    albums.splice(index, 1);
  }
}
