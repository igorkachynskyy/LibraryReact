import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateDto } from './authenticate.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
@Controller('auth')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post()
  @ApiTags('Login')
  async login(@Res() res: Response, @Body() authenticateDto: AuthenticateDto) {
    try {
      const response = await this.authenticateService.authenticate(
        authenticateDto,
      );
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }
}
