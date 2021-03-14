import {Controller, Get, Post, HttpStatus, Res, Body, Param, UseFilters } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) {} 

    @Post('login')
    public async login(@Body() body, @Res() res) {
        const token = await this.authService.login(body);
        res.status(HttpStatus.ACCEPTED).json(token);
    }
}
