import dotenv from 'dotenv';
import { PinataSDK } from "pinata-web3";

dotenv.config();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY || "example-gateway.mypinata.cloud",
});

export default pinata;
