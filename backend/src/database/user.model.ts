import { Table, Model, PrimaryKey, Column, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column
    public psid: string;

    @Column
    public firstName: string;

    @Column
    public lastName: string;

    @Column
    public email: string;

    @Column
    public phoneNumber: string;

    @Column
    public profileImageLink: string;

    /**
     * Timestamps
     * @desc These fields will be updated automatically by sequelize.
     */

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;
}
