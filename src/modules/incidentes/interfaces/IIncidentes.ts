export interface IIncidentes {
    id: number;  
    nro_inc: string;
    fecha_sol: Date;
    nomb_comp: string;
    arch_adj?: string;
    observ?: string;
    descrip: string;
    cod_u_rbl: string;
    estado: string;
    open_project_id?: string;
    open_project_title?: string;
    open_project_status?: string;
    open_project_percentage_done?: number; 
    open_project_assignee?: string; 
    open_project_responsible?: string; 
    username: string;     
    created_at?: Date;
    updated_at?: Date;
}