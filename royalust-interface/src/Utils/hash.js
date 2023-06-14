import { SHA512 } from "crypto-js";

export const generateHash = async (plaintext) => {
	let hash = SHA512(plaintext).toString();
	return hash;
};
