import { Incidentes } from '../incidentes.model';
import { IIncidentes } from './IIncidentes';

export interface IIncidentesService {
    findAll(): Promise<Array<Incidentes>>;   
    create(incidentes: IIncidentes): Promise<Incidentes>;
    update(id: number, newValue: IIncidentes): Promise<Incidentes | null>; 
}