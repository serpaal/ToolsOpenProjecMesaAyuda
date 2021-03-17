import { Controller, Get, Post, Put, HttpStatus, Req, Res, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RequerimientosService } from './requerimientos.service';
import { Where } from '../../shared/decorators/where.decorator';
import { REQUERIMIENTOS_MODEL_FILTER_PROPERTIES } from '../../shared/utils/constants';
import { SetRequerimientosRequest } from './request/set-requerimientos.request';
import { UpdateRequerimientoRequest } from './request/update-requerimiento.request';
import { UpdateRequerimientosRequest } from './request/update-requerimientos.request';

@Controller('requerimientos')
export class RequerimientosController {
    constructor(private readonly requerimientosService: RequerimientosService) {}

    @Get('/')
    @ApiOperation({
        description: 'Recupera todos los requerimientos con los parametros especificos'
    })
    @ApiResponse({
        status: 200,
        description: 'Todos los requerimientos asociados a los parametros especificados',
        isArray: true 
    })
    public async index(@Where(REQUERIMIENTOS_MODEL_FILTER_PROPERTIES) _where:any,  @Res() res) {
        const requerimientos = await this.requerimientosService.findAll({where: _where, order: [['fecha_sol','DESC']] });
        return res.status(HttpStatus.OK).json(requerimientos);
    }    

    @Post('/set_requerimientos_json')
    @ApiOperation({
        description: 'Crear Requerimientos desde JSON'
    })
    @ApiBody({
        description:
            'The request body should contain a schema that holds the content for the new rquerimientos',
        type: SetRequerimientosRequest,
        required: true
    })
    @ApiResponse({
        status: 201,
        description:
            'Indicates the new role was successfully saved. The response body will be the news requerimientos.'
    })
    public async create(@Body() setRequerimientosRequest:SetRequerimientosRequest, @Res() res) {
        //const reque = `[{"nro_req":"R9904","fecha_sol":"2014-09-16T08:42:50","cod_usr":"ROJE01","cod_vinc":"E","cod_area":"1700300","proyecto":"","cod_u_rbl":"VBUS01","fecha_cierre":"2014-10-30T20:39:18.617","cod_u_rcp":null,"observ":null,"arch_adj":"-","estado":"Z","descrip_req":"A-SISMAN","justific":"CUANDO SE GENERA","nomb_comp":"OJEDA MEDINA RONALD"}]`;

        if (!setRequerimientosRequest || (setRequerimientosRequest && Object.keys(setRequerimientosRequest).length === 0))
            return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');
        const response = await this.requerimientosService.setRequerimientosJson(setRequerimientosRequest);
        return res.status(HttpStatus.CREATED).json(response);
    }

    @Post('/update_requerimientos_json')
    @ApiOperation({
        description: 'Actualizar Requerimientos desde JSON'
    })
    @ApiBody({
        description:
            'The request body should contain a schema that holds the content for the requerimientos',
        type: UpdateRequerimientosRequest,
        required: true
    })
    @ApiResponse({
        status: 201,
        description:
            'Indicates the new role was successfully saved. The response body will be the news requerimientos.'
    })
    public async updateFromJson(@Body() updateRequerimientosRequest:UpdateRequerimientosRequest, @Res() res) {
        if (!updateRequerimientosRequest || (updateRequerimientosRequest && Object.keys(updateRequerimientosRequest).length === 0))
            return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');
        const response = await this.requerimientosService.updateRequerimientosJson(updateRequerimientosRequest);
        return res.status(HttpStatus.CREATED).json(response);
    }

    @Put('/:id')
    @ApiOperation({
        description: 'Update the specific requerimiento'
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the requerimiento',
        required: true,
        type: 'number'
    })
    @ApiBody({
        description:
            'The request body should contain a schema that holds the content for the requerimiento',
        type: UpdateRequerimientoRequest,
        required: true
    })
    @ApiResponse({
        status: 201,
        description:
            'Indicates the requerimiento was successfully updated. The response body will be requerimiento updated.'
    })
    public async update( @Param('id') requerimientoId: number, @Body() updateRequerimientoRequest:UpdateRequerimientoRequest, @Res() res) {
        if (!updateRequerimientoRequest || (updateRequerimientoRequest && Object.keys(updateRequerimientoRequest).length === 0))
            return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');
        const response = await this.requerimientosService.update(requerimientoId, updateRequerimientoRequest);
        return res.status(HttpStatus.CREATED).json(response);
    }
    
}
