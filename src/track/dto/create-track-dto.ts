import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from 'src/constants/error-messages';

export class CreateTrackDto {
  @IsNotEmpty({ message: `name ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `name ${ErrorMessages.shouldBeString}` })
  readonly name: string;
  @IsString({ message: `artistId ${ErrorMessages.shouldBeString}` })
  @IsOptional()
  readonly artistId: string | null;
  @IsString({ message: `albumId ${ErrorMessages.shouldBeString}` })
  @IsOptional()
  readonly albumId: string | null;
  @IsNotEmpty({ message: `duration ${ErrorMessages.shouldNotBeEmpty}` })
  @IsNumber({}, { message: `duration ${ErrorMessages.shouldBeNumber}` })
  readonly duration: number;
}
