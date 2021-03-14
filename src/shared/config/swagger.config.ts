import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
    .setTitle('Mesa de Ayuda & Open Project')
    .setDescription('APIs para integrar Mesa de Ayuda con Open Project.')
    .setVersion('1.0.0')
    .setExternalDoc('For more information', 'http://swagger.io')
    .addTag('MesaAyuda_OpenProject')
    .addTag('nestjs', 'framework')
    .build();