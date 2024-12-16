import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/constants/error-messages';

export class CreateUserDto {
  @IsNotEmpty({ message: `login ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `login ${ErrorMessages.shouldBeString}` })
  readonly login: string;
  @IsNotEmpty({ message: `password ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `password ${ErrorMessages.shouldBeString}` })
  readonly password: string;
}
