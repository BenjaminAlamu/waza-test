const { writeToFile, readFile } = require("../utils");

/**
 * @typedef {object} User
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} accountType
 * @property {number} initialBalance
 * @property {string} timestamp
 * @property {number} id
 */

// Create User
/**
 * @param {{
 * firstName: string
 * lastName: string
 * accountType: string
 * initialBalance: number
 * }} data
 * @return {Array<User>}
 */
function createUser(data) {
  const { firstName, lastName, accountType, initialBalance } = data;
  if (!firstName || !lastName || !accountType || !initialBalance) {
    console.log("Validation errors: Please fill all parameters");
    return;
  }

  const currentUsers = readFile("user");
  const dataToBeWritten = [
    ...currentUsers,
    {
      ...data,
      id: currentUsers.length + 1,
      balance: initialBalance,
      accountType,
      timestamp: Date.now(),
    },
  ];
  writeToFile("user", dataToBeWritten);
  console.log(`${firstName} created successfully`);
  return dataToBeWritten;
}
// Fetch Users
/**
 * @return {Array<User> | null}
 */
function fetchUsers() {
  const allUsers = readFile("user");
  console.log("All users", allUsers);
  return allUsers;
}
// Fetch User
/**
 * @param {number} id
 * @return { User | null}
 */
function fetchUser(id) {
  const allUsers = readFile("user");
  const user = allUsers.find((user) => {
    return user.id === parseInt(id);
  });
  console.log({ user });
  console.log(`Details for User: ${id}`, user);
  return user;
}

//Update User
/**
 * @param {number} id
 * @param {{
 * balance: string
 * }} data
 * @return {User}
 */
function updateUser(id, data) {
  const allUsers = readFile("user");
  let item = allUsers.find((user) => {
    return user.id === parseInt(id);
  });
  Object.assign(item, data);
  const index = allUsers.findIndex((user) => {
    return user.id === parseInt(id);
  });
  allUsers[index] = item;
  writeToFile("user", allUsers);
  console.log(`Updated Details for User: ${id}`, item);
  return item;
}

module.exports = {
  createUser,
  fetchUsers,
  fetchUser,
  updateUser,
};
