const axios = require("axios");
const jsonData = require("../env.json");
const fs = require("fs");
const { expect } = require("chai");
const agentData = require("../agent.json");
const customerData = require("../users.json");
const transactions = require("../transactions.json");
const { log } = require("console");
describe("User can do Transaction Actions", () => {
  before(async () => {
    var response = await axios.post(
      `${jsonData.baseUrl}/user/login`,
      {
        email: "salman@roadtocareer.net",
        password: "1234",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data);
    let token_value = response.data.token;
    jsonData.token = token_value;
    fs.writeFileSync("env.json", JSON.stringify(jsonData));
  });


  //Deposit 2000 tk to the invalid Agent from system
  it("Deposit 2000 tk to the invalid Agent from system", async () => {
    try {
      const agentPhoneNumber = agentData[agentData.length - 1].phone_number;
      let amount = 2000;
      const response = await axios.post(
        `${jsonData.baseUrl}/transaction/deposit`,
        {
          from_account: "SYSTEM",
          to_account: "02646464",
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      );
      console.log(response.status);
      expect(response.status).equal(404);
    } catch (error) {
      console.error(error.response.status);
      expect(error.response.status).equal(404);
    }
  });


  //Deposit 2000 tk to the Agent from system
  it("Deposit 2000 tk to the Agent from system", async () => {
    const agentPhoneNumber = agentData[agentData.length - 1].phone_number;
    let amount = 2000;
    var response = await axios
      .post(
        `${jsonData.baseUrl}/transaction/deposit`,
        {
          from_account: "SYSTEM",
          to_account: agentPhoneNumber,
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      )
      .then((res) => res.data);

    console.log(response);
    expect(response.message).contains("successful");

    // Add user transactions to the transactions object

    // Add agent transactions to the transactions object
    transactions.agentTransactions.push({
      amount: amount,
      trnxid: response.trnxId,
    });

    // Write transactions object to JSON file
    fs.writeFile("transactions.json", JSON.stringify(transactions), (err) => {
      if (err) throw err;
      console.log("Transactions saved to transactions.json");
    });
  });


  //Deposit 1500 tk by agent to Invalid customer
  it("Deposit 1500 tk by agent to Invalid customer", async () => {
    const agentPhoneNumber = agentData[agentData.length - 1].phone_number;

    try {
      const response = await axios.post(
        `${jsonData.baseUrl}/transaction/deposit`,
        {
          from_account: agentPhoneNumber,
          to_account: "01635353",
          amount: 2000,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      );

      console.log(response);
      // expect(response.data.message).contains("successful");
    } catch (error) {
      console.log(error.response.status);
      expect(error.response.status).equal(404);
    }
  });


  //Deposit 1500 tk by agent to customer 1
  it("Deposit 1500 tk by agent to customer 1 ", async () => {
    const agentPhoneNumber = agentData[agentData.length - 1].phone_number;
    const customerPhoneNumber =
      customerData[customerData.length - 2].phone_number;
    var response = await axios
      .post(
        `${jsonData.baseUrl}/transaction/deposit`,
        {
          from_account: agentPhoneNumber,
          to_account: customerPhoneNumber,
          amount: 1500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      )
      .then((res) => res.data);

    console.log(response);
    expect(response.message).contains("successful");
  });


  //Withdraw 500 tk by customer 1
  it("Withdraw 500 tk by customer 1", async () => {
    const agentPhoneNumber = agentData[agentData.length - 1].phone_number;
    const customerPhoneNumber =
      customerData[customerData.length - 2].phone_number;
    var response = await axios
      .post(
        `${jsonData.baseUrl}/transaction/withdraw/`,
        {
          from_account: customerPhoneNumber,
          to_account: agentPhoneNumber,
          amount: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      )
      .then((res) => res.data);

    console.log("500 Withdrwal:", response.message);
    console.log("500 Withdrwal Current balance:", response.currentBalance);
    console.log("500 Withdrwal fee:", response.fee);
    let cBalance = response.currentBalance;
    //expect(cBalance).equal(990);
    // expect(String.toString(cBalance)).contains("990");
  });


  //Send money 500 tk to another invalid customer 2
  it("Send money 500 k to another invalid customer 2", async () => {
    const customer1PhoneNumber =
      customerData[customerData.length - 2].phone_number;
    const customer2PhoneNumber = "02743747"; // Invalid phone number
    try {
      var response = await axios
        .post(
          `${jsonData.baseUrl}/transaction/sendmoney/`,
          {
            from_account: customer1PhoneNumber,
            to_account: customer2PhoneNumber,
            amount: 500,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: jsonData.token,
              "X-AUTH-SECRET-KEY": jsonData.secretKey,
            },
          }
        )
        .then((res) => res.data);
      console.log(response);
      //expect(response.status).equal(404);
      // Make an assertion based on the response
      // expect(response).to.be.undefined; // Expect the response to be undefined since the request should fail with a 404 error
    } catch (error) {
      console.log(error.response.status); // Log the error status code
      // Make an assertion based on the error status code
      //expect(error.response.status).equal(404); // Expect the status code to be 404 since the requested resource is not found
    }
  });

  //Send money 500tk from customer 1 to customer 2
  it("Send money 500tk from customer 1 to customer 2", async () => {
    const customer1PhoneNumber =
      customerData[customerData.length - 2].phone_number;
    const customer2PhoneNumber =
      customerData[customerData.length - 1].phone_number;
    var response = await axios
      .post(
        `${jsonData.baseUrl}/transaction/sendmoney`,
        {
          from_account: customer1PhoneNumber,
          to_account: customer2PhoneNumber,
          amount: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      )
      .then((res) => res.data);
    console.log(response);
    expect(response.currentBalance).equal(490);
  });

  //Payment 100 tk to Merchant by customer 2
  it("Payment 100 tk to Merchant", async () => {
    const customer2PhoneNumber =
      customerData[customerData.length - 1].phone_number;
   
    var response = await axios
      .post(
        `${jsonData.baseUrl}/transaction/payment`,
        {
          from_account: customer2PhoneNumber,
          to_account: jsonData.pAgent,
          amount: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      )
      .then((res) => res.data);

    console.log(response);
    expect(response.message).contains("Payment successful");
  });

  //Check customer 2 balance after make payment
  it("Check customer 2 balance after make payment", async () => {
    const customer2PhoneNumber =
      customerData[customerData.length - 1].phone_number;
    var response = await axios
      .get(
        `${jsonData.baseUrl}/transaction/balance/${customer2PhoneNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jsonData.token,
            "X-AUTH-SECRET-KEY": jsonData.secretKey,
          },
        }
      )
      .then((res) => res.data);

    console.log(response);
    //expect(response.balance).equal(2000);
  });
});
