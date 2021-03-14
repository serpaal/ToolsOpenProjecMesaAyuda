import { Requerimientos } from '../requerimientos.model';
import { IRequerimientos } from './IRequerimientos';

export interface IRequerimientosService {
    findAll(): Promise<Array<Requerimientos>>;   
    create(requerimiento: IRequerimientos): Promise<Requerimientos>;
    update(id: number, newValue: IRequerimientos): Promise<Requerimientos | null>; 
}