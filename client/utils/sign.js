import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { hashMessage } from "./hash.js";

export async function signMessage(PRIVATE_KEY, msg) {
  const hash = hashMessage(msg);
  const signature = secp256k1.sign(hash, PRIVATE_KEY);
  return signature.toCompactHex();
}
