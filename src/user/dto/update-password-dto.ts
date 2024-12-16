import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/constants/error-messages';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: `oldPassword ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `oldPassword ${ErrorMessages.shouldBeString}` })
  readonly oldPassword: string;
  @IsNotEmpty({ message: `newPassword ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `newPassword ${ErrorMessages.shouldBeString}` })
  readonly newPassword: string;
}
