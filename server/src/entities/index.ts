import { Product } from "./product.entities";
import { Supplier } from "./supplier.entities";
import { Employee } from "./employee.entities";
import { Role } from "./role.entities";
import { User } from "./user.entities";
import { Message } from "./message.entities";
import { Order } from "./order.entities";
import { OrderProduct } from "./order_product.entities";
import { MessageStatus } from "./message_status.entities";
import { OrderStatus } from "./order_status.entities";

export {
  Product,
  Supplier,
  Employee,
  Role,
  User,
  Message,
  MessageStatus,
  Order,
  OrderStatus,
  OrderProduct,
};

export const entities = [
  Product,
  Supplier,
  Employee,
  Role,
  User,
  Message,
  MessageStatus,
  Order,
  OrderStatus,
  OrderProduct,
];
