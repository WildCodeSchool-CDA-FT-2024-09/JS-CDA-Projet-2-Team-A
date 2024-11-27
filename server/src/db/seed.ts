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
} from "../entities";
import products from "../../data/products.json";
import suppliers from "../../data/supplier.json";
import supplier_product from "../../data/supplier_product.json";
import employees from "../../data/employee.json";
import employee_product from "../../data/employee_product.json";
import roles from "../../data/roles.json";
import users from "../../data/users.json";
import messages from "../../data/messages.json";
import orders from "../../data/orders.json";
import order_product from "../../data/order_product.json";

type ProductType = {
  product: string;
  material: string;
  color: string;
  category: string;
  image: string;
  description: string;
  stock: number;
};

type SupplierType = {
  name: string;
  logo: string;
  description: string;
  address: string;
  postcode: number;
  city: string;
  country: string;
  delay: number;
  active: boolean;
};

type EmployeeType = {
  name: string;
  email: string;
  phone_number: string;
  supplier_id: number;
};

type RoleType = {
  role: string;
};

type UserType = {
  name: string;
  login: string;
  password: string;
  role: number;
};

type MessageType = {
  title: string;
  message: string;
  created_at: string;
  message_status: string;
};

type OrderType = {
  order_status: string;
  created_at: string;
};

type OrderProductType = {
  order_id: number;
  product_id: number;
  quantity: number;
};

const productsArray = Array.isArray(products) ? products : [];

(async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM product");
    await queryRunner.query("DELETE FROM supplier");
    await queryRunner.query("DELETE FROM employee");
    await queryRunner.query("DELETE FROM role");
    await queryRunner.query("DELETE FROM user");
    await queryRunner.query("DELETE FROM message");
    await queryRunner.query("DELETE FROM order");

    const savedProducts = await Promise.all(
      productsArray.map(async (productEl: ProductType) => {
        const product = new Product();

        product.product = productEl.product;
        product.material =
          productEl.material === "" ? undefined : productEl.material;
        product.color = productEl.color === "" ? undefined : productEl.color;
        product.category = productEl.category;
        product.image = productEl.image;
        product.description = productEl.description;
        product.stock = productEl.stock;
        product.min_quantity = 0;
        product.active = true;

        return await product.save();
      })
    );

    const savedSuppliers = await Promise.all(
      suppliers.map(async (supplierEl: SupplierType) => {
        const supplier = new Supplier();

        supplier.name = supplierEl.name;
        supplier.logo = supplierEl.logo;
        supplier.description = supplierEl.description;
        supplier.address = supplierEl.address;
        supplier.postcode = supplierEl.postcode.toString();
        supplier.city = supplierEl.city;
        supplier.country = supplierEl.country;
        supplier.delay = supplierEl.delay;
        supplier.active = supplierEl.active;

        return await supplier.save();
      })
    );

    await Promise.all(
      savedProducts.map(async (product) => {
        product.suppliers = savedSuppliers.filter((supplier) => {
          const relations = supplier_product.filter(
            (rel) =>
              rel.product_id === product.id && rel.supplier_id === supplier.id
          );
          return relations.some((rel) => rel.supplier_id === supplier.id);
        });

        return await product.save();
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

        return await employee.save();
      })
    );

    await Promise.all(
      savedProducts.map(async (product) => {
        product.employees = savedEmployees.filter((employee) => {
          const relations = employee_product.filter(
            (rel) =>
              rel.product_id === product.id && rel.employee_id === employee.id
          );
          return relations.some((rel) => rel.employee_id === employee.id);
        });

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

    /* const savedUsers = */ await Promise.all(
      users.map(async (userEl: UserType) => {
        const user = new User();

        user.name = userEl.name;
        user.login = userEl.login;
        user.password = userEl.password;
        user.role = savedRoles.find((role) => role.id === userEl.role) as Role;

        return await user.save();
      })
    );

    /* const savedSuppliers =*/ await Promise.all(
      messages.map(async (messageEl: MessageType) => {
        const message = new Message();

        message.title = messageEl.title;
        message.message = messageEl.message;
        message.created_at = new Date(messageEl.created_at);
        message.message_status = messageEl.message_status;

        return await message.save();
      })
    );

    const savedOrders = await Promise.all(
      orders.map(async (orderEl: OrderType) => {
        const order = new Order();

        order.status = orderEl.order_status;
        order.created_at = new Date(orderEl.created_at);

        return await order.save();
      })
    );

    /* const savedOrderProducts = */ await Promise.all(
      order_product.map(async (orderProductEl: OrderProductType) => {
        const orderProduct = new OrderProduct();

        orderProduct.order = savedOrders.find(
          (order) => order.id === orderProductEl.order_id
        ) as Order;
        orderProduct.product = savedProducts.find(
          (product) => product.id === orderProductEl.product_id
        ) as Product;
        orderProduct.quantity = orderProductEl.quantity;

        return await orderProduct.save();
      })
    );

    // await Promise.all(
    //   savedProducts.map(async (product) => {
    //     product.suppliers = savedSuppliers.filter((supplier) => {
    //       const relations = supplier_product.filter(
    //         (rel) =>
    //           rel.product_id === product.id && rel.supplier_id === supplier.id
    //       );
    //       return relations.some((rel) => rel.supplier_id === supplier.id);
    //     });

    //     return await product.save();
    //   })
    // );

    // await Promise.all(
    //   savedEmployees.map(async (employee) => {
    //     employee.products = savedProducts.filter((product) => {
    //       const relations = employee_product.filter(
    //         (rel) =>
    //           rel.product_id === product.id && rel.employee_id === employee.id
    //       );
    //       return relations.some((rel) => rel.product_id === product.id);
    //     });

    //     return await employee.save();
    //   })
    // );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.warn(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
