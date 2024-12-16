import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/constants/error-messages';

export class CreateArtistDto {
  @IsNotEmpty({ message: `name ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `name ${ErrorMessages.shouldBeString}` })
  readonly name: string;
  @IsNotEmpty({ message: `grammy ${ErrorMessages.shouldNotBeEmpty}` })
  @IsBoolean({ message: `grammy ${ErrorMessages.shouldBeABoolean}` })
  readonly grammy: boolean;
}
