import { AppDataSource } from "./data-source";
import {
  Product,
  Supplier,
  Employee,
  Role,
  User,
  Message,
  Order,
  OrderProduct,
  OrderStatus,
  MessageStatus,
} from "../entities";
import * as argon2 from "argon2";
import employeeByProduct from "../../data/mock/employee_product.json";
import products from "../../data/mock/products.json";
import suppliers from "../../data/mock/suppliers.json";
import employees from "../../data/mock/employees.json";
import roles from "../../data/mock/roles.json";
import users from "../../data/mock/users.json";
import messages from "../../data/mock/messages.json";
import orders from "../../data/mock/orders.json";
import order_product from "../../data/mock/order_product.json";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

type ProductType = {
  product: string;
  material: string;
  color: string;
  category: string;
  image: string;
  description: string;
  stock: number;
  supplier: number;
};

type SupplierType = {
  name: string;
  logo: string;
  description: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  delay: number;
};

type EmployeeType = {
  name: string;
  email: string;
  phone_number: string;
  supplier_id: number;
  product_id: number;
};

type RoleType = {
  role: string;
};

type UserType = {
  name: string;
  email: string;
  password: string;
  role: string;
  activationDate: string;
  isActive: boolean;
};

type MessageType = {
  title: string;
  message: string;
  created_at: string;
  message_status: string;
  user_id: number;
};

type OrderType = {
  order_status: string;
  created_at: string;
  supplier_id: number;
};

type OrderProductType = {
  order_id: number;
  product_id: number;
  quantity: number;
};

// Récupération d'un tableau des statuts de commandes uniques.
const orderStatuses: string[] = [
  ...new Set(orders.map((order) => order.order_status)),
];
// Récupération d'un tableau des statuts de tickets uniques.
const messagesStatuses: string[] = [
  ...new Set(messages.map((message) => message.message_status)),
];

(async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const savedSuppliers = await Promise.all(
      suppliers.map(async (supplierEl: SupplierType) => {
        const supplier = new Supplier();

        supplier.name = supplierEl.name;
        supplier.logo = supplierEl.logo;
        supplier.description = supplierEl.description;
        supplier.address = supplierEl.address;
        supplier.postcode = supplierEl.postcode;
        supplier.city = supplierEl.city;
        supplier.country = supplierEl.country;
        supplier.delay = supplierEl.delay;
        supplier.active = true;
        supplier.products = [];
        supplier.employees = [];

        return await supplier.save();
      })
    );

    const savedEmployees = await Promise.all(
      employees.map(async (employeeEl: EmployeeType) => {
        const employee = new Employee();

        employee.name = employeeEl.name;
        employee.email = employeeEl.email;
        employee.phone_number = employeeEl.phone_number;
        employee.supplier = savedSuppliers.find(
          (supplier) => supplier.id === employeeEl.supplier_id
        ) as Supplier;
        employee.products = [];

        return await employee.save();
      })
    );

    const savedProducts = await Promise.all(
      products.map(async (productEl: ProductType, index: number) => {
        const supplier = savedSuppliers.find(
          (supplier) => supplier.id === productEl.supplier
        ) as Supplier;
        const target = employeeByProduct.find(
          (employ) => employ.product_id === index + 1
        ) as { employee_id: number; product_id: number };
        const targetEmploye = savedEmployees.find(
          (employe) => employe.id === target.employee_id
        );

        const product = new Product();

        product.product = productEl.product;
        product.material =
          productEl.material === "" ? undefined : productEl.material;
        product.color = productEl.color === "" ? undefined : productEl.color;
        product.category = productEl.category;
        product.image = productEl.image;
        product.description = productEl.description;
        product.stock = productEl.stock;
        product.min_quantity = 10;
        product.active = true;
        product.supplier = supplier;
        product.employee = targetEmploye as Employee;

        return await product.save();
      })
    );

    const savedRoles = await Promise.all(
      roles.map(async (roleEl: RoleType) => {
        const role = new Role();
        role.role = roleEl.role;
        return await role.save();
      })
    );

    const savedUsers = await Promise.all(
      users.map(async (userEl: UserType) => {
        const user = new User();

        user.name = userEl.name;
        user.email = userEl.email;

        const hash = await argon2.hash(userEl.password, hashingOptions);
        user.password = hash;

        user.activationDate = new Date(userEl.activationDate);
        user.isActive = userEl.isActive;

        user.role = savedRoles.find(
          (role) => role.role === userEl.role
        ) as Role;
        user.activationDate = new Date(userEl.activationDate);
        user.isActive = true;

        return await user.save();
      })
    );

    const savedMessageStatuses: MessageStatus[] = await Promise.all(
      messagesStatuses.map(async (messageStatus: string) => {
        const status = new MessageStatus();

        status.status = messageStatus;
        return await status.save();
      })
    );

    await Promise.all(
      messages.map(async (messageEl: MessageType) => {
        const message = new Message();

        message.title = messageEl.title;
        message.message = messageEl.message;
        message.created_at = new Date(messageEl.created_at);
        message.status = savedMessageStatuses.find(
          (messageStatusEl) =>
            messageStatusEl.status === messageEl.message_status
        ) as MessageStatus;

        message.user = savedUsers.find(
          (user) => user.id === messageEl.user_id
        ) as User;

        return await message.save();
      })
    );

    const savedOrderStatus: OrderStatus[] = await Promise.all(
      orderStatuses.map(async (status: string) => {
        const orderStatus = new OrderStatus();

        orderStatus.status = status;
        return await orderStatus.save();
      })
    );

    const savedOrders = await Promise.all(
      orders.map(async (orderEl: OrderType) => {
        const order = new Order();

        order.created_at = new Date(orderEl.created_at);
        order.orderProduct = [];
        order.status = savedOrderStatus.find(
          (OrderStatusEl) => OrderStatusEl.status === orderEl.order_status
        ) as OrderStatus;
        order.supplier = savedSuppliers.find(
          (supplier) => supplier.id === orderEl.supplier_id
        ) as Supplier;

        return await order.save();
      })
    );

    await Promise.all(
      order_product.map(
        async (orderProductEl: OrderProductType, index: number) => {
          const orderProduct = new OrderProduct();

          orderProduct.order = savedOrders.find(
            (order) => order.id === orderProductEl.order_id
          ) as Order;
          orderProduct.product = savedProducts[index];
          orderProduct.quantity = savedProducts[index].stock - 10;

          return await orderProduct.save();
        }
      )
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.warn(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
