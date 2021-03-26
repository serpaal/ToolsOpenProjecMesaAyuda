import { Column, Model, Table, DataType, PrimaryKey, AutoIncrement, Unique, BelongsToMany } from 'sequelize-typescript';

@Table({
  tableName:'incidentes',
  schema: 'public',
  underscored: true,
})
export class Incidentes extends Model<Incidentes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;  

  @Column(DataType.STRING)
  nro_inc: string;

  @Column(DataType.DATE)
  fecha_sol: Date;

  @Column(DataType.STRING)
  nomb_comp: string;

  @Column(DataType.STRING)
  arch_adj: string;

  @Column(DataType.STRING)
  observ: string;

  @Column(DataType.STRING)
  descrip: string;

  @Column(DataType.STRING)
  cod_u_rbl: string;
  
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