const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");
const { baToJSON } = require("ethereumjs-util");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log("privateKey: ", toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey, false);
console.log("publicKey: ", toHex(publicKey));

const hashedPublicKey = keccak256(publicKey.slice(1));
const ethereumPublicKey = hashedPublicKey.slice(-20);
console.log("publicKey (Ethereum format): ", toHex(ethereumPublicKey));
