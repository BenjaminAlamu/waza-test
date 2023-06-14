const { writeToFile, readFile } = require("../utils");
const { fetchUser, updateUser } = require("./user.service");

/**
 * @typedef {object} Transaction
 * @property {string} receiverId
 * @property {string} senderId
 * @property {string} timestamp
 * @property {number} id
 */

/**
 * @typedef {object} User
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} accountType
 * @property {number} initialBalance
 * @property {string} timestamp
 * @property {number} id
 */

// Get User Balance
/**
 * @param {number} id
 * @return {number} balance | null
 */
function getUserBalance(id) {
  const user = fetchUser(id);
  console.log(`User with id: ${id} has a balance of`, user.balance);
  return user.balance;
}

// Create Transaction
/**
 * @param {{
 * sender: User
 * receiver: User
 * amount: number
 * }} data
 * @return {Array<Transaction>}
 */
function createTransaction(data) {
  const { sender, receiver, amount } = data;

  if (sender.balance < amount) {
    console.log("Insufficient funds");
    return;
  }
  const newSenderBalance = parseInt(sender.balance) - parseInt(amount);
  const newReceiverBalance = parseInt(receiver.balance) - parseInt(amount);

  updateUser(sender.id, { balance: newSenderBalance });
  updateUser(receiver.id, { balance: newReceiverBalance });

  const currentTransactions = readFile("transaction");
  const dataToBeWritten = [
    ...currentTransactions,
    {
      senderId: sender.id,
      id: currentTransactions.length + 1,
      receiverId: receiver.id,
      timestamp: Date.now(),
    },
  ];
  writeToFile("transaction", dataToBeWritten);
  console.log("Transfer successful");
  return dataToBeWritten;
}

// Funds Transfer
/**
 * @param {{
 * senderId: User
 * receiverId: User
 * amount: number
 * }} data
 * @return {Array<Transaction>}
 */
function fundsTransfer(data) {
  console.log({ data });
  const { senderId, receiverId, amount } = data;

  const sender = fetchUser(senderId);
  const receiver = fetchUser(receiverId);

  if (!sender || !receiver) {
    return "Invalid User Details Passed";
  }

  return createTransaction({ sender, receiver, amount });
}

// Fetch All User Transactions
/**
 * @param {number} userId
 * @return {Array<Transaction>}
 */
function fetchUserTransaction(userId) {
  const allTransactions = readFile("transaction");
  const userTransactions = allTransactions.find((transaction) => {
    return (
      transaction.senderId === parseInt(userId) ||
      transaction.receiverId === parseInt(userId)
    );
  });
  console.log(`Transactions for User: ${userId}`, userTransactions);
  return userTransactions;
}

// Fetch Transaction
/**
 * @param {number} id
 * @return {Transaction | null}
 */
function fetchTransaction(id) {
  const allTransactions = readFile("transaction");
  const transaction = allTransactions.find((transaction) => {
    return transaction.id === parseInt(id);
  });
  console.log(`Transaction with id: ${id}`, transaction);
  return transaction;
}

// Fetch Transactions By Amount
/**
 * @param {number} amount
 * @return {Array<Transaction>}
 */
function fetchTransactionByAmount(amount) {
  const allTransactions = readFile("transaction");
  const transactions = allTransactions.find((transaction) => {
    return transaction.amount === parseInt(amount);
  });
  console.log(`Transactions with amount: ${amount}`, transactions);
  return transactions;
}

module.exports = {
  getUserBalance,
  createTransaction,
  fetchUserTransaction,
  fetchTransaction,
  fundsTransfer,
  fetchTransactionByAmount,
};
