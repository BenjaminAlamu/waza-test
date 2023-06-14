# Waza Test

## How to run the code

> Simply run node index.js --command [commandName] [paramKey=paramValue] [paramKey=paramValue]
> e.g
> ` node index.js --command fundsTransfer senderId=0 receiverId=1 amount=4`

Here are list of all allowed commands, the params expected by each command are found in the JSDoc added to the codebase

- `getUserBalance` => This gets a users balance
- `fetchUserTransaction` => This fetches all of a user's transactions
- `fetchTransaction` => This fetches a single transaction
- `fundsTransfer`=> This handles the fund transfer between two accounts
- `fetchTransactionByAmount` => This fetches all transactions with a certain amount
- `createUser` => This creates a user
- `fetchUsers` => This fetches all users
- `fetchUser` => This fetches a single user
- `updateUser` => This updates users details

## Design Decisions

### Error Handling

Errors are handled using basic `console.log` because of the absence of a server. Normally this would handled building a error handler would return the proper response to the server

### Concurency/Transactions

In order to prevent issues like Race Conditions e.t.c., an ideal implementation would to use `Database Transactions` and `Database locks` to prevent things like this. This wasn't implemented because a database wasn't used

### Account/User combination

In an ideal world, it would be better to seperate the account and user tables, this would allow a user to have multiple accounts on the application. However I combined both of this because of the mini nature of the project

### ID Generation

In an ideal world, things like `UUID` or the `currentDate` would be used to generate the ids. However I used the length of the current transaction to allow users easily enter parameters in the terminal while running the codebase
