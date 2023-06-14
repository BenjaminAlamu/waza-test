const {
  createUser,
  fetchUsers,
  fetchUser,
  updateUser,
} = require("./services/user.service");
const {
  getUserBalance,
  createTransaction,
  fetchUserTransaction,
  fetchTransaction,
  fundsTransfer,
  fetchTransactionByAmount,
} = require("./services/transactions.service");

const args = process.argv.toString();
const splittedArgs = args.split(",");
const command = splittedArgs[3];

const payload = generatePayload(splittedArgs.splice(4));

switch (command) {
  case "createUser":
    createUser(payload);
    break;
  case "fetchUsers":
    fetchUsers(payload);
    break;
  case "fetchUser":
    fetchUser(payload);
    break;
  case "updateUser":
    updateUser(payload);
    break;
  case "getUserBalance":
    getUserBalance(payload);
    break;
  case "createTransaction":
    createTransaction(payload);
    break;
  case "fetchUserTransaction":
    fetchUserTransaction(payload);
    break;
  case "fetchTransaction":
    fetchTransaction(payload);
    break;
  case "fundsTransfer":
    fundsTransfer(payload);
    break;
  case "fetchTransactionByAmount":
    fetchTransactionByAmount(payload);
    break;
}

function generatePayload(data) {
  let payload = {};
  data.forEach((element) => {
    let temp = element.split("=");
    payload[temp[0]] = temp[1];
  });
  return payload;
}
