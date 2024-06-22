import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    try {
      const prvKey = evt.target.value;
      setPrivateKey(prvKey);
      const pubKey = secp256k1.getPublicKey(prvKey, false);
      setAddress(toHex(pubKey));

      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (err) {
      console.log(err.message, evt.target.value);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type your wallet private key to import your account:"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <p>{address}</p>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
