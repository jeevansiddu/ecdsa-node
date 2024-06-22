const express = require("express");
const app = express();
const cors = require("cors");
const _ = require("lodash");
const { verifySignature } = require("./utils/verify");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04d435f26bd5a5117c51c248e5d9178d4933339879fbc19d26d0a109ffb38255668efbb970a0822be577ee1bb8a80db7d3aae1d1b065519459a3d1e055938731d5": 100,
  "045a86a27b88312f0982643a6ce8667269fa2714eabe81c4e38e82067cc06d5e9e229e71f315aa4f8f558b230645322903a04b63e163ca15a4a6ce75f021915b55": 50,
  "04ffc74016f85902ef7ce4b86c4a870ab5fabdbb61a8338b28c6989e6cbefce9dd14c044cfcedc9e36a1715c0d8961a5fc4025c99093a8dcba99edd62c182287b3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { from: sender, to: recipient, value: amount, signature } = req.body;

  const singatureVerified =
    verifySignature(
      signature,
      JSON.stringify(_.omit(req.body, ["signature"])),
      sender
    ) ?? false;
  if (singatureVerified) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    throw Error("Invalid signature");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
