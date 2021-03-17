import { Controller, Get, Post, Put, HttpStatus, Req, Res, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IncidentesService } from './incidentes.service';
import { Where } from '../../shared/decorators/where.decorator';
import { INCIDENTES_MODEL_FILTER_PROPERTIES } from '../../shared/utils/constants';
import { SetIncidentesRequest } from './request/set-incidentes.request';
import { UpdateIncidenteRequest } from './request/update-incidente.request';
import { UpdateIncidentesRequest } from './request/update-incidentes.request';

@Controller('incidentes')
export class IncidentesController {
    constructor(private readonly incidentesService: IncidentesService) {}

    @Get('/')
    @ApiOperation({
        description: 'Recupera todos los incidentes con los parametros especificos'
    })
    @ApiResponse({
        status: 200,
        description: 'Todos los incidentes asociados a los parametros especificados',
        isArray: true 
    })
    public async index(@Where(INCIDENTES_MODEL_FILTER_PROPERTIES) _where:any,  @Res() res) {
        const incidentes = await this.incidentesService.findAll({where: _where, order: [['fecha_sol','DESC']] });
        return res.status(HttpStatus.OK).json(incidentes);
    }    

    @Post('/set_incidentes_json')
    @ApiOperation({
        description: 'Crear Incidentes desde JSON'
    })
    @ApiBody({
        description:
            'The request body should contain a schema that holds the content for the new incidentes',
        type: SetIncidentesRequest,
        required: true
    })
    @ApiResponse({
        status: 201,
        description:
            'Indicates the new role was successfully saved. The response body will be the news requerimientos.'
    })
    public async create(@Body() setIncidentesRequest:SetIncidentesRequest, @Res() res) {
        //const reque = `[{"nro_req":"R9904","fecha_sol":"2014-09-16T08:42:50","cod_usr":"ROJE01","cod_vinc":"E","cod_area":"1700300","proyecto":"","cod_u_rbl":"VBUS01","fecha_cierre":"2014-10-30T20:39:18.617","cod_u_rcp":null,"observ":null,"arch_adj":"-","estado":"Z","descrip_req":"A-SISMAN","justific":"CUANDO SE GENERA","nomb_comp":"OJEDA MEDINA RONALD"}]`;

        if (!setIncidentesRequest || (setIncidentesRequest && Object.keys(setIncidentesRequest).length === 0))
            return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');
        const response = await this.incidentesService.setIncidentesJson(setIncidentesRequest);
        return res.status(HttpStatus.CREATED).json(response);
    }

    @Post('/update_incidentes_json')
    @ApiOperation({
        description: 'Actualizar Requerimientos desde JSON'
    })
    @ApiBody({
        description:
            'The request body should contain a schema that holds the content for the requerimientos',
        type: UpdateIncidentesRequest,
        required: true
    })
    @ApiResponse({
        status: 201,
        description:
            'Indicates the new role was successfully saved. The response body will be the news requerimientos.'
    })
    public async updateFromJson(@Body() updateIncidentesRequest:UpdateIncidentesRequest, @Res() res) {
        if (!updateIncidentesRequest || (updateIncidentesRequest && Object.keys(updateIncidentesRequest).length === 0))
            return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');
        const response = await this.incidentesService.updateIncidentesJson(updateIncidentesRequest);
        return res.status(HttpStatus.CREATED).json(response);
    }

    @Put('/:id')
    @ApiOperation({
        description: 'Update the specific incidente'
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the incidente',
        required: true,
        type: 'number'
    })
    @ApiBody({
        description:
            'The request body should contain a schema that holds the content for the incidente',
        type: UpdateIncidenteRequest,
        required: true
    })
    @ApiResponse({
        status: 201,
        description:
            'Indicates the incidente was successfully updated. The response body will be incidente updated.'
    })
    public async update( @Param('id') incidenteId: number, @Body() updateIncidenteRequest:UpdateIncidenteRequest, @Res() res) {
        if (!updateIncidenteRequest || (updateIncidenteRequest && Object.keys(updateIncidenteRequest).length === 0))
            return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');
        const response = await this.incidentesService.update(incidenteId, updateIncidenteRequest);
        return res.status(HttpStatus.CREATED).json(response);
    }
    
}
