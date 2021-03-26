import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseUtilitiesService } from '../database/database-utilites.serive';
import { IIncidentes } from './interfaces';
import { IIncidentesService } from './interfaces/IIncidentesService';
import { Incidentes } from './incidentes.model';

@Injectable()
export class IncidentesService implements IIncidentesService {
    constructor(
        @Inject('IncidentesRepository') private readonly incidenteRepo: typeof Incidentes,
        @Inject('SequelizeInstance') private readonly sequelizeInstance,
        private readonly databaseUtilitiesService: DatabaseUtilitiesService
    ) {}
    
    public async findAll(options?: object): Promise<Array<Incidentes>> {
        try {
            return await this.incidenteRepo.findAll<Incidentes>(options);
        }  catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }  
    }

    public async setIncidentesJson(data: any): Promise<any> {
        try {
            return await this.sequelizeInstance
            .query(
                    'SELECT set_incidentes_from_json(:p_incidentes_json)',
                    { 
                        replacements: { 
                            p_incidentes_json: data.incidentes_json
                        }, 
                        plain: true,
                        raw: true,
                        type: this.sequelizeInstance.QueryTypes.SELECT 
                    }
            )
            .then(data => {
                let response : any = JSON.parse(data.set_incidentes_from_json);
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

    public async updateIncidentesJson(data: any): Promise<any> {
        try {
            return await this.sequelizeInstance
            .query(
                    'SELECT update_incidentes_from_json(:p_incidentes_json)',
                    { 
                        replacements: { 
                            p_incidentes_json: data.incidentes_json
                        }, 
                        plain: true,
                        raw: true,
                        type: this.sequelizeInstance.QueryTypes.SELECT 
                    }
            )
            .then(data => {
                let response : any = JSON.parse(data.update_incidentes_from_json);
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

    public async create(incidente: IIncidentes): Promise<any> {
        try {
            return await this.sequelizeInstance
            .query(
                `SELECT set_incidente(
                    :p_id,
                    :p_nro_inc,
                    :p_fecha_sol,
                    :p_nomb_comp,
                    :p_arch_adj,
                    :p_observ,
                    :p_descrip,
                    :p_cod_u_rbl,
                    :p_estado,
                    :p_open_project_id,
                    :p_open_project_identifier,
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
                        p_id: incidente.id,
                        p_nro_inc: incidente.nro_inc,
                        p_fecha_sol: incidente.fecha_sol,
                        p_nomb_comp: incidente.nomb_comp,
                        p_arch_adj: incidente.arch_adj,
                        p_observ: incidente.observ,
                        p_descrip: incidente.descrip,
                        p_cod_u_rbl: incidente.cod_u_rbl,
                        p_estado: incidente.estado,
                        p_open_project_id: incidente.open_project_id.toString(),
                        p_open_project_identifier: incidente.open_project_identifier,
                        p_open_project_title: incidente.open_project_title,
                        p_open_project_status: incidente.open_project_status,
                        p_open_project_percentage_done: incidente.open_project_percentage_done, 
                        p_open_project_assignee: incidente.open_project_assignee, 
                        p_open_project_responsible: incidente.open_project_responsible,  
                        p_open_project_priority: incidente.open_project_priority,  
                        p_username: incidente.username 
                    }, 
                    plain: true,
                    raw: true,
                    type: this.sequelizeInstance.QueryTypes.SELECT 
                }
            )
            .then(data => {
                let response : any = JSON.parse(data.set_incidente);
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

    public async update(id: number, newValue: IIncidentes): Promise<any | null> {
        try {
            return await this.sequelizeInstance.transaction(async transaction => {
                let incidente = await this.incidenteRepo.findByPk<Incidentes>(id, {
                    transaction
                });
                if (!incidente) throw new HttpException('El requerimiento no existe', HttpStatus.NOT_FOUND);
    
                incidente = this.databaseUtilitiesService.assign(incidente, newValue);
                return await this.create(incidente);
            });
        }  catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }    
    }
   
} 
