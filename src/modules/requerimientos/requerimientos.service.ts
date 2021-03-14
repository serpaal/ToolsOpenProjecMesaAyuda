import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IRequerimientosService } from './interfaces/IRequerimientosService';
import { Requerimientos } from './requerimientos.model';

@Injectable()
export class RequerimientosService implements IRequerimientosService {
    constructor(
        @Inject('RequerimientosRepository') private readonly reqRepo: typeof Requerimientos,
        @Inject('SequelizeInstance') private readonly sequelizeInstance
    ) {}

    /*public async findAndCountAll(options?: any, pagination?:any, order?: any): Promise<any> {
        try {
           const _limit: number = pagination.limit; 
           const _offset: number = pagination.offset;
           const _order: any = order;  
           return  await this.reqRepo.findAndCountAll<Requerimientos>({
                where: options,
                limit: _limit,
                offset: _offset,
                order: _order    
            });
        }  catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }       
    }*/

    public async findAll(options?: object): Promise<Array<Requerimientos>> {
        try {
            return await this.reqRepo.findAll<Requerimientos>(options);
        }  catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }  
    }

     public async setRequerimientosJson(requerimientos_json: string): Promise<any> {
        try {
            return await this.sequelizeInstance
            .query(
                    'SELECT set_requerimientos_from_json(:p_requerimientos_json)',
                    { 
                        replacements: { 
                            p_requerimientos_json: requerimientos_json
                        }, 
                        plain: true,
                        raw: true,
                        type: this.sequelizeInstance.QueryTypes.SELECT 
                    }
            )
            .then(data => {
                let response : any = JSON.parse(data.set_role);
                if(response.hasOwnProperty('error'))
                    throw new HttpException(response.error, HttpStatus.BAD_REQUEST)
                return response;
            })
            .catch(error => {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            });    
        } catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }        
    }
   
} 
