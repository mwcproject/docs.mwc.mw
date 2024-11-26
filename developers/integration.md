# Integration

The integration of the **MWC** into various systems or processes revolves around two core workflows: **Send** and **Receive**. These workflows ensure smooth, privacy-focused, and efficient transactions within the MWC ecosystem. 

### **Understanding the Interactive Process**

MWC transactions are inherently **interactive**, requiring communication between the sender and the recipient. At its core, the sender creates an initial slate (a transaction template), shares it with the recipient, and waits for the recipient to respond with an updated slate. This updated slate is then finalized and broadcast to the blockchain.
x



## **Software Requirements**

::: tip
The MWC Python SDK simplifies interaction with the MWC Wallet API for managing transactions. It supports both the Owner API (transaction creation, finalization, balance retrieval) and Foreign API (receiving transactions).

[MWC Python SDK Repository](https://github.com/mwcproject/mwcmw.py/tree/main) includes example workflows for Sender and Recipient in the `/examples` folder.
:::

### **1. MWC Node Setup**

- **Purpose**: The MWC Node synchronizes with the blockchain and provides JSON-RPC APIs for interaction.
- **Resources**:
  - [Download from the source](https://github.com/mwcproject/mwc-node)
  - [Build Instructions](https://github.com/mwcproject/mwc-node)
  - [Documentation](https://github.com/mwcproject/mwc-node)

- **Quick Start**:
  - To run the node, simply execute:
    ```bash
    mwc
    ```

- **Listeners**:
  - The node supports two APIs, both listening on `localhost:3413`:
    - **Foreign API**:
      - Available at: `http://localhost:3413/v2/foreign`.
      - Supports only `POST` operations, with the JSON-RPC request as the body.
      - Refer to the [Foreign API Documentation](https://docs.rs/mwc_api/latest/mwc_api/foreign_rpc/trait.ForeignRpc.html) for detailed usage.
    - **Owner API**:
      - Available at: `http://localhost:3413/v2/owner`.
      - Supports only `POST` operations, with the JSON-RPC request as the body.
      - Refer to the [Owner API Documentation](https://docs.rs/mwc_api/latest/mwc_api/owner_rpc/trait.OwnerRpc.html) for detailed usage.

- **Critical Setup**:
  - Ensure the node is **fully synchronized** with the blockchain before performing any transactions.

---

### **2. MWC Wallet Installation and Setup**

- **Purpose**: The MWC Wallet handles all transaction operations, including creating, receiving, and finalizing transaction slates.
- **Resources**:
  - [Download from the source](https://github.com/mwcproject/mwc-wallet)
  - [Build Instructions](https://github.com/mwcproject/mwc-wallet)
  - [Documentation](https://github.com/mwcproject/mwc-wallet)

- **Quick Start**:
  - **Owner API**:
    - Publicly accessible definition used to generate the Owner JSON-RPC API.
    - Start the Owner API by running:
      ```bash
      mwc-wallet owner_api
      ```
    - Available at: `http://localhost:3420/v3/owner`.
    - Supports only `POST` operations, with the JSON-RPC request as the body.
    - Refer to the [Owner API Documentation](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.OwnerRpcV3.html) for detailed usage.
  - **Foreign API**:
    - Publicly accessible definition used to generate the Foreign JSON-RPC API.
    - Start the Foreign API by running:
      ```bash
      mwc-wallet listen
      ```
    - Available at: `http://localhost:3415/v2/foreign`.
    - Supports only `POST` operations, with the JSON-RPC request as the body.
    - Refer to the [Foreign API Documentation](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.ForeignRpc.html) for detailed usage.

::: info 
Ensure that the correct API mode is running based on your role in the transaction process.
:::

- **Operational Modes**:
  - **If You Are the Sender**: Use the Owner API to manage and send transactions.
  - **If You Are the Recipient**: Use the Foreign API to handle incoming transaction slates.







## Sender Workflow

The **Sender Workflow** is responsible for initiating, encoding, and finalizing the transaction. For developers integrating MWC workflows, it's important to understand the interactive nature of the transaction process. Once you generate the initial slatepack, you need to send it to the user (recipient) and wait for their response slatepack to proceed further.

### **Step 1: Initiate Transaction**

The sender creates a transaction slate by calling the method [init_send_tx](https://docs.rs/mwc_wallet_api/5.3.4/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.init_send_tx)  

`init_send_tx` <Badge type="info" text="POST" />

| Parameter                    | Type     | Description                                                              |
|------------------------------|----------|--------------------------------------------------------------------------|
| `token`                      | String   | API token for authentication.                                           |
| `amount`                     | Integer  | Amount to send in micro-MWC (e.g., `500000000` for 0.5 MWC).            |
| `minimum_confirmations`      | Integer  | Minimum confirmations for inputs (e.g., `500`).                         |
| `max_outputs`                | Integer  | Maximum outputs to use (e.g., `500`).                                   |
| `num_change_outputs`         | Integer  | Number of change outputs (e.g., `1`).                                   |
| `selection_strategy_is_use_all` | Boolean | Whether to use all available inputs (`true` or `false`).                |
| `target_slate_version`       | Integer  | Slate version to use (e.g., `4`).                                       |


::: details Request Example
```JSON
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "init_send_tx",
  "params": {
    "token": "f97e6cfd63b5332ef40e91203458058ef68c7646ab0f4d0f419cdcd5056f74e9",
    "args": {
      "src_acct_name": null,
      "amount": 500000000,
      "minimum_confirmations": 10,
      "max_outputs": 500,
      "num_change_outputs": 1,
      "selection_strategy_is_use_all": false,
      "target_slate_version": 4,
      "payment_proof_recipient_address": null,
      "ttl_blocks": null,
      "send_args": null
    }
  }
}
```
:::
::: details Ok Response
```JSON
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": {
      "amount": "500000000",
      "coin_type": "mwc",
      "compact_slate": true,
      "fee": "7000000",
      "height": "2623963",
      "id": "17478843-f5d5-4c6b-8b31-a824969d8461",
      "lock_height": "0",
      "network_type": "mainnet",
      "num_participants": 2,
      "participant_data": [
        {
          "id": "0",
          "message": null,
          "message_sig": null,
          "part_sig": null,
          "public_blind_excess": "02da83f0564f1fd3f286081cc1b456b9829e391b9342a66a66da7477902ce5181c",
          "public_nonce": "03dcf7dd591c90e431374c27e75ebc1a2eb94fcf758f2789104b7b4b2500411bab"
        }
      ],
      "payment_proof": null,
      "ttl_cutoff_height": null,
      "tx": {
        "body": {
          "inputs": [
            {
              "commit": "09fa0929c293e230f8f2b93912eeb922f7531b48ae70c0866cde0122126ad023af",
              "features": "Plain"
            },
            {
              "commit": "08c189605f542625b0e35eebe1bfe491f3a7ff3a5e05984a62715342a361d13103",
              "features": "Plain"
            }
          ],
          "kernels": [
            {
              "excess": "000000000000000000000000000000000000000000000000000000000000000000",
              "excess_sig": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "features": "Plain",
              "fee": "7000000",
              "lock_height": "0"
            }
          ],
          "outputs": [
            {
              "commit": "08b4604d29b8e6b1fdca342250fd14a32bba6eeaf364af7f3f406a3f2f58ebd0aa",
              "features": "Plain",
              "proof": "2c06ef1a38fc7adefdd7ea0143d3b0207d12f42c92e13096d9c00ff3ebe6a4d92c5c6fc7f81e8cf23c6bf2d53e8aba121396f8ae3fd382d7d0867b2dd50f054b05b1bff3c62c058df4d51faa711d49f38840b7622104c0ae60c3edcdc4bc39d09c5d7686ee9ce6fda121e29ae629bb7c5502cb984bf1ef28b08ae553258ddb71f69a9a794a2fe1c396a38fe070e667fec5f247b20e2d9e87ebe8a9a1f180b789ba84d37148f93eb3a86e683b515eaac6e5a82f96d72382d6b2368441ff84d68f7f47a94dfed470fb06e7beba563fe33d791951cf8dc6ecb2e1581e4ecfb587752f8ca95ad147c3f1e734126659d02495dfeec5dea757f73f63bf7c0d9af01cabb1e7a9988788a9685def7d707d59c104ee3dcab5e52563b8b934fa649d3d9750f879ac503b4e8a5ad2592ef7b29b42ef5d2d96b35d5c549a8ae8bf8485e9fda22cee277ece54529fb2deb552f2bd3ed59da9268f3f6314a57c7c2885de83713b124301fe22f6ced46ffae9fabbc6be8bca10a2438d66d816e8a1a20f3b4967045d3b49489a0eae85cba4cf8123d233e916ad01720e2ada319eba980b6d9a9e67cc4c8d049efdc0cfd6fa16d2f0535113ba7f0fb401b6cffd35b97248acbc9148d81c575413274125aca3b6418a9b01d1c7c9387a47d510b9fa2903e1edcf9b973fcd1cb3fa43fdb1330d7c175c6509d560592c26d0e556e6de69f39dadb86297634eed7ce238035a846f2754200abec6289dabc3ca19bcd01610061c0d211b75f7c4f4905bf81f04a2d981bc75eb8c4c651eb7ded10d64dec78474f103d2dd6673e6ed30daf9ab927de0c9468975d631810603c1f8b81093be88a6a508c6d6d4c18e7321ee20f55cd865d29d67157383662f87ad190e9bcbbcf854a5bcaf60687450b296afc0259739fce91bae74b8ba52a5ef0a7b32e5d84b29dbcb027c5f9687ad03"
            }
          ]
        },
        "offset": "0000000000000000000000000000000000000000000000000000000000000000"
      },
      "version_info": {
        "block_header_version": 2,
        "orig_version": 3,
        "version": 3
      }
    }
  }
}
```
:::


### **Step 2: Encode Slatepack**

The transaction slate is encoded into a Slatepack message for sharing with the recipient using [encode_slatepack_message](https://docs.rs/mwc_wallet_api/5.3.4/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.encode_slatepack_message).

`encode_slatepack_message` <Badge type="info" text="POST" />

| Parameter       | Type    | Description                                                            |
|------------------|---------|------------------------------------------------------------------------|
| `token`         | String  | API token for authentication.                                         |
| `slate`         | Object  | The slate object returned from `init_send_tx`.                        |
| `content`       | String  | The content type of the Slatepack (e.g., `SendInitial`).              |
| `recipient`     | String  | Optional. Recipient’s address for payment proof (if required).        |
| `address_index` | Integer | Optional. Index of the sender's address for the Slatepack.            |

---
::: details Request Example
```JSON
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "encode_slatepack_message",
  "params": {
    "token": "f97e6cfd63b5332ef40e91203458058ef68c7646ab0f4d0f419cdcd5056f74e9",
    "slate": {
      "amount": "500000000",
      "coin_type": "mwc",
      "compact_slate": true,
      "fee": "7000000",
      "height": "2623963",
      "id": "17478843-f5d5-4c6b-8b31-a824969d8461",
      "lock_height": "0",
      "network_type": "mainnet",
      "num_participants": 2,
      "participant_data": [
        {
          "id": "0",
          "message": null,
          "message_sig": null,
          "part_sig": null,
          "public_blind_excess": "02da83f0564f1fd3f286081cc1b456b9829e391b9342a66a66da7477902ce5181c",
          "public_nonce": "03dcf7dd591c90e431374c27e75ebc1a2eb94fcf758f2789104b7b4b2500411bab"
        }
      ],
      "payment_proof": null,
      "ttl_cutoff_height": null,
      "tx": {
        "body": {
          "inputs": [
            {
              "commit": "09fa0929c293e230f8f2b93912eeb922f7531b48ae70c0866cde0122126ad023af",
              "features": "Plain"
            },
            {
              "commit": "08c189605f542625b0e35eebe1bfe491f3a7ff3a5e05984a62715342a361d13103",
              "features": "Plain"
            }
          ],
          "kernels": [
            {
              "excess": "000000000000000000000000000000000000000000000000000000000000000000",
              "excess_sig": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "features": "Plain",
              "fee": "7000000",
              "lock_height": "0"
            }
          ],
          "outputs": [
            {
              "commit": "08b4604d29b8e6b1fdca342250fd14a32bba6eeaf364af7f3f406a3f2f58ebd0aa",
              "features": "Plain",
              "proof": "2c06ef1a38fc7adefdd7ea0143d3b0207d12f42c92e13096d9c00ff3ebe6a4d92c5c6fc7f81e8cf23c6bf2d53e8aba121396f8ae3fd382d7d0867b2dd50f054b05b1bff3c62c058df4d51faa711d49f38840b7622104c0ae60c3edcdc4bc39d09c5d7686ee9ce6fda121e29ae629bb7c5502cb984bf1ef28b08ae553258ddb71f69a9a794a2fe1c396a38fe070e667fec5f247b20e2d9e87ebe8a9a1f180b789ba84d37148f93eb3a86e683b515eaac6e5a82f96d72382d6b2368441ff84d68f7f47a94dfed470fb06e7beba563fe33d791951cf8dc6ecb2e1581e4ecfb587752f8ca95ad147c3f1e734126659d02495dfeec5dea757f73f63bf7c0d9af01cabb1e7a9988788a9685def7d707d59c104ee3dcab5e52563b8b934fa649d3d9750f879ac503b4e8a5ad2592ef7b29b42ef5d2d96b35d5c549a8ae8bf8485e9fda22cee277ece54529fb2deb552f2bd3ed59da9268f3f6314a57c7c2885de83713b124301fe22f6ced46ffae9fabbc6be8bca10a2438d66d816e8a1a20f3b4967045d3b49489a0eae85cba4cf8123d233e916ad01720e2ada319eba980b6d9a9e67cc4c8d049efdc0cfd6fa16d2f0535113ba7f0fb401b6cffd35b97248acbc9148d81c575413274125aca3b6418a9b01d1c7c9387a47d510b9fa2903e1edcf9b973fcd1cb3fa43fdb1330d7c175c6509d560592c26d0e556e6de69f39dadb86297634eed7ce238035a846f2754200abec6289dabc3ca19bcd01610061c0d211b75f7c4f4905bf81f04a2d981bc75eb8c4c651eb7ded10d64dec78474f103d2dd6673e6ed30daf9ab927de0c9468975d631810603c1f8b81093be88a6a508c6d6d4c18e7321ee20f55cd865d29d67157383662f87ad190e9bcbbcf854a5bcaf60687450b296afc0259739fce91bae74b8ba52a5ef0a7b32e5d84b29dbcb027c5f9687ad03"
            }
          ]
        },
        "offset": "0000000000000000000000000000000000000000000000000000000000000000"
      },
      "version_info": {
        "block_header_version": 2,
        "orig_version": 3,
        "version": 3
      }
    },
    "content": "SendInitial",
    "recipient": null,
    "address_index": 0
  }
}
```
:::

::: details Ok response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": "BEGINSLATE_BIN. 62GzuKRdyEXA7NS j9ZVB7tYCXotthS ZsjFZkRCmorDE1E LhTdCkxG1RP6A9U HaV64mMmLVcZur2 nyUiJGF4CcpwzGb qUy3uWgP2mp6H2p oXGd4w7GDYTubC2 1fkbtcpbThkSY9p Uw. ENDSLATE_BIN."
  }
}
```
:::   


### **Step 3: Lock Outputs**

The sender ensures the outputs for the transaction are locked using [tx_lock_outputs](https://docs.rs/mwc_wallet_api/5.3.4/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.tx_lock_outputs).

`tx_lock_outputs` <Badge type="info" text="POST" />

| Parameter         | Type   | Description                                                       |
|-------------------|--------|-------------------------------------------------------------------|
| `token`           | String | API token for authentication.                                    |
| `slate`           | String | Encoded Slatepack message from `encode_slatepack_message`.       |
| `participant_id`  | Integer | ID of the participant locking the funds (typically `0` for sender). |


::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tx_lock_outputs",
  "params": {
    "token": "f97e6cfd63b5332ef40e91203458058ef68c7646ab0f4d0f419cdcd5056f74e9",
    "slate": "BEGINSLATE_BIN. 62GzuKRdyEXA7NS j9ZVB7tYCXotthS ZsjFZkRCmorDE1E LhTdCkxG1RP6A9U HaV64mMmLVcZur2 nyUiJGF4CcpwzGb qUy3uWgP2mp6H2p oXGd4w7GDYTubC2 1fkbtcpbThkSY9p Uw. ENDSLATE_BIN.",
    "participant_id": 0
  }
}
```
:::

::: details Ok Response
```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"Ok": null
	}
}
```
:::


### **Step 4: Sending the Initial Slatepack to the User**
After creating and encoding the initial slate, you must share the slatepack with the recipient. Typically, this is done through a secure channel, such as a file, email, or a messaging service.

**Example Slatepack to Share with the Recipient:**

```
BEGINSLATE_BIN. 62GzuKRdyEXA7NS j9ZVB7tYCXotthS ZsjFZkRCmorDE1E LhTdCkxG1RP6A9U HaV64mMmLVcZur2 nyUiJGF4CcpwzGb qUy3uWgP2mp6H2p oXGd4w7GDYTubC2 1fkbtcpbThkSY9p Uw. ENDSLATE_BIN.
```

### Step 5: Waiting for the Recipient's Response
Once the recipient receives the initial slatepack, they will process it on their side using their wallet. After signing and updating the slate, the recipient will generate a response slatepack and send it back to you.

**Example Response Slatepack:**
```
BEGINSLATE_BIN. oqubcv5dAuwDxnH mWc3UHM1JLj5XFd uv8qHNDgFzjpYFG zafDB1dptWRpYzq Qd2NpAeBb3RyTRU DcejJRc7zSx7VJ6 8ix3VeBAJWK9BGJ adXPdv7NJv2zV6h 41ZNzuwmGWdSaRx NjKJ9DK34UE7zjN RLsscBQU8WE7mnR Ubgft22oQ9mWrK2 6fadNCSnXg9sgsU v7VqbFVxdLjjznS 1W5taRMEpfGz4Ek ijdGDNqSvMAgiDo nWA4PFxRzcrZGHa dX17YaerjMdzdAo JFn49UyUMjpYg7b dTyLju2MLNB1cSW mAjkLbZLDYFQsGf xw6WuTHBvmQC49W ePHdroTbAUgkXtY csudeEcKcpkJrGf D8j2hKsn5zCn4wR CGmoEVuh2q4ejsX dtGhoB5hXbx91jY vJ5acUE5Jc1oydG MVjfHK3tjKNh4xN a3LrMZe5nkSWXxr 766pywJhPKUpWza FWGF12BG3zoQCmt DNmja1TKakmsbjT V8dM9vi3RqpHGVX QpU1hvBZ62Bj8SL CicYsYymoFXKvbX 5aDQUhAQVaRCBQQ jp1ie5wzRD4mH3z PMCvfQT696XYTcj u99WH1zBHHjKfKU aKVWzForHA7feHD rasSGUAS3WBptGt q6tN18rdxSHxTZ2 YRxJxoBLtwa1goZ DSpJ19bxPvsaaHr eHmUiyc5K1nTxNZ xZZufzXMA8evkQp CcUAJxdgE12GqTA BByRNPC7TF7JW6b uhbVFwWZbdtacDA VeGQz3bpxVfa179 u31sxVz4p9WTTzS EdtkgbUGcbtvikk VetmoqsPuTG5DeX sR6vMuvy5MQFYfv EyayGxnLmYrp8at YV834WdgNr65xRj vfWaSwsA5nXxZUd xzsE5y4SUrFte3M 3VdgwTyRxb42Ht5 z6RmQaVEz8FQfPK dWBuSQ2FtzdLMRX L2wyNN2ozWpkV7D LwTsf85aCn9mCoV JN9HRDYuCbvpS7g aTBQF5Wn5aCKd9E xrmBHwUGv1Memur AzgxeHmxJHpQTDt QJt7q1EtRPeCZbn 9QnfS9XiqNMLpZE K6sdPWL8WFvwx3z shLTmUaQiYGnGTX KLeirUMcmRH7Siq m4LztkN9h8UY4m6 briuHjEzFFodxDi nTf1zuCnNsXM8fM PxQ8XLySYSgfsWk YthU8CN4eNUkSib rYzc8EFqiEduqdA UfdoNDh4QmchHRk ygvDP1L1vRYcA9d fBcn5cxbAmFuAPP kXuyh6UBEuqASeV 9T38rYMmyRNj9oW EdUGJqoyH1RnnNc Sk9wFqZTufpM6Yb QYQmEYpxL51M2EY 2fmiCfCvTWvTLYW NZFJZxN48giREEB 3vYkAnnRuZ7kevF oAoViG8e8efjhQw Gj. ENDSLATE_BIN.
```



### Step 6: Finalize the Transaction
The sender finalizes the transaction by combining all signatures and preparing the transaction for broadcast using the [finalize_tx]() method (HTTP POST).

`finalize_tx` <Badge type="info" text="POST" />
::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "finalize_tx",
  "params": {
    "token": "f97e6cfd63b5332ef40e91203458058ef68c7646ab0f4d0f419cdcd5056f74e9",
    "slate": "BEGINSLATE_BIN. oqubcv5dAuwDxnH mWc3UHM1JLj5XFd uv8qHNDgFzjpYFG zafDB1dptWRpYzq Qd2NpAeBb3RyTRU DcejJRc7zSx7VJ6 8ix3VeBAJWK9BGJ adXPdv7NJv2zV6h 41ZNzuwmGWdSaRx NjKJ9DK34UE7zjN RLsscBQU8WE7mnR Ubgft22oQ9mWrK2 6fadNCSnXg9sgsU v7VqbFVxdLjjznS 1W5taRMEpfGz4Ek ijdGDNqSvMAgiDo nWA4PFxRzcrZGHa dX17YaerjMdzdAo JFn49UyUMjpYg7b dTyLju2MLNB1cSW mAjkLbZLDYFQsGf xw6WuTHBvmQC49W ePHdroTbAUgkXtY csudeEcKcpkJrGf D8j2hKsn5zCn4wR CGmoEVuh2q4ejsX dtGhoB5hXbx91jY vJ5acUE5Jc1oydG MVjfHK3tjKNh4xN a3LrMZe5nkSWXxr 766pywJhPKUpWza FWGF12BG3zoQCmt DNmja1TKakmsbjT V8dM9vi3RqpHGVX QpU1hvBZ62Bj8SL CicYsYymoFXKvbX 5aDQUhAQVaRCBQQ jp1ie5wzRD4mH3z PMCvfQT696XYTcj u99WH1zBHHjKfKU aKVWzForHA7feHD rasSGUAS3WBptGt q6tN18rdxSHxTZ2 YRxJxoBLtwa1goZ DSpJ19bxPvsaaHr eHmUiyc5K1nTxNZ xZZufzXMA8evkQp CcUAJxdgE12GqTA BByRNPC7TF7JW6b uhbVFwWZbdtacDA VeGQz3bpxVfa179 u31sxVz4p9WTTzS EdtkgbUGcbtvikk VetmoqsPuTG5DeX sR6vMuvy5MQFYfv EyayGxnLmYrp8at YV834WdgNr65xRj vfWaSwsA5nXxZUd xzsE5y4SUrFte3M 3VdgwTyRxb42Ht5 z6RmQaVEz8FQfPK dWBuSQ2FtzdLMRX L2wyNN2ozWpkV7D LwTsf85aCn9mCoV JN9HRDYuCbvpS7g aTBQF5Wn5aCKd9E xrmBHwUGv1Memur AzgxeHmxJHpQTDt QJt7q1EtRPeCZbn 9QnfS9XiqNMLpZE K6sdPWL8WFvwx3z shLTmUaQiYGnGTX KLeirUMcmRH7Siq m4LztkN9h8UY4m6 briuHjEzFFodxDi nTf1zuCnNsXM8fM PxQ8XLySYSgfsWk YthU8CN4eNUkSib rYzc8EFqiEduqdA UfdoNDh4QmchHRk ygvDP1L1vRYcA9d fBcn5cxbAmFuAPP kXuyh6UBEuqASeV 9T38rYMmyRNj9oW EdUGJqoyH1RnnNc Sk9wFqZTufpM6Yb QYQmEYpxL51M2EY 2fmiCfCvTWvTLYW NZFJZxN48giREEB 3vYkAnnRuZ7kevF oAoViG8e8efjhQw Gj. ENDSLATE_BIN."
  }
}
:::


:::details Ok Response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": "BEGINSLATE_BIN. DecAL8ynyrUGJbv D1T6idiKkDJGiNY 4WaXVvtderipXh7 mitgn75WP5MMEzT 5rWwC2nJaUBmFK2 RHeaG1Yn9nWXYmF k5xXFyZMkfBgmcJ AWozt1BvEtQ5yFa KVnePxVbmF81RDX 1LEpLk77jEunjs5 sGZw6A7NLCmcYBM 44MchnXhhsK3cru hPjpyEtLz5DnXPz wKgLgrtUqQ9edVM c6owqEHEd24dkM7 Gi2Ybc1E6wb1Btb 2Et9SqeFi1aJFWG UpJ98pLj5jLedyS kQDwRRcKCJ2gxEA tb3KwRCocWzbtTw TY4HvWegzQiArWK Rpe7rsQs73F6rC1 81HaBsrcERtDhsj ehD5geYhezLkWnu obocrTVXEyipB2Q 2dx8qvjdwb1iiec C8F7nK6qzyPcdLV WMXxknGySX6pxqf b6rtWWxXWAGNjkk aoVtsr45nZ7trhs HyyNkf8cthWLYi6 Bs3zQk1X3V4nkDj n5AhgKdxRJeFoNj SJAQRGvcsYWWZPi BRZj6TqAP5LkCmk 5LoDzDZVKRAf67w U7W7ceZ2doJG1up YPMrGgzMS3ehU4A Up5aXPHoB5gGLQB whU5vmpcSYbiHKr DtUiX4Q98ESencT 4hGgPJzCs9p5GrW QCrCHGCDR8yetzz xqYuyrLrKi8tWCA Sc1ftnbMWKYJiXp 9HJmFyaLnFbkw6i ETBqSkJJdRaikpo QJdtb9q32oWThMv hWxQNn5JjG5GuHA 1fZxBwQHd2yHHa7 S22B2mzMqM215WW px6Xd2HKw5m7JBJ adNK1fvSuBS8Vfr ssjUvVgcenA2MfN vojHKLy8nfdkJt5 9kYJedbYVJhp4Ez Lw4QtDHBWGEVsFf eYEpr8o6FaftKPZ GNDHZo6noiRcMiZ HvfWqBARJkq5JeE HoPXaz2fy4mKPJA qxgzejoMLxhRg2m hHHiTKqFqTBxPbC ERkdAiw6EkXPFbR c7eA7tENKy6zCRm AL17C5kMGFMvKD9 xMm8KZFbKJMzutQ KA1XwPWmD34ARsJ xK6J7F2HPLwStAC ifCRHSxTbvuvyJr CDFjAneudpB7M9V jWh3AoFBBRJ4K4V r3uJ4bXxtojobLG pRb1t74dtpYDQd6 fYkqbkVV4vhmj6w HsbxTkDD9ECsNPs azVHpxJgtE2TiQG jfweBMptrqwQk2b Rb9ym1aM1Dn3Unb pdoRggWL5d6jQsL eNobfZapvXPEZ9i DbX62ZRNcpYXAgG nvwXpnVxzq5TsgC nEp4nBrPN7qxihg EbXYVvh4wg8MYzz 4ZZVo8mMPW3oSb6 8aY7aeF5AgKL2yQ 1LYoXEzbPoizBj7 vX3VgzqpBPnYKfB 5Yjpx9G21tEgCFR NtkH4sgtzcqYfhM hjH2vbTaecSeSmU Tp1kxUFM2VbU89j nV83fbM2V9JjqYu SQru21HLkjw23W3 vstETXieLM69Uys qmV4cYC4M3LQdpF QARsoQVNbi2FVD7 TqmU4RMKEDxwYG2 P3UXgb994R57pHf Fg3vghhBujNxJcu 1DCaYXFSgdAorqh MeyBoq6NYeXesRV cL7Lm7hQicJFmSt QeSc3sY9kqxfpRM CJghqoYUjqgAQmP c5kStJoFpsDoJ3v uRvNUnJtnm85ZaR 2dU6FDvCMHm7NxN D8yNvmY5zFcwqGY DFmPm1hfy83jNzz GmyaCXfUTwLx7EZ eigsq8U5ouY4RKU zpj7AHjcu3P1zNd BW6HmywBmAEww3N mDne1DFDHMrwa7A WyMXiqG8T4bpMPp rbWgJPh7hKQsmqc wQhSFDkRwQSdzdZ K9HA9vFXAeK8bcL Cpza5LVWnBiarLQ 6dQWwAqcZTiUW82 xHnoFNGLqCktqdP L3Euf3N5qHg7RYN uERsgDQLS69tr1c CdsG1HtgDtzDooo aHRRmRtdbiYRbbS Q5iQHxdvumG6hVS qpryazHfDQYaKKB vPKScd39WPb7TQL 4E1jhZx5F9tPKBU iXf6nQYQasBxii5 hXPYB3XcGWTKWv9 BQaszhqwsawjGk6 b4tTqqd9xCXRppb Qx13NJWBgcqqSRg rmx7aEuQmph7sZw wFPs2TQm7zfm3bp sQHqspJMGuA5xqW xSxiE8rcSbP17Y9 2q8iDYKZ2LdhbqN BfX8byYhMuxJm99 C8sj71Ex7ZZtjBY obgU5yTzffoGagq T5emFEkHgLeK6rw jCqiVX4GZCdfETA PuJHDAxeayFQ5uK mFfPmrgkTc3Ayyo yiyngZFc5Lqywjx sGFAW9LRUFPRP9m 1ggfjY6AW3ouEhF Ub4GHoEwDw2X1c3 A61xf9K2LESUmoq C6xYFaJ179msRkY RPVR9PXhvHeiEdf Lq4mmzByTkwKXBw n8zeYw3SCD4eVv2 TFKa9oQmSCfuSTk EW5o9DCZTYNayFy xkwG59DGunN6Qoz 2DyhMncipTxwXa2 2NkpagKZ7HaVDsc z9nWFP9vsVciaLi p6M2qkUDT1s6gMX F8UMy3MTnoz4sFa pwTH4Mh921P2ZHT WKf8unhrqRcWpFo x3mTMouP8v52MaC SNhWX4BRWAgdXgu PExryv4txdrPRVC q75k7gRkDsekdv8 rXczqUXse5HgveL 2iRu6zpLQvBmZva ie3jWDr6KucXKrS 3. ENDSLATE_BIN."
  }
}
```
:::

### Step 7: Decode the Finalized Slate

Once the transaction is finalized, the next step is to decode the finalized Slatepack. Decoding reveals the transaction details necessary for broadcasting to the node and logging. The decoded slate includes critical information such as inputs, outputs, transaction kernels, and the offset value. Specifically, you need to extract the `slate.tx` object, which represents the finalized transaction. 

`decode_slatepack_message` <Badge type="info" text="POST" />

| Parameter         | Type    | Description                                                       |
|-------------------|---------|-------------------------------------------------------------------|
| `token`           | String  | API token for authentication.                                    |
| `message`         | String  | The Slatepack message to be decoded.                             |
| `address_index`   | Integer | Optional address index for receiving, defaults to `null`.        |

::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "decode_slatepack_message",
  "params": {
    "token": "f97e6cfd63b5332ef40e91203458058ef68c7646ab0f4d0f419cdcd5056f74e9",
    "message": "BEGINSLATE_BIN. DecAL8ynyrUGJbv D1T6idiKkDJGiNY 4WaXVvtderipXh7 mitgn75WP5MMEzT 5rWwC2nJaUBmFK2 RHeaG1Yn9nWXYmF k5xXFyZMkfBgmcJ AWozt1BvEtQ5yFa KVnePxVbmF81RDX 1LEpLk77jEunjs5 sGZw6A7NLCmcYBM 44MchnXhhsK3cru hPjpyEtLz5DnXPz wKgLgrtUqQ9edVM c6owqEHEd24dkM7 Gi2Ybc1E6wb1Btb 2Et9SqeFi1aJFWG UpJ98pLj5jLedyS kQDwRRcKCJ2gxEA tb3KwRCocWzbtTw TY4HvWegzQiArWK Rpe7rsQs73F6rC1 81HaBsrcERtDhsj ehD5geYhezLkWnu obocrTVXEyipB2Q 2dx8qvjdwb1iiec C8F7nK6qzyPcdLV WMXxknGySX6pxqf b6rtWWxXWAGNjkk aoVtsr45nZ7trhs HyyNkf8cthWLYi6 Bs3zQk1X3V4nkDj n5AhgKdxRJeFoNj SJAQRGvcsYWWZPi BRZj6TqAP5LkCmk 5LoDzDZVKRAf67w U7W7ceZ2doJG1up YPMrGgzMS3ehU4A Up5aXPHoB5gGLQB whU5vmpcSYbiHKr DtUiX4Q98ESencT 4hGgPJzCs9p5GrW QCrCHGCDR8yetzz xqYuyrLrKi8tWCA Sc1ftnbMWKYJiXp 9HJmFyaLnFbkw6i ETBqSkJJdRaikpo QJdtb9q32oWThMv hWxQNn5JjG5GuHA 1fZxBwQHd2yHHa7 S22B2mzMqM215WW px6Xd2HKw5m7JBJ adNK1fvSuBS8Vfr ssjUvVgcenA2MfN vojHKLy8nfdkJt5 9kYJedbYVJhp4Ez Lw4QtDHBWGEVsFf eYEpr8o6FaftKPZ GNDHZo6noiRcMiZ HvfWqBARJkq5JeE HoPXaz2fy4mKPJA qxgzejoMLxhRg2m hHHiTKqFqTBxPbC ERkdAiw6EkXPFbR c7eA7tENKy6zCRm AL17C5kMGFMvKD9 xMm8KZFbKJMzutQ KA1XwPWmD34ARsJ xK6J7F2HPLwStAC ifCRHSxTbvuvyJr CDFjAneudpB7M9V jWh3AoFBBRJ4K4V r3uJ4bXxtojobLG pRb1t74dtpYDQd6 fYkqbkVV4vhmj6w HsbxTkDD9ECsNPs azVHpxJgtE2TiQG jfweBMptrqwQk2b Rb9ym1aM1Dn3Unb pdoRggWL5d6jQsL eNobfZapvXPEZ9i DbX62ZRNcpYXAgG nvwXpnVxzq5TsgC nEp4nBrPN7qxihg EbXYVvh4wg8MYzz 4ZZVo8mMPW3oSb6 8aY7aeF5AgKL2yQ 1LYoXEzbPoizBj7 vX3VgzqpBPnYKfB 5Yjpx9G21tEgCFR NtkH4sgtzcqYfhM hjH2vbTaecSeSmU Tp1kxUFM2VbU89j nV83fbM2V9JjqYu SQru21HLkjw23W3 vstETXieLM69Uys qmV4cYC4M3LQdpF QARsoQVNbi2FVD7 TqmU4RMKEDxwYG2 P3UXgb994R57pHf Fg3vghhBujNxJcu 1DCaYXFSgdAorqh MeyBoq6NYeXesRV cL7Lm7hQicJFmSt QeSc3sY9kqxfpRM CJghqoYUjqgAQmP c5kStJoFpsDoJ3v uRvNUnJtnm85ZaR 2dU6FDvCMHm7NxN D8yNvmY5zFcwqGY DFmPm1hfy83jNzz GmyaCXfUTwLx7EZ eigsq8U5ouY4RKU zpj7AHjcu3P1zNd BW6HmywBmAEww3N mDne1DFDHMrwa7A WyMXiqG8T4bpMPp rbWgJPh7hKQsmqc wQhSFDkRwQSdzdZ K9HA9vFXAeK8bcL Cpza5LVWnBiarLQ 6dQWwAqcZTiUW82 xHnoFNGLqCktqdP L3Euf3N5qHg7RYN uERsgDQLS69tr1c CdsG1HtgDtzDooo aHRRmRtdbiYRbbS Q5iQHxdvumG6hVS qpryazHfDQYaKKB vPKScd39WPb7TQL 4E1jhZx5F9tPKBU iXf6nQYQasBxii5 hXPYB3XcGWTKWv9 BQaszhqwsawjGk6 b4tTqqd9xCXRppb Qx13NJWBgcqqSRg rmx7aEuQmph7sZw wFPs2TQm7zfm3bp sQHqspJMGuA5xqW xSxiE8rcSbP17Y9 2q8iDYKZ2LdhbqN BfX8byYhMuxJm99 C8sj71Ex7ZZtjBY obgU5yTzffoGagq T5emFEkHgLeK6rw jCqiVX4GZCdfETA PuJHDAxeayFQ5uK mFfPmrgkTc3Ayyo yiyngZFc5Lqywjx sGFAW9LRUFPRP9m 1ggfjY6AW3ouEhF Ub4GHoEwDw2X1c3 A61xf9K2LESUmoq C6xYFaJ179msRkY RPVR9PXhvHeiEdf Lq4mmzByTkwKXBw n8zeYw3SCD4eVv2 TFKa9oQmSCfuSTk EW5o9DCZTYNayFy xkwG59DGunN6Qoz 2DyhMncipTxwXa2 2NkpagKZ7HaVDsc z9nWFP9vsVciaLi p6M2qkUDT1s6gMX F8UMy3MTnoz4sFa pwTH4Mh921P2ZHT WKf8unhrqRcWpFo x3mTMouP8v52MaC SNhWX4BRWAgdXgu PExryv4txdrPRVC q75k7gRkDsekdv8 rXczqUXse5HgveL 2iRu6zpLQvBmZva ie3jWDr6KucXKrS 3. ENDSLATE_BIN.",
    "address_index": null
  }
}
```
:::

::: details Ok Response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": {
      "content": "FullSlate",
      "recipient": null,
      "sender": null,
      "slate": {
        "amount": "500000000",
        "coin_type": "mwc",
        "compact_slate": true,
        "fee": "7000000",
        "height": "2623963",
        "id": "17478843-f5d5-4c6b-8b31-a824969d8461",
        "lock_height": "0",
        "network_type": "mainnet",
        "num_participants": 2,
        "participant_data": [
          {
            "id": "0",
            "message": null,
            "message_sig": null,
            "part_sig": "ab1b4100254b7b4b1089278f75cf4fb92e1abc5ee7274c3731e4901c59ddf7dc6b8550dc10dd06febe39c39935db6b4216fc61dfda45c6cc3682d11462be94fb",
            "public_blind_excess": "02da83f0564f1fd3f286081cc1b456b9829e391b9342a66a66da7477902ce5181c",
            "public_nonce": "03dcf7dd591c90e431374c27e75ebc1a2eb94fcf758f2789104b7b4b2500411bab"
          },
          {
            "id": "1",
            "message": null,
            "message_sig": null,
            "part_sig": "ced51703d94ffb98dbfab103ab0a8acc13bec7542f90498ee9afd55d7cbfe221c0558801e884385fb793a30c90db3f9f1c60ff26176f9190672c32a352f806b1",
            "public_blind_excess": "030d87263b0acfba235f457cfb5bd0243248d369851c9c57dc866faee103774f95",
            "public_nonce": "0321e2bf7c5dd5afe98e49902f54c7be13cc8a0aab03b1fadb98fb4fd90317d5ce"
          }
        ],
        "payment_proof": null,
        "ttl_cutoff_height": null,
        "tx": {
          "body": {
            "inputs": [
              {
                "commit": "09fa0929c293e230f8f2b93912eeb922f7531b48ae70c0866cde0122126ad023af",
                "features": "Plain"
              },
              {
                "commit": "08c189605f542625b0e35eebe1bfe491f3a7ff3a5e05984a62715342a361d13103",
                "features": "Plain"
              }
            ],
            "kernels": [
              {
                "excess": "085303a4a1876a64f5c4fe116dca3b1c4e914e80960f16fab58dabef35ab654178",
                "excess_sig": "e5249a0abb0d2a5d275a18a28ae446cad91a7161062dde7b11e502e92756b288ea99a20d6c036d9d3a2d1ef7ded9fc26345c6106f2b4575d9eae03b8b4b69bac",
                "features": "Plain",
                "fee": "7000000",
                "lock_height": "0"
              }
            ],
            "outputs": [
              {
                "commit": "08b4604d29b8e6b1fdca342250fd14a32bba6eeaf364af7f3f406a3f2f58ebd0aa",
                "features": "Plain",
                "proof": "2c06ef1a38fc7adefdd7ea0143d3b0207d12f42c92e13096d9c00ff3ebe6a4d92c5c6fc7f81e8cf23c6bf2d53e8aba121396f8ae3fd382d7d0867b2dd50f054b05b1bff3c62c058df4d51faa711d49f38840b7622104c0ae60c3edcdc4bc39d09c5d7686ee9ce6fda121e29ae629bb7c5502cb984bf1ef28b08ae553258ddb71f69a9a794a2fe1c396a38fe070e667fec5f247b20e2d9e87ebe8a9a1f180b789ba84d37148f93eb3a86e683b515eaac6e5a82f96d72382d6b2368441ff84d68f7f47a94dfed470fb06e7beba563fe33d791951cf8dc6ecb2e1581e4ecfb587752f8ca95ad147c3f1e734126659d02495dfeec5dea757f73f63bf7c0d9af01cabb1e7a9988788a9685def7d707d59c104ee3dcab5e52563b8b934fa649d3d9750f879ac503b4e8a5ad2592ef7b29b42ef5d2d96b35d5c549a8ae8bf8485e9fda22cee277ece54529fb2deb552f2bd3ed59da9268f3f6314a57c7c2885de83713b124301fe22f6ced46ffae9fabbc6be8bca10a2438d66d816e8a1a20f3b4967045d3b49489a0eae85cba4cf8123d233e916ad01720e2ada319eba980b6d9a9e67cc4c8d049efdc0cfd6fa16d2f0535113ba7f0fb401b6cffd35b97248acbc9148d81c575413274125aca3b6418a9b01d1c7c9387a47d510b9fa2903e1edcf9b973fcd1cb3fa43fdb1330d7c175c6509d560592c26d0e556e6de69f39dadb86297634eed7ce238035a846f2754200abec6289dabc3ca19bcd01610061c0d211b75f7c4f4905bf81f04a2d981bc75eb8c4c651eb7ded10d64dec78474f103d2dd6673e6ed30daf9ab927de0c9468975d631810603c1f8b81093be88a6a508c6d6d4c18e7321ee20f55cd865d29d67157383662f87ad190e9bcbbcf854a5bcaf60687450b296afc0259739fce91bae74b8ba52a5ef0a7b32e5d84b29dbcb027c5f9687ad03"
              },
              {
                "commit": "09c105a8dc8cc2f34c19b245740f2ae0371c9326ef800859c5d4386310c2ad21d7",
                "features": "Plain",
                "proof": "9c7787830dc9ab4aa19fdda2d9bb1b3853c2a1250deb22c7e84cceef25f8d310157621418782e8f64d9427a6db2fd4638b16c855fa5a58d8a2f1e425e76eef150dce9417b8459eb1cae9f5a3926c94fb03cf453fadf4fe30ca551977ea3a27a33b5b62550c6226c6496920e0b598a86cfc4f7979b0ec39737a69e468525b832af9537020bd5105551305c143562239b8eab1eb2c70cf77fedff01bb050d6b8ae8c41d3f290144b5005c98c0d9f3ad5beb3499ab6662fe77a8cfef7c512b61b0ac8b787fd1070a7477645917fc3920f182cedc992ef9ab590078f29f0b4e62690348056fd7ec15c43d18c67fa2f8a573c2056db885a00255c53985cb8d96554518325aab49fc5b4ac1ec42824b7b0bd311259bc6521433fa3c0cd6dc21c720b1982e8020be843a728265a7f4dec731cfa9c40ecf2c46b8ba17011e4f164597cc0406375337f2dc455e5f2642b7d92fdfe1b0ee28ef87b7d899c4d40d48add809c3184017acb628d9e9538956b50d6cfba573ae28e189966be0590a261fa4d6b14aff30081f5bf9c2e506ae34fed8d4c0de8067a540fa9d548964bef80f4e56fdccf812656951bcb78219f532f981ddb0329b097f05bad49126a2958b6da1d88d0054da4dff603e36c890e158d8d07a07c7de4c727b1fff33517283da026ccd295f3c470ede51a490052c3f50047262148b9a56309a2015da9b149f62a1005ba004b940ebe2987d42cf0fc66831527da2143e82fccb0d6ef2d787e0b481ac4d0d3eb6cbc20ca7c1a8880f2409379159dcefbc376fda7f4778d8fba577d4c3f21dd145d9f733e97146cfceaa72ff4869a981de8ad192bf37a85b3b0643d7d605197707b6cda9453087d7182d20d71ace44e6d2a8e0e66249366b416217f056da7577cfa43cf92aa6ddb0e121f496d5b705efbe71ebe9724e3cbc279b21cbe7bbfae044cb3"
              }
            ]
          },
          "offset": "81e56ca4ef559918e53eab19fff2ed258a7cfac4239558ab0518bb6dfc25f2f3"
        },
        "version_info": {
          "block_header_version": 1,
          "orig_version": 3,
          "version": 3
        }
      }
    }
  }
}
```
:::



### Step 8: Broadcast it to the node 

Once the finalized slate has been decoded, extract the `slate.tx` object from the decoded slate. This object contains the transaction details, including inputs, outputs, kernels, and the offset. These details must be used as parameters in the broadcast request to the node.

The `post_tx` method is then called to broadcast the transaction. This step sends the finalized transaction to the node, allowing it to propagate across the MWC network. Ensure the tx parameter extracted from the decoded slate is correctly included in the request. 

`post_tx` <Badge type="info" text="POST" />

| Parameter         | Type    | Description                                                       |
|-------------------|---------|-------------------------------------------------------------------|
| `token`           | String  | API token for authentication.                                    |
| `tx`              | Object  | The transaction object extracted from the decoded `slate.tx`.    |
| `fluff`           | Boolean | Whether to propagate the transaction immediately (`true`) or allow the node to decide (`false`). |

::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "post_tx",
  "params": {
    "token": "f97e6cfd63b5332ef40e91203458058ef68c7646ab0f4d0f419cdcd5056f74e9",
    "tx": {
      "body": {
        "inputs": [
          {
            "commit": "09fa0929c293e230f8f2b93912eeb922f7531b48ae70c0866cde0122126ad023af",
            "features": "Plain"
          },
          {
            "commit": "08c189605f542625b0e35eebe1bfe491f3a7ff3a5e05984a62715342a361d13103",
            "features": "Plain"
          }
        ],
        "kernels": [
          {
            "excess": "085303a4a1876a64f5c4fe116dca3b1c4e914e80960f16fab58dabef35ab654178",
            "excess_sig": "e5249a0abb0d2a5d275a18a28ae446cad91a7161062dde7b11e502e92756b288ea99a20d6c036d9d3a2d1ef7ded9fc26345c6106f2b4575d9eae03b8b4b69bac",
            "features": "Plain",
            "fee": "7000000",
            "lock_height": "0"
          }
        ],
        "outputs": [
          {
            "commit": "08b4604d29b8e6b1fdca342250fd14a32bba6eeaf364af7f3f406a3f2f58ebd0aa",
            "features": "Plain",
            "proof": "2c06ef1a38fc7adefdd7ea0143d3b0207d12f42c92e13096d9c00ff3ebe6a4d92c5c6fc7f81e8cf23c6bf2d53e8aba121396f8ae3fd382d7d0867b2dd50f054b05b1bff3c62c058df4d51faa711d49f38840b7622104c0ae60c3edcdc4bc39d09c5d7686ee9ce6fda121e29ae629bb7c5502cb984bf1ef28b08ae553258ddb71f69a9a794a2fe1c396a38fe070e667fec5f247b20e2d9e87ebe8a9a1f180b789ba84d37148f93eb3a86e683b515eaac6e5a82f96d72382d6b2368441ff84d68f7f47a94dfed470fb06e7beba563fe33d791951cf8dc6ecb2e1581e4ecfb587752f8ca95ad147c3f1e734126659d02495dfeec5dea757f73f63bf7c0d9af01cabb1e7a9988788a9685def7d707d59c104ee3dcab5e52563b8b934fa649d3d9750f879ac503b4e8a5ad2592ef7b29b42ef5d2d96b35d5c549a8ae8bf8485e9fda22cee277ece54529fb2deb552f2bd3ed59da9268f3f6314a57c7c2885de83713b124301fe22f6ced46ffae9fabbc6be8bca10a2438d66d816e8a1a20f3b4967045d3b49489a0eae85cba4cf8123d233e916ad01720e2ada319eba980b6d9a9e67cc4c8d049efdc0cfd6fa16d2f0535113ba7f0fb401b6cffd35b97248acbc9148d81c575413274125aca3b6418a9b01d1c7c9387a47d510b9fa2903e1edcf9b973fcd1cb3fa43fdb1330d7c175c6509d560592c26d0e556e6de69f39dadb86297634eed7ce238035a846f2754200abec6289dabc3ca19bcd01610061c0d211b75f7c4f4905bf81f04a2d981bc75eb8c4c651eb7ded10d64dec78474f103d2dd6673e6ed30daf9ab927de0c9468975d631810603c1f8b81093be88a6a508c6d6d4c18e7321ee20f55cd865d29d67157383662f87ad190e9bcbbcf854a5bcaf60687450b296afc0259739fce91bae74b8ba52a5ef0a7b32e5d84b29dbcb027c5f9687ad03"
          },
          {
            "commit": "09c105a8dc8cc2f34c19b245740f2ae0371c9326ef800859c5d4386310c2ad21d7",
            "features": "Plain",
            "proof": "9c7787830dc9ab4aa19fdda2d9bb1b3853c2a1250deb22c7e84cceef25f8d310157621418782e8f64d9427a6db2fd4638b16c855fa5a58d8a2f1e425e76eef150dce9417b8459eb1cae9f5a3926c94fb03cf453fadf4fe30ca551977ea3a27a33b5b62550c6226c6496920e0b598a86cfc4f7979b0ec39737a69e468525b832af9537020bd5105551305c143562239b8eab1eb2c70cf77fedff01bb050d6b8ae8c41d3f290144b5005c98c0d9f3ad5beb3499ab6662fe77a8cfef7c512b61b0ac8b787fd1070a7477645917fc3920f182cedc992ef9ab590078f29f0b4e62690348056fd7ec15c43d18c67fa2f8a573c2056db885a00255c53985cb8d96554518325aab49fc5b4ac1ec42824b7b0bd311259bc6521433fa3c0cd6dc21c720b1982e8020be843a728265a7f4dec731cfa9c40ecf2c46b8ba17011e4f164597cc0406375337f2dc455e5f2642b7d92fdfe1b0ee28ef87b7d899c4d40d48add809c3184017acb628d9e9538956b50d6cfba573ae28e189966be0590a261fa4d6b14aff30081f5bf9c2e506ae34fed8d4c0de8067a540fa9d548964bef80f4e56fdccf812656951bcb78219f532f981ddb0329b097f05bad49126a2958b6da1d88d0054da4dff603e36c890e158d8d07a07c7de4c727b1fff33517283da026ccd295f3c470ede51a490052c3f50047262148b9a56309a2015da9b149f62a1005ba004b940ebe2987d42cf0fc66831527da2143e82fccb0d6ef2d787e0b481ac4d0d3eb6cbc20ca7c1a8880f2409379159dcefbc376fda7f4778d8fba577d4c3f21dd145d9f733e97146cfceaa72ff4869a981de8ad192bf37a85b3b0643d7d605197707b6cda9453087d7182d20d71ace44e6d2a8e0e66249366b416217f056da7577cfa43cf92aa6ddb0e121f496d5b705efbe71ebe9724e3cbc279b21cbe7bbfae044cb3"
          }
        ]
      },
      "offset": "81e56ca4ef559918e53eab19fff2ed258a7cfac4239558ab0518bb6dfc25f2f3"
    },
    "fluff": false
  }
}
```
:::
::: details Ok Response
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"Ok": null
	}
}
```
:::

If the response is Ok we can assume that the transactions was correctly built, sent to the node and correctly progated to the network.

### Step 9: Track the Confirmation of the Transaction

Once the transaction is broadcasted to the MWC network, you will need to monitor the transaction's status to ensure the number of confirmation.

**Request Example (Query Transaction Status):**


### Summary: Sender Workflow

The sender workflow for an **MWC interactive transaction** involves these key steps:

1. **Initiate Transaction**: Begin creating the transaction.
2. **Encode Slatepack**: Convert the transaction into a shareable slatepack.
3. **Lock Outputs**: Lock the necessary funds for the transaction.
4. **Send Initial Slatepack**: Share the slatepack with the recipient.
5. **Wait for Recipient Response**: Await the recipient's signed slatepack.
6. **Finalize the Transaction**: Complete the transaction process.
7. **Decode the Finalized Slate**: Interpret the finalized slate.
8. **Broadcast to the Network**: Send the transaction to the network for propagation.
9. **Track Confirmation**: Monitor the transaction until confirmed on the blockchain.

## Recipient Workflow

The **Recipient Workflow** is responsible for receiving the initial transaction slate from the sender, processing it, and returning an updated slate to the sender. This interaction is critical for completing the MWC transaction process.

### **Step 1: Receive Transaction and Generate Response Slatepack**

The recipient receives the initial Slatepack from the sender and processes it using the `receive_tx` method. This method updates the slate with the recipient's inputs and outputs.


**Input Slatepack**

The recipient receives the initial Slatepack from the sender. This Slatepack contains all the information needed to process the transaction.

**Example Input Slatepack**:
```
BEGINSLATE_BIN. 62GzuKRdyEXA7NS j9ZVB7tYCXotthS ZsjFZkRCmorDE1E LhTdCkxG1RP6A9U HaV64mMmLVcZur2 nyUiJGF4CcpwzGb qUy3uWgP2mp6H2p oXGd4w7GDYTubC2 1fkbtcpbThkSY9p Uw. ENDSLATE_BIN.
```

Optional:
::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "decode_slatepack_message",
  "params": {
    "token": "f97e6cfd63b5332ef40e91203458058ef68c7646ab0f4d0f419cdcd5056f74e9",
    "message": "BEGINSLATE_BIN. 62GzuKRdyEXA7NS j9ZVB7tYCXotthS ZsjFZkRCmorDE1E LhTdCkxG1RP6A9U HaV64mMmLVcZur2 nyUiJGF4CcpwzGb qUy3uWgP2mp6H2p oXGd4w7GDYTubC2 1fkbtcpbThkSY9p Uw. ENDSLATE_BIN.",
    "address_index": null
  }
}
```
:::

::: details Ok Response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": {
      "content": "SendInitial",
      "recipient": null,
      "sender": null,
      "slate": {
        "amount": "500000000",
        "coin_type": "mwc",
        "compact_slate": true,
        "fee": "7000000",
        "height": "2623963",
        "id": "17478843-f5d5-4c6b-8b31-a824969d8461",
        "lock_height": "0",
        "network_type": "mainnet",
        "num_participants": 2,
        "participant_data": [
          {
            "id": "0",
            "message": null,
            "message_sig": null,
            "part_sig": null,
            "public_blind_excess": "02da83f0564f1fd3f286081cc1b456b9829e391b9342a66a66da7477902ce5181c",
            "public_nonce": "03dcf7dd591c90e431374c27e75ebc1a2eb94fcf758f2789104b7b4b2500411bab"
          }
        ],
        "payment_proof": null,
        "ttl_cutoff_height": null,
        "tx": {
          "body": {
            "inputs": [],
            "kernels": [
              {
                "excess": "08da83f0564f1fd3f286081cc1b456b9829e391b9342a66a66da7477902ce5181c",
                "excess_sig": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "features": "Plain",
                "fee": "7000000",
                "lock_height": "0"
              }
            ],
            "outputs": []
          },
          "offset": "0000000000000000000000000000000000000000000000000000000000000000"
        },
        "version_info": {
          "block_header_version": 1,
          "orig_version": 3,
          "version": 3
        }
      }
    }
  }
}
```
:::
**Processing the Slate**

After processing the initial slate, the recipient updates the slate with their signature and transaction details. This updated slate is encoded into a **response Slatepack**. 

The recipient processes the slate using the `receive_tx` method.


`receive_tx` <Badge type="info" text="POST" />

| Parameter        | Type   | Description                                              |
|-------------------|--------|----------------------------------------------------------|
| `slate`          | String | The initial Slatepack received from the sender.          |
| `dest_acct_name` | String | Optional. The recipient's account name (default if `null`). |
| `message`        | String | Optional. Additional metadata to include in the response. |

::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "receive_tx",
  "params": [
    "BEGINSLATE_BIN. 8kBm8dTRtrskDCU TRruCj5bDo56r2p o9Ux7QHP3Jk7zYz ijPWx8nxhLHzNEY oce1HTx2aCozuTM jKU9NtS82yq4Nrv qxR8YL2tJ9sxjoh deDHf4S2Rzi9bXo i9gNY4z1LAwpjHi HV. ENDSLATE_BIN.",
    null,
    null
  ]
}
```
:::

