[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://dcbadge.vercel.app/api/server/2wuU9ym6fq?style=flat)](https://discord.gg/2wuU9ym6fq)

# Anonymous Authentication Demo using HollowDB

This is a demo web-app for demonstrating how HollowDB can be used for storing profiles on-chain without revealing any information about your wallet address and have the complete control over the data.

## Purpose

This demo tries to highlight 2 key points of HollowDB and provides an example code base to get started with HollowDB and generating zk-proofs in browser.

### Untrackable

Each key in the key-value pair represents a hashed signature of a specific message. This hashed signature is untraceable, meaning it is impossible to identify them, ensuring that users can maintain their anonymity while storing their data.

Anonimity of the transaction is achieved through using another wallet to do the transaction. This demo uses a server with a wallet to execute the given transactions

Here is a [transaction](https://sonar.warp.cc/#/app/interaction/H9d1ORbrpyeUTqQGD3U-gBWcbLSlYRDyks8xGoXwwNw) I've created earlier, check it out yourself and try to find any connection to my address.

### Unchangable

The hashed signature also has a crucial role in data management. Because the key is tied to a specific hashed signature, only the original signer, who holds the private key, can update the information. This is achieved by generating a zk-proof because a valid proof requires the pre-image of the hashed signature.

This mechanism provides users with exclusive control over their on-chain data, ensuring that they can manage their presence securely and independently.

This means you cannot change a value put with someone else's key. There is a **Can't be Changed** section on the frontend, it has a input box for you to try and change an existing key by inputting the pre-image of the key. Best of luck!

## Prerequisites

The following must be provided to the express server:

- A HollowDB contract tx address
  - Clone the [HollowDB repo](https://github.com/firstbatchxyz/hollowdb) and deploy a contract. Refer to the [HollowDB docs](https://docs.hollowdb.xyz) for more information
  - Alternatively, here is a contract address if you don't want to deploy it yourself: `Dh2aTDs1BV-d-8KYNoK_hil0D25_nTe7-1M1Uvh2wTg `
- A JWK wallet to sign the transactions
  - You can create/retrieve a JWK file from [Arweave Wallet](https://arweave.app/)

## Project setup

1. Clone the repo recursively, this repo contains the express server as a submodule

```sh
git clone git@github.com:merdoyovski/hollowdb-next-auth.git --recursive
```

### Frontend

2. Run the frontend

```sh
cd hollowdb-next-auth

yarn

yarn dev
```

### Backend

3. Open a new terminal and install the dependencies for the backend

```sh
cd hollowdb-next-auth/hollowdb-express

yarn
```

4. Place a wallet

A wallet must be provided for backend server to sign the transactions.

Rename your wallet to `wallet.json` and place your it to the following directory `hollowdb-next-auth/hollowdb-express/src/secrets`

5. Start the backend Server

Refer to the Prerequisites section for the <contract-address>

```sh
yarn start <contract-address>
```

## Help

If you have any questions related to this demo or HollowDB, join our [Discord](https://discord.gg/2wuU9ym6fq) channel.
