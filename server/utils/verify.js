const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { hashMessage } = require("./hash");

async function verifySignature(signature, message, key) {
  const hash = hashMessage(message);
  return secp256k1.verify(signature, hash, key);
}

module.exports = { verifySignature };
