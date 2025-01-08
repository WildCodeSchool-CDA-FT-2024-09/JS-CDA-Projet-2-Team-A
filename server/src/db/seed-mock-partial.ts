import { AppDataSource } from "./data-source";
import { Role, User, Message, Order } from "../entities";
import * as argon2 from "argon2";
import roles from "../../data/mock/roles.json";
import users from "../../data/mock/users.json";
import messages from "../../data/mock/messages.json";
import orders from "../../data/mock/orders.json";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
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
  user_id: number;
};

type OrderType = {
  order_status: string;
  created_at: string;
};

(async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

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
        user.login = userEl.login;

        const hash = await argon2.hash(userEl.password, hashingOptions);

        user.password = hash;
        user.role = savedRoles.find((role) => role.id === userEl.role) as Role;

        return await user.save();
      })
    );

    await Promise.all(
      messages.map(async (messageEl: MessageType) => {
        const message = new Message();

        message.title = messageEl.title;
        message.message = messageEl.message;
        message.created_at = new Date(messageEl.created_at);
        message.message_status = messageEl.message_status;

        message.user = savedUsers.find(
          (user) => user.id === messageEl.user_id
        ) as User;

        return await message.save();
      })
    );

    await Promise.all(
      orders.map(async (orderEl: OrderType) => {
        const order = new Order();

        order.status = orderEl.order_status;
        order.created_at = new Date(orderEl.created_at);
        order.products = [];

        return await order.save();
      })
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.warn(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