::: details Ok Response 

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
	"Ok": "BEGINSLATE_BIN. oqubcv5dAuwDxnH mWc3UHM1JLj5XFd uv8qHNDgFzjpYFG zafDB1dptWRpYzq Qd2NpAeBb3RyTRU DcejJRc7zSx7VJ6 8ix3VeBAJWK9BGJ adXPdv7NJv2zV6h 41ZNzuwmGWdSaRx NjKJ9DK34UE7zjN RLsscBQU8WE7mnR Ubgft22oQ9mWrK2 6fadNCSnXg9sgsU v7VqbFVxdLjjznS 1W5taRMEpfGz4Ek ijdGDNqSvMAgiDo nWA4PFxRzcrZGHa dX17YaerjMdzdAo JFn49UyUMjpYg7b dTyLju2MLNB1cSW mAjkLbZLDYFQsGf xw6WuTHBvmQC49W ePHdroTbAUgkXtY csudeEcKcpkJrGf D8j2hKsn5zCn4wR CGmoEVuh2q4ejsX dtGhoB5hXbx91jY vJ5acUE5Jc1oydG MVjfHK3tjKNh4xN a3LrMZe5nkSWXxr 766pywJhPKUpWza FWGF12BG3zoQCmt DNmja1TKakmsbjT V8dM9vi3RqpHGVX QpU1hvBZ62Bj8SL CicYsYymoFXKvbX 5aDQUhAQVaRCBQQ jp1ie5wzRD4mH3z PMCvfQT696XYTcj u99WH1zBHHjKfKU aKVWzForHA7feHD rasSGUAS3WBptGt q6tN18rdxSHxTZ2 YRxJxoBLtwa1goZ DSpJ19bxPvsaaHr eHmUiyc5K1nTxNZ xZZufzXMA8evkQp CcUAJxdgE12GqTA BByRNPC7TF7JW6b uhbVFwWZbdtacDA VeGQz3bpxVfa179 u31sxVz4p9WTTzS EdtkgbUGcbtvikk VetmoqsPuTG5DeX sR6vMuvy5MQFYfv EyayGxnLmYrp8at YV834WdgNr65xRj vfWaSwsA5nXxZUd xzsE5y4SUrFte3M 3VdgwTyRxb42Ht5 z6RmQaVEz8FQfPK dWBuSQ2FtzdLMRX L2wyNN2ozWpkV7D LwTsf85aCn9mCoV JN9HRDYuCbvpS7g aTBQF5Wn5aCKd9E xrmBHwUGv1Memur AzgxeHmxJHpQTDt QJt7q1EtRPeCZbn 9QnfS9XiqNMLpZE K6sdPWL8WFvwx3z shLTmUaQiYGnGTX KLeirUMcmRH7Siq m4LztkN9h8UY4m6 briuHjEzFFodxDi nTf1zuCnNsXM8fM PxQ8XLySYSgfsWk YthU8CN4eNUkSib rYzc8EFqiEduqdA UfdoNDh4QmchHRk ygvDP1L1vRYcA9d fBcn5cxbAmFuAPP kXuyh6UBEuqASeV 9T38rYMmyRNj9oW EdUGJqoyH1RnnNc Sk9wFqZTufpM6Yb QYQmEYpxL51M2EY 2fmiCfCvTWvTLYW NZFJZxN48giREEB 3vYkAnnRuZ7kevF oAoViG8e8efjhQw Gj. ENDSLATE_BIN."
  }
}
```
:::




### **Step 2: Send Response to Sender**

The recipient shares the updated Slatepack with the sender. This allows the sender to proceed with finalizing and broadcasting the transaction to the MWC network.



**Example Response Slatepack:**
```
BEGINSLATE_BIN. usqHiSmrwTbxJD1 BKq9tdQUBJCLmRF unXjpYfGsr1hDhH XQSGvUyUKrGPttp dfMqT2LyGtDiSbJ LBaLwqyamCRQ6ga 4SyMzhP1D4CuTpr PjXwfvXqzZiEB4R LAKt3pe9WSPcBSK MuF6Dw9Y4mDJpka zkZ8uDRM4sUzhk8 SDk3ZY5FeeEoPG8 ug7miFxCZKCfMn7 8G2hf7KLobevDeX yQHV5Jja7vRH9kx sQ6PsUN2518EJm2 kc8wtAoHyP6KQTg znNkxvdJ6aXzvEU 5BL9UqS7x2d3U1B aunvhgyEVfE3LXk 7BMp8yPrzF3BBHX KJWLsftycvZwcvM eDZMREoZzMGQWNV PE37U3tEaFbHTWM hy5nNefS4TCoKCk b8WXrZUsRnHw4eX e26LQ94RQoTbXh9 9veAK2ECuU9ttre aK7VNEKmzE9hUea YcFdzXFkSGVcxJL J58T9vdBBUkK9PQ ncoN4aMhiwHwSfr MbJfyUQCLWwjFGY V8qiiVwMLApauyW 35fHztkvtoswH3z cZTJTn1aeYCvBt8 x3mqeMGtw6sFP7u YPEkbQx4ZbNHVaw 3AYsmFLKUS6D2rV EcCaUi3c4wjGopq yjfMh8Sw1irbxDh z55XmSSD1iqu7BV XqGRpjbdEe3ks8E TCW3GpkoDBA96Hm EDvT5d1FEFDefJU eZReffaiKAj54HA MmibCcS8ZPAfLa5 4dJkDqH9Xmquqeb Ut1gRt1HjLJ78mT GLDyMEiBWGw2RVj JNJZNxXy5PZcrfr x5D3U65hobmk7ZT 6VDKzyPNYHwhiug q9QkcmKVTYwUoDT LhhXJCvw3oyNmVP GvWThjWpebSxjsv 6LobgE59ap2NTPx eHHsfhU9fSXZMpn J389tVGkPJtotdQ DHw8rqi8JS6MX6m pdo2tFr2MdKvs5f Zq4oyFBuojGrz3S 5UZgDjK1NLUuDrG ZQJpBwYGSqFza4m 559DieAWLe38khU FmM6uqh8i2ZyEHG qNBok3kCa7JHYpt 4iA93S33PXH5CS7 VowPonFVgpAofK5 oYzopFRdmJU2DUa b1VW3ANdCtNZKpb re2W2rwoDbLP34G QiddN7u1jXWuJj9 HBREYcvGzdxk4EB FfLoMG2tWERLrct 77tnwWZhcaanXTK RDibv4S9Hs912b8 HbV5XtB8d1WJhyS w2N9L9zPzoJnHN7 LQzq7KrFiwitGaK HMURznkkrWQrHuN xbAMAoZsH1rwmwo SCsSRsw6uxHzcnL ZdADUmYCVHpMUkU HThZhVwW2xaAWBY y6MpaJoEXv15JCx swhhXNGkmm5ZRf9 L3kgVcGpjDS69kN QMCpFdswUHcj5Xu 3cKkRuV6DZ7jMLn u6kLGhxh9ECGSzt As. ENDSLATE_BIN.
```

### Summary of Recipient Workflow

1. **Receive Initial Slatepack:** Process the initial transaction slate from the sender.
2. **Update and Encode Slate:** Update the slate with recipient details and encode it into a response Slatepack.
3. **Return Response Slatepack:** Share the response Slatepack back with the sender for transaction finalization.