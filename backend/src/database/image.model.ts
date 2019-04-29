import { Table, Model, PrimaryKey, Column, CreatedAt, UpdatedAt, AutoIncrement } from "sequelize-typescript";

@Table
export class Image extends Model<Image> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public key: string;

    /**
     * Timestamps
     * @desc These fields will be updated automatically by sequelize.
     */

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;
}
