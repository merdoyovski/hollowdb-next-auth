[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://dcbadge.vercel.app/api/server/2wuU9ym6fq?style=flat)](https://discord.gg/2wuU9ym6fq)

# Anonymous Authentication Demo using HollowDB

This is a demo web-app for demonstrating how HollowDB can be used for storing profiles on-chain without revealing any information about your wallet address and have the complete control over the data.

## Prerequisites

The following must be provided to the express server:

- A HollowDB contract tx address
  - Clone the [HollowDB repo](https://github.com/firstbatchxyz/hollowdb) and deploy a contract. Refer to the [HollowDB docs](docs.hollowdb.xyz) for more information
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
