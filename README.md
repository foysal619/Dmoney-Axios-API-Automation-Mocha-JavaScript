# Dmoney-Axios-API-Automation-Mocha-JavaScript
This repository consists of API Automation using Axios, Mocha and JavaScript. I have automated the user creation for Customer and Agent, also some transaction-related operations have been done, ex- Send Money, Agent To Customer Deposit, Money Withdrawal, Customer Payment, etc. Also, assertion and negative test cases have been covered for every test case.

## Assigned Work Scenerio
Do the following steps using the API from this collection:
https://api.postman.com/collections/1844288-143eb923-423f-4c91-a198-fe6e56d20e35?access_key=PMAT-01GJ3CC22Q0066PJWP3T0XHQ8G

1. Do Login by admin
2. Create 2 new customers and an agent
3. Give 2000 tk from the System account to the newly created agent
4. Deposit 1500 tk to a customer from the agent account
5. Withdraw 500 tk by the customer to the agent
6. Send money 500 tk to another customer
7. Payment of 100 tk to a merchant (01686606905) by the recipient customer
8. Check the balance of the recipient customer

## How to run this project
- Clone This project
- open the cloned project in vs code
- Type npm install in Terminal and Hit Enter
- Then Hit the following command in terminal

```bash
 npm test
```
## Tools and Tech
- JavaScript
- VS Code 
- Chai Mocha
- Axios
- Mocha Awsome report

## Test Cases Covered
1. Check that the user can not log in with invalid credentials
2. Check that the user can successfully log in with valid credentials
3. Check that user1/customer1 creation is not possible with an invalid phone number
4. Check that user1/customer1 can be created with valid credentials
5. Check that user2/customer2 can be created with valid credentials
6. Check that agent creation is not possible with an invalid phone number
7. Check that agent can be created with valid credentials
8. Check that it is not possible to deposit money from the system account to the agent account with the wrong agent number
9. Check that it is possible to do the successful deposit of money from the system account to the agent account
10. Check that it is not possible to deposit money from the agent account to the wrong customer 1 account
11. Check that it is possible to successfully deposit money from the agent account to the correct customer 1 account
12. Check that it is possible to successfully withdraw money from customer 1 account to a correct agent account
13. Check that it is not possible to send money from customer 1 account to the wrong customer 2 account
14. Check that it is possible to successfully send money from customer 1 account to a correct customer 2 account
15. Check that it is possible to do a successful payment from the customer 2 account to a valid agent account
16. Check that it is possible to successfully check customer 2 account balance

# Report Screenshots
<img width="917" alt="image" src="https://github.com/foysal619/Dmoney-Axios-API-Automation-Mocha-JavaScript/assets/61048879/d855ce30-f726-4b3e-9acd-d003c773db5e">
<img width="919" alt="image" src="https://github.com/foysal619/Dmoney-Axios-API-Automation-Mocha-JavaScript/assets/61048879/0cfb1390-878d-42d5-9c3e-233e9821cb69">

# Project Demonstration
https://github.com/foysal619/Dmoney-Axios-API-Automation-Mocha-JavaScript/assets/61048879/6e8da367-222e-47bb-bbbf-9ffa0cd74d83







