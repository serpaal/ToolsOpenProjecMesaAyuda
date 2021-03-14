import { Controller, Get, Post, HttpStatus, Req, Res, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequerimientosService } from './requerimientos.service';
import { Where } from '../../shared/decorators/where.decorator';
import { REQUERIMIENTOS_MODEL_FILTER_PROPERTIES } from '../../shared/utils/constants';
import { SetRequerimientosRequest } from './request/set-requerimientos.request';

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
        const requerimientos = await this.requerimientosService.findAll({where: _where});
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
        if (!setRequerimientosRequest || (setRequerimientosRequest && Object.keys(setRequerimientosRequest).length === 0))
            return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');
        const response = await this.requerimientosService.setRequerimientosJson(setRequerimientosRequest.requerimientos_json);
        return res.status(HttpStatus.CREATED).json(response);
    }
    
}
