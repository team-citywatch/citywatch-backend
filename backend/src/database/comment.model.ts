import { Table, Model, PrimaryKey, Column, CreatedAt, UpdatedAt, AutoIncrement, ForeignKey, DataType } from "sequelize-typescript";
import { User } from "./user.model";
import { Report } from "./report.model";

@Table
export class Comment extends Model<Comment> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @ForeignKey(() => User)
    @Column
    public commenter: number;

    @Column(DataType.TEXT)
    public content: string;

    @Column
    public image: string;

    @ForeignKey(() => Report)
    @Column
    public report: number;

    /**
     * Timestamps
     * @desc These fields will be updated automatically by sequelize.
     */

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;
}
