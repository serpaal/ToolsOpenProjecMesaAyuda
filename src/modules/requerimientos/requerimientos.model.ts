import { Column, Model, Table, DataType, PrimaryKey, AutoIncrement, Unique, BelongsToMany } from 'sequelize-typescript';

@Table({
  tableName:'requerimientos',
  schema: 'public',
  underscored: true,
})
export class Requerimientos extends Model<Requerimientos> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;  

  @Column(DataType.STRING)
  nro_req: string;

  @Column(DataType.DATE)
  fecha_sol: Date;

  @Column(DataType.STRING)
  nomb_comp: string;

  @Column(DataType.STRING)
  descrip_req: string;

  @Column(DataType.STRING)
  justific: string;

  @Column(DataType.STRING)
  cod_u_rbl: string;

  @Column(DataType.STRING)
  observ: string;

  @Column(DataType.STRING)
  arch_adj: string;

  @Column(DataType.STRING)
  estado: string;

  @Column(DataType.STRING)
  open_project_id: string;

  @Column(DataType.STRING)
  open_project_identifier: string;

  @Column(DataType.STRING)
  open_project_title: string;

  @Column(DataType.STRING)
  open_project_status: string;

  @Column(DataType.NUMBER)
  open_project_percentage_done: number;

  @Column(DataType.STRING)
  open_project_assignee: string;

  @Column(DataType.STRING)
  open_project_responsible: string;

  @Column(DataType.STRING)
  open_project_priority: string;
  
  @Column(DataType.STRING)
  username: string;  

  @Column(DataType.DATE)
  created_at: Date;

  @Column(DataType.DATE)
  updated_at: Date;
}