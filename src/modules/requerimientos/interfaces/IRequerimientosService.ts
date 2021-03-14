import { Requerimientos } from '../requerimientos.model';
import { IRequerimientos } from './IRequerimientos';

export interface IRequerimientosService {
    findAll(): Promise<Array<Requerimientos>>;    
}