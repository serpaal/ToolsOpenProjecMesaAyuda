import { Inject, Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { ConnectionError } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../shared/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
    constructor(
        @Inject('SequelizeInstance') 
        private readonly sequelizeInstance,
        private jwtService: JwtService
    ) {}

    public async login(options?: object): Promise<any> {
        try {
            this.sequelizeInstance.connectionManager.config.username = options['username'];
            this.sequelizeInstance.connectionManager.config.password = options['password'];  
            const testConnection = await this.sequelizeInstance.authenticate();
            const payload = {
                username: options['username'],
                guid: CryptoJS.AES.encrypt(options['password'], Config.jwt.secret).toString()
            };    
            const token = this.jwtService.sign(payload);    
            const username =  options['username'];       
            return { username, token };
        } catch (error){
            if(error instanceof ConnectionError)
                throw new HttpException(error['message'], HttpStatus.FORBIDDEN);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
        
    }
   
}
