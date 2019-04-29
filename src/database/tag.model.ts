import { Table, Model, PrimaryKey, Column, CreatedAt, AutoIncrement, ForeignKey } from "sequelize-typescript";
import { Report } from "./report.model";

@Table
export class Tag extends Model<Tag> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public tag: string;

    @ForeignKey(() => Report)
    @Column
    public report: number;

    /**
     * Timestamps
     * @desc These fields will be updated automatically by sequelize.
     */

    @CreatedAt
    public createdAt: Date;
}
