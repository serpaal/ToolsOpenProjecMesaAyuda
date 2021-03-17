import { Incidentes } from './incidentes.model';

export const IncidentesProvider = {
    provide: 'IncidentesRepository',
    useValue: Incidentes
};