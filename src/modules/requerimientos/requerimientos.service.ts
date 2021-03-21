import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseUtilitiesService } from '../database/database-utilites.serive';
import { IRequerimientos } from './interfaces';
import { IRequerimientosService } from './interfaces/IRequerimientosService';
import { Requerimientos } from './requerimientos.model';

@Injectable()
export class RequerimientosService implements IRequerimientosService {
    constructor(
        @Inject('RequerimientosRepository') private readonly reqRepo: typeof Requerimientos,
        @Inject('SequelizeInstance') private readonly sequelizeInstance,
        private readonly databaseUtilitiesService: DatabaseUtilitiesService
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

    public async setRequerimientosJson(data: any): Promise<any> {
        try {
            return await this.sequelizeInstance
            .query(
                    'SELECT set_requerimientos_from_json(:p_requerimientos_json)',
                    { 
                        replacements: { 
                            p_requerimientos_json: data.requerimientos_json
                        }, 
                        plain: true,
                        raw: true,
                        type: this.sequelizeInstance.QueryTypes.SELECT 
                    }
            )
            .then(data => {
                let response : any = JSON.parse(data.set_requerimientos_from_json);
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

    public async updateRequerimientosJson(data: any): Promise<any> {
        try {
            return await this.sequelizeInstance
            .query(
                    'SELECT update_requerimientos_from_json(:p_requerimientos_json)',
                    { 
                        replacements: { 
                            p_requerimientos_json: data.requerimientos_json
                        }, 
                        plain: true,
                        raw: true,
                        type: this.sequelizeInstance.QueryTypes.SELECT 
                    }
            )
            .then(data => {
                let response : any = JSON.parse(data.update_requerimientos_from_json);
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

    public async create(requerimiento: IRequerimientos): Promise<any> {
        try {
            return await this.sequelizeInstance
            .query(
                `SELECT set_requerimiento(
                    :p_id,
                    :p_nro_req,
                    :p_fecha_sol,
                    :p_nomb_comp,
                    :p_descrip_req,
                    :p_justific,
                    :p_cod_u_rbl,
                    :p_observ,
                    :p_arch_adj,
                    :p_estado,
                    :p_open_project_id,
                    :p_open_project_title,
                    :p_open_project_status, 
                    :p_open_project_percentage_done, 
                    :p_open_project_assignee, 
                    :p_open_project_responsible, 
                    :p_open_project_priority, 
                    :p_username
                )`,
                { 
                    replacements: { 
                        p_id: requerimiento.id,
                        p_nro_req: requerimiento.nro_req,
                        p_fecha_sol: requerimiento.fecha_sol,
                        p_nomb_comp: requerimiento.nomb_comp,
                        p_descrip_req: requerimiento.descrip_req,
                        p_justific: requerimiento.justific,
                        p_cod_u_rbl: requerimiento.cod_u_rbl,
                        p_observ: requerimiento.observ,
                        p_arch_adj: requerimiento.arch_adj,
                        p_estado: requerimiento.estado,
                        p_open_project_id: requerimiento.open_project_id.toString(),
                        p_open_project_title: requerimiento.open_project_title,
                        p_open_project_status: requerimiento.open_project_status,
                        p_open_project_percentage_done: requerimiento.open_project_percentage_done, 
                        p_open_project_assignee: requerimiento.open_project_assignee, 
                        p_open_project_responsible: requerimiento.open_project_responsible,  
                        p_open_project_priority: requerimiento.open_project_priority,
                        p_username: requerimiento.username 
                    }, 
                    plain: true,
                    raw: true,
                    type: this.sequelizeInstance.QueryTypes.SELECT 
                }
            )
            .then(data => {
                let response : any = JSON.parse(data.set_requerimiento);
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

    public async update(id: number, newValue: IRequerimientos): Promise<any | null> {
        try {
            return await this.sequelizeInstance.transaction(async transaction => {
                let requerimiento = await this.reqRepo.findByPk<Requerimientos>(id, {
                    transaction
                });
                if (!requerimiento) throw new HttpException('El requerimiento no existe', HttpStatus.NOT_FOUND);
    
                requerimiento = this.databaseUtilitiesService.assign(requerimiento, newValue);
                return await this.create(requerimiento);
            });
        }  catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }    
    }
   
} 
