import { Table, Model, PrimaryKey, Column, CreatedAt, UpdatedAt, AutoIncrement, ForeignKey, DataType, Default, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Report extends Model<Report> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column(DataType.TEXT)
    public content: string;

    @Column
    public image: string;

    @Column
    public tag: string;

    @Column
    public location: string;

    @Column(DataType.FLOAT)
    public lat: number;

    @Column(DataType.FLOAT)
    public lng: number;

    @ForeignKey(() => User)
    @Column
    public reporter: string;

    @Default(0)
    @Column
    public upvote: number;

    /**
     * Timestamps
     * @desc These fields will be updated automatically by sequelize.
     */

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    /**
     * Associations
     */
    @BelongsTo(() => User)
    public user: User;
}
