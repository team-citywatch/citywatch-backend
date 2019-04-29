import { Table, Model, PrimaryKey, Column, CreatedAt, UpdatedAt, AutoIncrement } from "sequelize-typescript";

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public name: string;

    @Column
    public email: string;

    @Column
    public profileImageLink: string;

    @Column
    public accessToken: string;

    @Column
    public userType: number;

    /**
     * What3Words
     */
    @Column
    public defaultLocation: string;

    /**
     * Timestamps
     * @desc These fields will be updated automatically by sequelize.
     */

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;
}
