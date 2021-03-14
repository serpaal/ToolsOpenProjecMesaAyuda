import { Requerimientos} from './requerimientos.model';

export const RequerimientosProvider = {
    provide: 'RequerimientosRepository',
    useValue: Requerimientos
};