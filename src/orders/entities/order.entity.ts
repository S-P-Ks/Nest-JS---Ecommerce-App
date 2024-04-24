import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { orderStatus } from "../enums/order.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { ShippingEntity } from "./shipping.entity";
import { OrdersProductsEntity } from "./orders-products.entity";

@Entity({ name: "orders" })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    orderedAt: Timestamp

    @Column({ type: "enum", enum: orderStatus.PROCESSING })
    status: string

    @Column({ nullable: true })
    shippedAt: Date

    @Column({ nullable: true })
    deliveredAt: Date

    @ManyToOne(() => UserEntity, (user) => user.ordersUpdateBy)
    updatedBy: UserEntity

    @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
    @JoinColumn()
    shippingAddress: ShippingEntity

    @OneToMany(() => OrdersProductsEntity, (ordProd) => ordProd.order)
    products: OrdersProductsEntity[]
}
