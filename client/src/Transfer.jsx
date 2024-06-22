import { useState } from "react";
import server from "./server";
import { signMessage } from "../utils/sign";
import { v4 as uuidv4 } from "uuid";

function Transfer({ address, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const tx = {
        txn_id: uuidv4(),
        from: address,
        to: recipient,
        value: sendAmount,
      };

      const message = JSON.stringify(tx);
      const signature = await signMessage(privateKey, message);
      tx["signature"] = signature;

      const res = await server.post(`send`, {
        ...tx,
      });

      setBalance(res.data.balance);
    } catch (ex) {
      alert(ex.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
