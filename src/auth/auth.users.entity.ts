import { Table, Column, Model ,BelongsToMany} from 'sequelize-typescript';

@Table
export class users extends Model {
    @Column
    declare username: string

    @Column
    declare password: string
}

