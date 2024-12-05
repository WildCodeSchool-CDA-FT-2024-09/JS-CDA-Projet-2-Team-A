// import request from "supertest";
// import { apolloServer, startServer } from "../src/app"; // Import the server instance
// import { User } from "../entities/user.entities"

// // Ensure the server is started before running the tests
// beforeAll(async () => {
//   await startServer();
// });

// describe("Create User Mutation", () => {
//   it("should create a user with a role and ensure fields are valid", async () => {
//     // Step 1: Make the GraphQL mutation request to create a user
//     const response = await request(apolloServer?.httpServer)
//       .post("/graphql")
//       .send({
//         query: `
//           mutation {
//             createUser(name: "John Doe", login: "john_doe", roleName: "admin")
//           }
//         `,
//       });

//     // Step 2: Check if the response contains a generated password
//     expect(response.body.data.createUser).toBeDefined();
//     expect(typeof response.body.data.createUser).toBe("string"); // Check that the response is a string (password)

//     // Step 3: Retrieve the user from the database to confirm its creation
//     const user = await User.findOne({
//       where: { login: "john_doe" },
//       relations: ["role"],
//     });

//     // Step 4: Ensure the user is not null
//     expect(user).not.toBeNull();

//     // Step 5: Check that user fields are not null
//     if (user) {
//       expect(user.name).not.toBeNull(); // Ensure the name is not null
//       expect(user.login).not.toBeNull(); // Ensure the login is not null
//       expect(user.password).not.toBeNull(); // Ensure the password is not null
//       expect(user.role).not.toBeNull(); // Ensure the role is not null
//       expect(user.role.role).toBe("admin"); // Ensure the role is "admin"
//     }

//     // Step 6: Ensure the login (email) is unique
//     const existingUser = await User.findOne({ where: { login: "john_doe" } });
//     expect(existingUser).not.toBeNull(); // Ensure the user exists
//     expect(existingUser?.login).toBe("john_doe"); // Ensure the login is correct and unique

//     // Step 7: Ensure no other user exists with the same login before running the test
//     const duplicateUser = await User.findOne({ where: { login: "john_doe" } });
//     expect(duplicateUser).toBeNull(); // Should be null if the login is unique
//   });
// });
