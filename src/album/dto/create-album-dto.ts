import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ErrorMessages } from 'src/constants/error-messages';

export class CreateAlbumDto {
  @IsNotEmpty({ message: `name ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `name ${ErrorMessages.shouldBeString}` })
  readonly name: string;
  @IsNotEmpty({ message: `year ${ErrorMessages.shouldNotBeEmpty}` })
  @IsNumber({}, { message: `year ${ErrorMessages.shouldBeNumber}` })
  readonly year: number;
  @IsString({ message: `artistId ${ErrorMessages.shouldBeString}` })
  @IsOptional()
  readonly artistId: string | null;
}
