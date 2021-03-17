
export const API_ROUTE_V1 = '/api/v1';
export const ONE_HOUR = 1;
export const TWO_HOURS: number = 7200000;
export const AUTH_HEADER_NAME:string  = 'authorization';
export const AUTH_BODY_FIELD_NAME:string  = 'auth_token';
export const AUTH_PARAM_NAME:string  = 'auth_token';
export const AUTH_SCHEME_NAME:string  = 'Bearer';
export const MAIL_RECOVERY_PASSWORD_SUBJECT:string  = 'Reset Password Link';
export const MAIL_PASSWORD_CHANGED_SUBJECT:string  = 'Password Changed';

export const VARCHAR_FIELD_LENGTH: number = 255;
export const TEXT_FIELD_LENGTH: number = 21844;

export const REQUERIMIENTOS_MODEL_FILTER_PROPERTIES = [
    'id', 
    'nro_req',
    'fecha_sol',
    'nomb_comp',
    'descrip_req',
    'justific',
    'cod_u_rbl',
    'observ:',
    'arch_adj',
    'estado',
    'open_project_id',
    'open_project_title',
    'open_project_status',
    'username',  
    'created_at',
    'updated_at'
];

export const INCIDENTES_MODEL_FILTER_PROPERTIES = [
    'id', 
    'nro_inc',
    'fecha_sol',
    'arch_adj',
    'observ:',
    'nomb_comp',
    'descrip',
    'cod_u_rbl',
    'estado',
    'open_project_id',
    'open_project_title',
    'open_project_status',
    'username',  
    'created_at',
    'updated_at'
];