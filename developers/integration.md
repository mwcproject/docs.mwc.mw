# Integration

The integration of the **MWC** revolves around two core workflows: **Send** and **Receive**. These workflows ensure smooth, privacy-focused, and efficient transactions. 

### **Understanding the Interactive Process**

MWC transactions are inherently **interactive**, requiring communication between the sender and the recipient. At its core, the sender creates an initial slate (a transaction template), shares it with the recipient, and waits for the recipient to respond with an updated slate. This updated slate is then finalized and broadcast to the blockchain by the sender.


## **Software Requirements**

::: tip
The [MWC Python SDK](https://github.com/mwcproject/mwcmw.py/tree/main) supports both Wallet and Node APIs, including their respective Owner and Foreign APIs:

- Wallet Owner API: Handles transaction creation, finalization, balance retrieval, and key management.  
- Wallet Foreign API: Facilitates receiving transactions and external interactions.  
- Node Owner API: Provides control over the node, including querying blockchain data.
- Node Foreign API: Allows external interactions with the node for transaction broadcasting and retrieval.

Examples for Sender and Recipient workflows are in the `/examples` folder.
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
      - Basic Authentification:
        - Username: `mwcmain`
        - Password: `~/.mwc/main/.foreign_api_secret`
    - **Owner API**:
      - Available at: `http://localhost:3413/v2/owner`.
      - Supports only `POST` operations, with the JSON-RPC request as the body.
      - Refer to the [Owner API Documentation](https://docs.rs/mwc_api/latest/mwc_api/owner_rpc/trait.OwnerRpc.html) for detailed usage.
      - Basic Authentification:
        - Username: `mwcmain`
        - Password: `~/.mwc/main/.api_secret`

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
    - Basic Authentification:
      - Username: `mwc`
      - Password: `~/.mwc/main/.owner_api_secret`
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

The Sender Workflow is responsible for initiating, encoding, and finalizing the transaction. For developers integrating MWC workflows, it's important to understand the interactive nature of the transaction process. Once you generate the initial Slatepack, you need to send it to the user (recipient) and wait for their response Slatepack to proceed further.

Here, we send the **Slatepack to the recipient's address**:
``` Slatepack Recipient Address
grxdcrjcvdq7aipjzuejjngr3til7euryqrpmtjg4hdqxnx3jyfst2qd
```

### **Step 1: Initiate Transaction**

The sender creates a transaction slate by calling the method [init_send_tx](https://docs.rs/mwc_wallet_api/5.3.4/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.init_send_tx)  

`init_send_tx` <Badge type="info" text="POST" />

| Parameter                    | Type     | Description                                                              |
|------------------------------|----------|--------------------------------------------------------------------------|
| `token`                      | String   | API token for authentication.                                           |
| `amount`                     | Integer  | Amount to send in micro-MWC (e.g., `200000000` for 0.2 MWC).            |
| `minimum_confirmations`      | Integer  | Minimum confirmations for inputs (e.g., `10`).                         |
| `max_outputs`                | Integer  | Maximum outputs to use (e.g., `500`).                                   |
| `num_change_outputs`         | Integer  | Number of change outputs (e.g., `1`).                                   |
| `selection_strategy_is_use_all` | Boolean | Whether to use all available inputs (`true` or `false`).                |
| `target_slate_version`       | Integer  | Slate version to use (e.g., `4`).                                       |
| `public_key`       | string  | Slatepack Recipient Address in the field                                   |
| `late_lock`       | Boolean  | Enable Late lock to lock the input at the finalization step    (`true`)    |    
| `ttl_blocks`       | Integerer  | Block when the transaction will auto-cancel                          |


::: details Request Example
```JSON
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "init_send_tx",
  "params": {
    "token": "ddab9a3b96d73d3539d4e6fc15f69637888425e440d928771aeb7dac4157b8d1",
    "args": {
      "src_acct_name": null,
      "amount": 200000000,
      "minimum_confirmations": 10,
      "max_outputs": 500,
      "num_change_outputs": 1,
      "selection_strategy_is_use_all": false,
      "target_slate_version": 4,
      "payment_proof_recipient_address": null,
      "ttl_blocks": 1440,
      "send_args": null,
      "late_lock": true,
      "slatepack_recipient": {
        "public_key": "grxdcrjcvdq7aipjzuejjngr3til7euryqrpmtjg4hdqxnx3jyfst2qd",
        "domain": "",
        "port": null
      }
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
      "amount": "200000000",
      "coin_type": "mwc",
      "compact_slate": true,
      "fee": "7000000",
      "height": "2793169",
      "id": "e2757000-4a03-47f9-b6fe-ed91dc2ceb9f",
      "lock_height": "0",
      "network_type": "mainnet",
      "num_participants": 2,
      "participant_data": [
        {
          "id": "0",
          "message": null,
          "message_sig": null,
          "part_sig": null,
          "public_blind_excess": "028d440ffa605a04cc92ca9e77b6be3295042fdc088b12565c73ae3bb4c7fbabae",
          "public_nonce": "0309338aec074b65e82e6077aab0e5a9b052df9948207e047bbedca1477f17a6cd"
        }
      ],
      "payment_proof": null,
      "ttl_cutoff_height": "2794609",
      "tx": {
        "body": {
          "inputs": [],
          "kernels": [],
          "outputs": []
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
| `recipient`     | String  | Recipient’s Slatepack address.        |
| `address_index` | Integer | Optional. Index of the sender's address for the Slatepack.  ('null')          |

---
::: details Request Example
```JSON
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "encode_slatepack_message",
  "params": {
    "token": "ddab9a3b96d73d3539d4e6fc15f69637888425e440d928771aeb7dac4157b8d1",
    "slate": {
      "amount": "200000000",
      "coin_type": "mwc",
      "compact_slate": true,
      "fee": "7000000",
      "height": "2793169",
      "id": "e2757000-4a03-47f9-b6fe-ed91dc2ceb9f",
      "lock_height": "0",
      "network_type": "mainnet",
      "num_participants": 2,
      "participant_data": [
        {
          "id": "0",
          "message": null,
          "message_sig": null,
          "part_sig": null,
          "public_blind_excess": "028d440ffa605a04cc92ca9e77b6be3295042fdc088b12565c73ae3bb4c7fbabae",
          "public_nonce": "0309338aec074b65e82e6077aab0e5a9b052df9948207e047bbedca1477f17a6cd"
        }
      ],
      "payment_proof": null,
      "ttl_cutoff_height": "2794609",
      "tx": {
        "body": {
          "inputs": [],
          "kernels": [],
          "outputs": []
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
    "recipient": {
      "public_key": "grxdcrjcvdq7aipjzuejjngr3til7euryqrpmtjg4hdqxnx3jyfst2qd",
      "domain": "",
      "port": null
    },
    "address_index": 0
  }
}
```
:::

::: details Ok response
```JSON
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": "BEGINSLATEPACK. KbRGFBmJFBg5qWg k9Fi7EttkQKZ5pp L4mYHzzCfWw7Anf V8CZ6Ke1bkv3HxH XtrFoycTQ5FgC3p VZZpUiHVDXSXmKD wQJJHpKXZyqL66f bAs8CWvTPZoquaB Azd6XQVqeMRiape dmqpmhPUYE3f4Yr DQNLi9dzSPLU8c3 NT9frEz4oA2GaGB XsbFXqgsVgHeED5 f7859HKg8RVHQCn bC7dGVk3GnZKPA3 ejGahpUud7odiJi WJgThiYTwR7YdZg 9oyH21VCwoNMsar P1. ENDSLATEPACK."
  }
}
```
:::   


### **Step 3: Sending the Initial Slatepack to the User**
After creating and encoding the initial slate, you must share the slatepack with the recipient. Typically, this is done through a secure channel, such as a file, email, or a messaging service.

**Example Slatepack to Share with the Recipient:**

```
BEGINSLATEPACK. KbRGFBmJFBg5qWg k9Fi7EttkQKZ5pp L4mYHzzCfWw7Anf V8CZ6Ke1bkv3HxH XtrFoycTQ5FgC3p VZZpUiHVDXSXmKD wQJJHpKXZyqL66f bAs8CWvTPZoquaB Azd6XQVqeMRiape dmqpmhPUYE3f4Yr DQNLi9dzSPLU8c3 NT9frEz4oA2GaGB XsbFXqgsVgHeED5 f7859HKg8RVHQCn bC7dGVk3GnZKPA3 ejGahpUud7odiJi WJgThiYTwR7YdZg 9oyH21VCwoNMsar P1. ENDSLATEPACK.
```

### Step 4: Waiting for the Recipient's Response
Once the recipient receives the initial slatepack, they will process it on their side using their wallet. After signing and updating the slate, the recipient will generate a response slatepack and send it back to you.

**Example Response Slatepack:**
```
BEGINSLATEPACK. 2t5mcXih1Sfx51S CH9rhDbtfhuV4ih apEUin14ZMSAZ8r W2ZnELPJzPCADDa bFdgZZp97dL7Dpb oGt2M1DpaiHCn7o L6yabNsTF7JaAcq samYT8nakedqasr be5TTpZ7QCzJSpS NgFE1ksmJfG2izv YdoGCstWSfr4ziV N6aPgP5TLZ2mGcH 6E7WJah9PYMXXkz DBwYacEgkZTMvxz T8YEQXRxCSBewUP 53jk86rc9Cx59ze 8WKaC2wLJ6JKN2F d9DwjPJkTrNX8sQ SyispCGBucFnd5b BfwQXkewm7XuiHQ rf2RcEWwaPDY6To ZgjPbSjP7FVbLqm uWS9niHA9VHBQzw sukTPryeoJrZsbq AUqhY7nvR78db9T EiqaLoWCF1VexbC oWgSkVvFo3CM5d5 rF1dqF63rn7i8WA SfGAMSAjWE1XPgy cD2wFXtUrnPpR6Y 1kpu91yJqybnYZk g1tVdMb37iyGtVW F361CVCwMFPYQ4W vctsgNiMzRkNpWm BqztHACWWKyEuUM DhL5rK7p77KXYo3 pj3mQ1CNh6ckLjC gtG4Eawkoriq3vH LA2Q3g1eW2v2zdM BRrJhJKZKiTZH7h U994Bnx5huHRJ3i Qio7A8z3VktMdwu wFMZdUB8RDPw3r9 p8JjeuDYWpY8LvU nQNabw23pZxpLyY by289pWZqCBWkta H1UkiQ5aYhrwAK5 5ggDfonxnUgHH2b JwZkj7zLRw7jXaZ HmcJbNHBYizFCZe rQHYrkwrywNRar6 AAJD7Lt5ABg1L5q cEVgUwuS86D2b7k x389o3D1XVSRGno JZ63aWJTZqRQhkd Rhs7cvbugraQdnF gAHfUnMBMEqjwDw RxZyQC5ZQR5daWq uTt89NSB5yfRGy6 YYRFLHNZXTG8twC fR4PmYwTwy79paq EGFPpfqdQC29nxR paMWdnrD6Uvkhf1 eFyy4ZCRUTzFYdK daFzZBihWjvR62E AgeCs7W9QuSoF6Z VJwpSSe386xndEF cqWC2ZbJPb8RkXJ Xba6FQib9v1n9rZ JMbLJ46X7HAZgEf jZE5mGzq7qP7nmA 2ssgDtn8BykTeem U9Q8wAcXzTdqfjP pDuJa9MQABZ35rt MAjMAiP6y7ta48t gZ3hyg6uhxNa7Jw kfyuWeFiDZyVg8C 8Gi9ARbMiKLdG4C J92Xrttny51AL4T Za7XK2LPGHBdKP8 9qVjBkMVdNuhaqJ 56RuAdgfBNgC4ws fLunn55BzkHmQL4 BJt3AZFqVD7bzom 4ode7JPMbeJZibo 6JAnz5sf12cm8uX o1RKcM5BfZDeRb2 5pTj7o6VhGUEDB4 je7qGUwZUnyU2af TjZRMoZ7Lv3FhV5 ZXW4uSNBfAfExvE hiBhbAKvVsY3mGG Ycw3vos6e9FZ7oh dQy6tHNm5ZQak45 zM81XZ9E2ZcQdMY KaL4wY7ZyMNGo5x j2wu3Nsv9chrjBM gdwH7MPnGx4yKuh nbERmiEyzvteGoi pzUZ39qYkgT8pmP ffN5. ENDSLATEPACK.
```



### Step 5: Finalize the Transaction
The sender finalizes the transaction by combining all signatures and preparing the transaction for broadcast using the [finalize_tx](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.finalize_tx) method.

`finalize_tx` <Badge type="info" text="POST" />
::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "finalize_tx",
  "params": {
    "token": "ddab9a3b96d73d3539d4e6fc15f69637888425e440d928771aeb7dac4157b8d1",
    "slate": "BEGINSLATEPACK. 2t5mcXih1Sfx51S CH9rhDbtfhuV4ih apEUin14ZMSAZ8r W2ZnELPJzPCADDa bFdgZZp97dL7Dpb oGt2M1DpaiHCn7o L6yabNsTF7JaAcq samYT8nakedqasr be5TTpZ7QCzJSpS NgFE1ksmJfG2izv YdoGCstWSfr4ziV N6aPgP5TLZ2mGcH 6E7WJah9PYMXXkz DBwYacEgkZTMvxz T8YEQXRxCSBewUP 53jk86rc9Cx59ze 8WKaC2wLJ6JKN2F d9DwjPJkTrNX8sQ SyispCGBucFnd5b BfwQXkewm7XuiHQ rf2RcEWwaPDY6To ZgjPbSjP7FVbLqm uWS9niHA9VHBQzw sukTPryeoJrZsbq AUqhY7nvR78db9T EiqaLoWCF1VexbC oWgSkVvFo3CM5d5 rF1dqF63rn7i8WA SfGAMSAjWE1XPgy cD2wFXtUrnPpR6Y 1kpu91yJqybnYZk g1tVdMb37iyGtVW F361CVCwMFPYQ4W vctsgNiMzRkNpWm BqztHACWWKyEuUM DhL5rK7p77KXYo3 pj3mQ1CNh6ckLjC gtG4Eawkoriq3vH LA2Q3g1eW2v2zdM BRrJhJKZKiTZH7h U994Bnx5huHRJ3i Qio7A8z3VktMdwu wFMZdUB8RDPw3r9 p8JjeuDYWpY8LvU nQNabw23pZxpLyY by289pWZqCBWkta H1UkiQ5aYhrwAK5 5ggDfonxnUgHH2b JwZkj7zLRw7jXaZ HmcJbNHBYizFCZe rQHYrkwrywNRar6 AAJD7Lt5ABg1L5q cEVgUwuS86D2b7k x389o3D1XVSRGno JZ63aWJTZqRQhkd Rhs7cvbugraQdnF gAHfUnMBMEqjwDw RxZyQC5ZQR5daWq uTt89NSB5yfRGy6 YYRFLHNZXTG8twC fR4PmYwTwy79paq EGFPpfqdQC29nxR paMWdnrD6Uvkhf1 eFyy4ZCRUTzFYdK daFzZBihWjvR62E AgeCs7W9QuSoF6Z VJwpSSe386xndEF cqWC2ZbJPb8RkXJ Xba6FQib9v1n9rZ JMbLJ46X7HAZgEf jZE5mGzq7qP7nmA 2ssgDtn8BykTeem U9Q8wAcXzTdqfjP pDuJa9MQABZ35rt MAjMAiP6y7ta48t gZ3hyg6uhxNa7Jw kfyuWeFiDZyVg8C 8Gi9ARbMiKLdG4C J92Xrttny51AL4T Za7XK2LPGHBdKP8 9qVjBkMVdNuhaqJ 56RuAdgfBNgC4ws fLunn55BzkHmQL4 BJt3AZFqVD7bzom 4ode7JPMbeJZibo 6JAnz5sf12cm8uX o1RKcM5BfZDeRb2 5pTj7o6VhGUEDB4 je7qGUwZUnyU2af TjZRMoZ7Lv3FhV5 ZXW4uSNBfAfExvE hiBhbAKvVsY3mGG Ycw3vos6e9FZ7oh dQy6tHNm5ZQak45 zM81XZ9E2ZcQdMY KaL4wY7ZyMNGo5x j2wu3Nsv9chrjBM gdwH7MPnGx4yKuh nbERmiEyzvteGoi pzUZ39qYkgT8pmP ffN5. ENDSLATEPACK."
  }
}
:::


:::details Ok Response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": "BEGINSLATEPACK. CYFJ6Q7ErbpJ1ic XTRLqDwrLHkpgoR wHCyjZasSLdb246 6torkSmxqtsqMxy FCMSprAJ2XPfRo6 QdLGkLR5GXtvLfY WCMxUw1FrP3CB49 kyMKQpWmQwooKGm Vk6HLc8A4MhtVCB Fh3hrbst7VJLuPH rQ5UCad9CdVpcPp mMtVHaL3becbCU8 iTcyhLXXp4g8kbY fxXAA1Mk5t4Ptxv TpPP9u36eWArbQM MzWermcYuFutaoK tpkP25oYEeNEFuG eAcTtAXEYCLSNhJ 2RvHPUpMpaqbQ74 1gp6mN4TUu1yfvK fKZZutsjqoYfUdP MH2qKnokVJg6Cmb J1Q7n2U5aqSyLe4 FceMHZDUBAbSXtJ qMUTbzVZ5kpyKQt xtakoMCtXep8ozC uk2CT6zAAhJbvsL sXfQkqa8hitftZk SoWNzuK9Vwji6g5 H7oD84R6p5Brsoi QLqUWoF8daEMPdS VAH8njdcPPMwLCv f9LLFT7gsdQzSDV orw9LVaw96ET8hc QK2DuoiTYLY2EDU LhsVrHywcwakuXF uwoSbmQwvKWkFGs Lejz1QyKfr9p4hL tD2jcYUPwZnH1J9 LcRqLTMsjqC5spc pLVb5Zc8CcaorFo CB2UreoA6c2kW3K Lm7gB6fDZAKWYRs MGmz297FgfdA56S Hpzhg6HQ3CEGVdz 2Rg37L5myccQd74 i6EzVgutztPoyad gY4TGrasRZnJwNK eS5hTRfRj8aTwLd 46eDbfM2qMkmbVh mbEa1vCVCVAiLYb hTXgFGd9SMarpDQ APx1nvBwddALjup 1cC3TP7ioVapu94 CCP6GcngRnQyKMo sQFQpqJJ5ZS9U2G FPrCu6LzxN3M8oT 3QM9zCCuLTgkECh ybpvcDrMoTAYtcW xJp3pgjZ6MgZ8bS W3Fb2jUv8zfikwS iVHmBdcH1XquSxo nsCk5eQL33VbzTb ALYfNFuVdRZ1dRm oULyDKDHyQWpyhE hAyrWnEvEraTiTV EdoksjaiJH2Xvgy Pk5UgTQ1p726gVs f5ER1GLhqJx86sE uYrWQ1UZ6BGHFqu BzS5dtKXgT42KdH 5irKuBCXcK2iRpK 9nFmnWPg8W2gFZB 9QXXTQS7rFkYUhD MWXNQt48viMDJEk qP5tjPoL1JCzwDh naiEEGruh13ojZi YCwT9XUQBAHsZt6 ZfiourqsRSoHwwv rYvVzn3GUjXFZEq AGvegyHvPFEGzfA q6npwpeDiW9RqBD NVJuT8dmawngL48 ZNuZFHi2Xune2RV H4MFWbuhvgiBNB9 ussPbVFZwDJCbid 7HnKyymEWxwvPBn RVnvu4BGkzUbHZh 83sgrGCKbhqhCZE 18dTLTk2oLRNdgp BnbaTfyQsSncfev Q4Rpbrcw9ynSYMU aruUENGmgG6CPnK FW3ZwAA43DqVRUa FsYekifyU8qqN5o 2BU3389oV7iHrvJ oWpjSq5uVexBM2G aixaoRk8vHQCW1U dkD8AnFrcZacpXB YaMAeBy8ZBSLApF rs5NLA47zk1NDZe 8KWNkAm9tv2vto1 xLFdeaYzRSvw6uG 8yRZxL2uXZvDn4z HJNVbWiqFRFHvgd N8CRLk4RNBqz2SX hVhUGK2swnz1Wd5 W47WHsd1NwRKvmx cxi2DtiJiAw2JJC HNf6pEzequYzDMo UFW5ftQLiuQFWTc 8vrzvrugVT8ULHE fyMfbsoyiQdXT5c My4UePwXTjznyoE xHvKeb8dnSW155J 3Lcz7UrtXdetVGg ZiGNtjejYx9V2ST R2VfU7DhAn1Tm4a iUfkhLKkUr4Kp8f 7Pkj8JWKFyiti5L jVoGqdESHUC9tzh nvGemEKGWspSfoH eG9zvuGHSm1AGMZ tQT9paXMmd8c5KE mUWp71rTGW9U42w 2KSJryoKKp4RBhi efBkxPoF63BNaP6 4co2BUqtAyiX1Vs jH82WsS6jqaexu6 R8o2c2UCjQPSecT GDm3manhppBfBCy Yriu4u8DJrXRczw NHrL98bMZ4amUVk HrofTA64b3VYNYS YjXZ7MaMqnSDPUV u9XVRroSzGEBJ3Q 8oVbbdKkHCv8MS9 X4idbDPJPrGo2ui PTyhabScnjHpd7P HNRrjqYTmVggqDD o7atEo9YgyhcvWf LWuyiE4UMcU9tSX 7YmkKBWti6V1NUZ gPrtnt26wgx7UGM UnQWdhPhDUaaDdR 1HZdFvJ2C529qdh bYHq5opdK7y4u4z RXDbsjPkRpa1rqR wLxUnAaREQydzHg 8r9UztfmF2cB5wD m8qPSp3epK5ZZXj Ui4Wkg2VkNGEeSF ayitZ4PHNnvkXfd x32u1veivHkAbni WLBs2NJ6nEq1cA3 cRSkodFJm9GRb8d babZNMigbdx5Lg2 9PoAH4pqbGymC25 ftV8TVX69sHMSzx xrPYtxJHVvHPmkF AJCddnAT6aXRRkd wvj1ckmayCjvcQk D8d2o2GDVYiCMAV 9MKm9kN2vywgVar RLbYQue9vxBey8s q1hR4s1LKBiuPgg EFZ5oztTSvhLdHE CT1rLxUg9mi2XRa 5EvYPdxKXqGuqFu dZ3VzPfcNuEjbVv XsaEpAmCBgQmUVZ xZma67A7hCg4ei9 YdfbpYZhccnuGbN poLo35RiCd7eyzU b1sP9YXcWRZiW5N YEspB9XGibZACNk utL4jWhHApfcnBe aPX9DwFohoCWd7r gVB6rRp7LkLEJMf TeEmLmneYQE2m1r M2mCAee5PUTjQ5Q Mjj7Kf2iMBB8YsF DcniGgXtqRnkGuL kbz. ENDSLATEPACK."
  }
}
```
:::

### Step 6: Decode the Finalized Slate

Once the transaction is finalized, the next step is to decode the finalized Slatepack. Decoding reveals the transaction details necessary for broadcasting to the node and logging. The decoded slate includes critical information such as inputs, outputs, transaction kernels, and the offset value. Specifically, you need to extract the `slate.tx` object, which represents the finalized transaction. You can use the [decode_slatepack_message](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.decode_slatepack_message) method.

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
    "token": "ddab9a3b96d73d3539d4e6fc15f69637888425e440d928771aeb7dac4157b8d1",
    "message": "BEGINSLATEPACK. CYFJ6Q7ErbpJ1ic XTRLqDwrLHkpgoR wHCyjZasSLdb246 6torkSmxqtsqMxy FCMSprAJ2XPfRo6 QdLGkLR5GXtvLfY WCMxUw1FrP3CB49 kyMKQpWmQwooKGm Vk6HLc8A4MhtVCB Fh3hrbst7VJLuPH rQ5UCad9CdVpcPp mMtVHaL3becbCU8 iTcyhLXXp4g8kbY fxXAA1Mk5t4Ptxv TpPP9u36eWArbQM MzWermcYuFutaoK tpkP25oYEeNEFuG eAcTtAXEYCLSNhJ 2RvHPUpMpaqbQ74 1gp6mN4TUu1yfvK fKZZutsjqoYfUdP MH2qKnokVJg6Cmb J1Q7n2U5aqSyLe4 FceMHZDUBAbSXtJ qMUTbzVZ5kpyKQt xtakoMCtXep8ozC uk2CT6zAAhJbvsL sXfQkqa8hitftZk SoWNzuK9Vwji6g5 H7oD84R6p5Brsoi QLqUWoF8daEMPdS VAH8njdcPPMwLCv f9LLFT7gsdQzSDV orw9LVaw96ET8hc QK2DuoiTYLY2EDU LhsVrHywcwakuXF uwoSbmQwvKWkFGs Lejz1QyKfr9p4hL tD2jcYUPwZnH1J9 LcRqLTMsjqC5spc pLVb5Zc8CcaorFo CB2UreoA6c2kW3K Lm7gB6fDZAKWYRs MGmz297FgfdA56S Hpzhg6HQ3CEGVdz 2Rg37L5myccQd74 i6EzVgutztPoyad gY4TGrasRZnJwNK eS5hTRfRj8aTwLd 46eDbfM2qMkmbVh mbEa1vCVCVAiLYb hTXgFGd9SMarpDQ APx1nvBwddALjup 1cC3TP7ioVapu94 CCP6GcngRnQyKMo sQFQpqJJ5ZS9U2G FPrCu6LzxN3M8oT 3QM9zCCuLTgkECh ybpvcDrMoTAYtcW xJp3pgjZ6MgZ8bS W3Fb2jUv8zfikwS iVHmBdcH1XquSxo nsCk5eQL33VbzTb ALYfNFuVdRZ1dRm oULyDKDHyQWpyhE hAyrWnEvEraTiTV EdoksjaiJH2Xvgy Pk5UgTQ1p726gVs f5ER1GLhqJx86sE uYrWQ1UZ6BGHFqu BzS5dtKXgT42KdH 5irKuBCXcK2iRpK 9nFmnWPg8W2gFZB 9QXXTQS7rFkYUhD MWXNQt48viMDJEk qP5tjPoL1JCzwDh naiEEGruh13ojZi YCwT9XUQBAHsZt6 ZfiourqsRSoHwwv rYvVzn3GUjXFZEq AGvegyHvPFEGzfA q6npwpeDiW9RqBD NVJuT8dmawngL48 ZNuZFHi2Xune2RV H4MFWbuhvgiBNB9 ussPbVFZwDJCbid 7HnKyymEWxwvPBn RVnvu4BGkzUbHZh 83sgrGCKbhqhCZE 18dTLTk2oLRNdgp BnbaTfyQsSncfev Q4Rpbrcw9ynSYMU aruUENGmgG6CPnK FW3ZwAA43DqVRUa FsYekifyU8qqN5o 2BU3389oV7iHrvJ oWpjSq5uVexBM2G aixaoRk8vHQCW1U dkD8AnFrcZacpXB YaMAeBy8ZBSLApF rs5NLA47zk1NDZe 8KWNkAm9tv2vto1 xLFdeaYzRSvw6uG 8yRZxL2uXZvDn4z HJNVbWiqFRFHvgd N8CRLk4RNBqz2SX hVhUGK2swnz1Wd5 W47WHsd1NwRKvmx cxi2DtiJiAw2JJC HNf6pEzequYzDMo UFW5ftQLiuQFWTc 8vrzvrugVT8ULHE fyMfbsoyiQdXT5c My4UePwXTjznyoE xHvKeb8dnSW155J 3Lcz7UrtXdetVGg ZiGNtjejYx9V2ST R2VfU7DhAn1Tm4a iUfkhLKkUr4Kp8f 7Pkj8JWKFyiti5L jVoGqdESHUC9tzh nvGemEKGWspSfoH eG9zvuGHSm1AGMZ tQT9paXMmd8c5KE mUWp71rTGW9U42w 2KSJryoKKp4RBhi efBkxPoF63BNaP6 4co2BUqtAyiX1Vs jH82WsS6jqaexu6 R8o2c2UCjQPSecT GDm3manhppBfBCy Yriu4u8DJrXRczw NHrL98bMZ4amUVk HrofTA64b3VYNYS YjXZ7MaMqnSDPUV u9XVRroSzGEBJ3Q 8oVbbdKkHCv8MS9 X4idbDPJPrGo2ui PTyhabScnjHpd7P HNRrjqYTmVggqDD o7atEo9YgyhcvWf LWuyiE4UMcU9tSX 7YmkKBWti6V1NUZ gPrtnt26wgx7UGM UnQWdhPhDUaaDdR 1HZdFvJ2C529qdh bYHq5opdK7y4u4z RXDbsjPkRpa1rqR wLxUnAaREQydzHg 8r9UztfmF2cB5wD m8qPSp3epK5ZZXj Ui4Wkg2VkNGEeSF ayitZ4PHNnvkXfd x32u1veivHkAbni WLBs2NJ6nEq1cA3 cRSkodFJm9GRb8d babZNMigbdx5Lg2 9PoAH4pqbGymC25 ftV8TVX69sHMSzx xrPYtxJHVvHPmkF AJCddnAT6aXRRkd wvj1ckmayCjvcQk D8d2o2GDVYiCMAV 9MKm9kN2vywgVar RLbYQue9vxBey8s q1hR4s1LKBiuPgg EFZ5oztTSvhLdHE CT1rLxUg9mi2XRa 5EvYPdxKXqGuqFu dZ3VzPfcNuEjbVv XsaEpAmCBgQmUVZ xZma67A7hCg4ei9 YdfbpYZhccnuGbN poLo35RiCd7eyzU b1sP9YXcWRZiW5N YEspB9XGibZACNk utL4jWhHApfcnBe aPX9DwFohoCWd7r gVB6rRp7LkLEJMf TeEmLmneYQE2m1r M2mCAee5PUTjQ5Q Mjj7Kf2iMBB8YsF DcniGgXtqRnkGuL kbz. ENDSLATEPACK.",
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
      "recipient": {
        "domain": "",
        "port": null,
        "public_key": "grxdcrjcvdq7aipjzuejjngr3til7euryqrpmtjg4hdqxnx3jyfst2qd"
      },
      "sender": {
        "domain": "",
        "port": null,
        "public_key": "grxdcrjcvdq7aipjzuejjngr3til7euryqrpmtjg4hdqxnx3jyfst2qd"
      },
      "slate": {
        "amount": "200000000",
        "coin_type": "mwc",
        "compact_slate": true,
        "fee": "7000000",
        "height": "2793169",
        "id": "e2757000-4a03-47f9-b6fe-ed91dc2ceb9f",
        "lock_height": "0",
        "network_type": "mainnet",
        "num_participants": 2,
        "participant_data": [
          {
            "id": "0",
            "message": null,
            "message_sig": null,
            "part_sig": "cda6177f47a1dcbe7b047e204899df52b0a9e5b0aa77602ee8654b07ec8a330958eac4addcbb0907ef9c4c3dbca6b4d83a2ebb70585211fe59f956048fd6daca",
            "public_blind_excess": "028d440ffa605a04cc92ca9e77b6be3295042fdc088b12565c73ae3bb4c7fbabae",
            "public_nonce": "0309338aec074b65e82e6077aab0e5a9b052df9948207e047bbedca1477f17a6cd"
          },
          {
            "id": "1",
            "message": null,
            "message_sig": null,
            "part_sig": "b6dbd8bc8d8ba42ccab1f7a2f0f29e397b398cc738d8a6c2d7b1a65ff2e44cef1f7569c1aa695e5057de6c97a510a11f8ca70d4e92fa75ddec546c245160cefc",
            "public_blind_excess": "031efd6d40e777ad190a6cf5122c3da17c6f8d5cba07ab483290c5af7a05fe0d96",
            "public_nonce": "03ef4ce4f25fa6b1d7c2a6d838c78c397b399ef2f0a2f7b1ca2ca48b8dbcd8dbb6"
          }
        ],
        "payment_proof": null,
        "ttl_cutoff_height": "2794609",
        "tx": {
          "body": {
            "inputs": [
              {
                "commit": "0904f4c8c8b6972d42116c9b2358beacd65fa09c659f82d6213f8bb616249fe167",
                "features": "Plain"
              },
              {
                "commit": "09a201d0563157ca0a76e9e84649fc9a13f6013c4ff6095cda193e1f75ad1f0378",
                "features": "Plain"
              }
            ],
            "kernels": [
              {
                "excess": "092310070bac5f6ff85b53edc57f6bc9788fee6e62b7446196b8c6e445c235a81d",
                "excess_sig": "0500753b1963c40266c783ace923be9786dc065d61c2ec563a3beccf9919de9c361ef89efac695970adb70257bdaa63dc8d5c8beea4c87db464ec328e036a9c7",
                "features": "Plain",
                "fee": "7000000",
                "lock_height": "0"
              }
            ],
            "outputs": [
              {
                "commit": "08b46fa659f799c34d558bb4d6a1f4ada1d96870f94f3ec2a70b70f9117cefbd5f",
                "features": "Plain",
                "proof": "366332a6c80caff71c68f5e7a6df520647d937a9e055a0b59df68ef74743bd06b53f25eb159f734e8782121c4b4535f4d6eca5a65834bb18fd690102a3fd23c00a1a6aacd876f99d955a34c2984c324231fd68b8cf1d716f90db41b322624e48071679f59a662cc92dd4486f26c6e69783c23fa1bc8017dcea6d6734d25353bbed2f260e3d4888cb62a1d2a36161d0b3083ac433a66115a6dbd96fd18fc639df400779f710d21d049544e6e9e34ffdea6ff66c0f9a6938f84c38599fe264229eba5fed9ff9240656c10166f1a98be693b0a5f377704f51c74b0c3481a50c65efa7f64025cc42b1b3bcac1f3a0a9d787bc25fc69e9ffc2cf86f4315590032e49860a27f8a12fa1d5815cb336437f8cac6643409693cb506e1f1251ec4524504070639390f660b106f87fe2c9558f6c9a0e6a14207128d7501c7997b73abeaa46e4442ecffea29958c4919c960cc8c54fc2161d88a6fc29d0c75591675d4082098c19a01404af03428430a90eeb73e2e315164bae2d0489216213e6c956add6fd5c0bb3d1bd364bc6db2efe05a972f5417f62e023ab3f795375b3dba51d208757c04fc785e19400f14e858071e9cdbe4f047aa8a3eee160a96246b3f602b689bc040f15082ecdeb48974871d2c19fb4702dc1fa3eaca88836e0d29d79c7c747fafa9c4434e5c08863d677d97b23ecbf9486450e2fd97a0af5b39c6f6a738ad213b16bf8e8e12e3605262d82df8d621e832ef925f6d94fb2c8b78d335dbdf3b6010b545c877a0db358b84f922b46348a45bfaef29c149b927865497b17ce8626daf1501fa312b67b82dbe05d0e1dc85b87ee5cb61d28fa353feb1d24b145af00863ecce79ed55b890e8ea5800bb60a0960da93b2f0385fc2548470f8b8a9cd4ef7e2f776921cd78f45fce3223ad56e9d43cb1212848e39ce9db4947f05f0daac1f2d10ad3"
              },
              {
                "commit": "08291780a9a4c149a8a138a58bd69470ad080a8d2847cf76d59891cef573c41234",
                "features": "Plain",
                "proof": "8adfab42330c05f067924d3ededacf100b26a52e71b426c70e8b66e6949263d725e517586ed6592a8f85de81a680c03b0e08c2eb567adbc3441f041156adc723060925b856da6cfbc93eaf4e88881a8e32d13f7b539aac48a9e2efa299b7597fb3ba7a223e354e9265852327a6cf8d898fc496bf40b00bac9800cae47efed80c2fd7ba5971a313621db5328bb8c86fccb96a1d053c4f3523fb5d3b02897bc6ccab46327bee9555f7f2dfca26f018b02f7ac481c5de13af2ce2684c35af75c7dad60ec43b73a8e7f6c137b6b64c828694066ae649f55f01791482a243061323f1a0781f35149b1aaf3e14ac4fdf10e9392e003b5ee0e0fd0901aeba1896db374a739f6723dfe7d115a5367606c8960d9dfc7973831c35ced529e77314d6f7269b6985ddc9e9b69df17c8fef80755075e79fda7cb8f9959963037143a5d1b8179f9c2256afb3363f7daada6618622897b091fff437df28621206c294b4e14f0a1fc6b2033b9493fcf6e83854a551ec35bb9a1f8d84227911821f726377c9653212cfdb1da6676219ec8f730c1f0e926235215c6e15b7f42748240d425cfa33267a8c635b001e822d3b2a5089dd6e5431f6959480ce495ec3f2840e8e6394886c50dbb9e13a27115cdf2a8331f8448bb05b7e6e66704dd83842eeb4f1660bc42a69177cad0df31f9b0d4b2e3e93f9246f76c556b704d69189dfa627e674efc6c56fc953424d1b1df1bc7fc930ad02ca773743bcde2739f8758bd54019917fa8da91b96a613d56cc45c77cff32e3199e7a079e272a6b5c4c8f03e3131309ab12b8aab7fc36752cd5d84dcecf8e9bff6798d895a27adb09850af61bc9965f8fd409c1452f2c28851ee76a2adfc1af373b5ee9a0bf7321a2f9f917080dca4072b58c62731d32ccac6dd8aa49112919e73902bff33c6ee9b5928876f316e65f4daf21a11480f5"
              }
            ]
          },
          "offset": "cb0060822ae3faee5e48d9c34b42e9848cb6c7dbea17dd5796f58230dedb39f5"
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



### Step 7: Broadcast it to the node 

Once the finalized slate has been decoded, extract the `slate.tx` object from the decoded slate. This object contains the transaction details, including inputs, outputs, kernels, and the offset. These details must be used as parameters in the broadcast request to the node.

The [post_tx](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.post_tx) method is then called to broadcast the transaction. This step sends the finalized transaction to the node, allowing it to propagate across the MWC network. Ensure the tx parameter extracted from the decoded slate is correctly included in the request. 

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
    "token": "ddab9a3b96d73d3539d4e6fc15f69637888425e440d928771aeb7dac4157b8d1",
    "tx": {
      "body": {
        "inputs": [
          {
            "commit": "0904f4c8c8b6972d42116c9b2358beacd65fa09c659f82d6213f8bb616249fe167",
            "features": "Plain"
          },
          {
            "commit": "09a201d0563157ca0a76e9e84649fc9a13f6013c4ff6095cda193e1f75ad1f0378",
            "features": "Plain"
          }
        ],
        "kernels": [
          {
            "excess": "092310070bac5f6ff85b53edc57f6bc9788fee6e62b7446196b8c6e445c235a81d",
            "excess_sig": "0500753b1963c40266c783ace923be9786dc065d61c2ec563a3beccf9919de9c361ef89efac695970adb70257bdaa63dc8d5c8beea4c87db464ec328e036a9c7",
            "features": "Plain",
            "fee": "7000000",
            "lock_height": "0"
          }
        ],
        "outputs": [
          {
            "commit": "08b46fa659f799c34d558bb4d6a1f4ada1d96870f94f3ec2a70b70f9117cefbd5f",
            "features": "Plain",
            "proof": "366332a6c80caff71c68f5e7a6df520647d937a9e055a0b59df68ef74743bd06b53f25eb159f734e8782121c4b4535f4d6eca5a65834bb18fd690102a3fd23c00a1a6aacd876f99d955a34c2984c324231fd68b8cf1d716f90db41b322624e48071679f59a662cc92dd4486f26c6e69783c23fa1bc8017dcea6d6734d25353bbed2f260e3d4888cb62a1d2a36161d0b3083ac433a66115a6dbd96fd18fc639df400779f710d21d049544e6e9e34ffdea6ff66c0f9a6938f84c38599fe264229eba5fed9ff9240656c10166f1a98be693b0a5f377704f51c74b0c3481a50c65efa7f64025cc42b1b3bcac1f3a0a9d787bc25fc69e9ffc2cf86f4315590032e49860a27f8a12fa1d5815cb336437f8cac6643409693cb506e1f1251ec4524504070639390f660b106f87fe2c9558f6c9a0e6a14207128d7501c7997b73abeaa46e4442ecffea29958c4919c960cc8c54fc2161d88a6fc29d0c75591675d4082098c19a01404af03428430a90eeb73e2e315164bae2d0489216213e6c956add6fd5c0bb3d1bd364bc6db2efe05a972f5417f62e023ab3f795375b3dba51d208757c04fc785e19400f14e858071e9cdbe4f047aa8a3eee160a96246b3f602b689bc040f15082ecdeb48974871d2c19fb4702dc1fa3eaca88836e0d29d79c7c747fafa9c4434e5c08863d677d97b23ecbf9486450e2fd97a0af5b39c6f6a738ad213b16bf8e8e12e3605262d82df8d621e832ef925f6d94fb2c8b78d335dbdf3b6010b545c877a0db358b84f922b46348a45bfaef29c149b927865497b17ce8626daf1501fa312b67b82dbe05d0e1dc85b87ee5cb61d28fa353feb1d24b145af00863ecce79ed55b890e8ea5800bb60a0960da93b2f0385fc2548470f8b8a9cd4ef7e2f776921cd78f45fce3223ad56e9d43cb1212848e39ce9db4947f05f0daac1f2d10ad3"
          },
          {
            "commit": "08291780a9a4c149a8a138a58bd69470ad080a8d2847cf76d59891cef573c41234",
            "features": "Plain",
            "proof": "8adfab42330c05f067924d3ededacf100b26a52e71b426c70e8b66e6949263d725e517586ed6592a8f85de81a680c03b0e08c2eb567adbc3441f041156adc723060925b856da6cfbc93eaf4e88881a8e32d13f7b539aac48a9e2efa299b7597fb3ba7a223e354e9265852327a6cf8d898fc496bf40b00bac9800cae47efed80c2fd7ba5971a313621db5328bb8c86fccb96a1d053c4f3523fb5d3b02897bc6ccab46327bee9555f7f2dfca26f018b02f7ac481c5de13af2ce2684c35af75c7dad60ec43b73a8e7f6c137b6b64c828694066ae649f55f01791482a243061323f1a0781f35149b1aaf3e14ac4fdf10e9392e003b5ee0e0fd0901aeba1896db374a739f6723dfe7d115a5367606c8960d9dfc7973831c35ced529e77314d6f7269b6985ddc9e9b69df17c8fef80755075e79fda7cb8f9959963037143a5d1b8179f9c2256afb3363f7daada6618622897b091fff437df28621206c294b4e14f0a1fc6b2033b9493fcf6e83854a551ec35bb9a1f8d84227911821f726377c9653212cfdb1da6676219ec8f730c1f0e926235215c6e15b7f42748240d425cfa33267a8c635b001e822d3b2a5089dd6e5431f6959480ce495ec3f2840e8e6394886c50dbb9e13a27115cdf2a8331f8448bb05b7e6e66704dd83842eeb4f1660bc42a69177cad0df31f9b0d4b2e3e93f9246f76c556b704d69189dfa627e674efc6c56fc953424d1b1df1bc7fc930ad02ca773743bcde2739f8758bd54019917fa8da91b96a613d56cc45c77cff32e3199e7a079e272a6b5c4c8f03e3131309ab12b8aab7fc36752cd5d84dcecf8e9bff6798d895a27adb09850af61bc9965f8fd409c1452f2c28851ee76a2adfc1af373b5ee9a0bf7321a2f9f917080dca4072b58c62731d32ccac6dd8aa49112919e73902bff33c6ee9b5928876f316e65f4daf21a11480f5"
          }
        ]
      },
      "offset": "cb0060822ae3faee5e48d9c34b42e9848cb6c7dbea17dd5796f58230dedb39f5"
    },
    "fluff": false
  }
}
```
:::
::: details Ok Response
```json
{"id": 1, "jsonrpc": "2.0", "result": {"Ok": null}}
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
3. **Send Initial Slatepack**: Share the slatepack with the recipient.
4. **Wait for Recipient Response**: Await the recipient's signed slatepack.
5. **Finalize the Transaction**: Complete the transaction process.
6. **Decode the Finalized Slate**: Interpret the finalized slate.
7. **Broadcast to the Network**: Send the transaction to the network for propagation.
8. **Track Confirmation**: Monitor the transaction until confirmed on the blockchain.

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

#### **Optional: Decode the Slatepack**
Before processing, the recipient can optionally decode the Slatepack to extract its content using the [decode_slatepack_message](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.decode_slatepack_message) method.



`decode_slatepack_message` <Badge type="info" text="POST" />

::: details Request Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "decode_slatepack_message",
  "params": {
    "token": "ddab9a3b96d73d3539d4e6fc15f69637888425e440d928771aeb7dac4157b8d1",
    "message": "BEGINSLATEPACK. KbRGFBmJFBg5qWg k9Fi7EttkQKZ5pp L4mYHzzCfWw7Anf V8CZ6Ke1bkv3HxH XtrFoycTQ5FgC3p VZZpUiHVDXSXmKD wQJJHpKXZyqL66f bAs8CWvTPZoquaB Azd6XQVqeMRiape dmqpmhPUYE3f4Yr DQNLi9dzSPLU8c3 NT9frEz4oA2GaGB XsbFXqgsVgHeED5 f7859HKg8RVHQCn bC7dGVk3GnZKPA3 ejGahpUud7odiJi WJgThiYTwR7YdZg 9oyH21VCwoNMsar P1. ENDSLATEPACK.",
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
      "recipient": {
        "domain": "",
        "port": null,
        "public_key": "grxdcrjcvdq7aipjzuejjngr3til7euryqrpmtjg4hdqxnx3jyfst2qd"
      },
      "sender": {
        "domain": "",
        "port": null,
        "public_key": "grxdcrjcvdq7aipjzuejjngr3til7euryqrpmtjg4hdqxnx3jyfst2qd"
      },
      "slate": {
        "amount": "200000000",
        "coin_type": "mwc",
        "compact_slate": true,
        "fee": "7000000",
        "height": "2793169",
        "id": "e2757000-4a03-47f9-b6fe-ed91dc2ceb9f",
        "lock_height": "0",
        "network_type": "mainnet",
        "num_participants": 2,
        "participant_data": [
          {
            "id": "0",
            "message": null,
            "message_sig": null,
            "part_sig": null,
            "public_blind_excess": "028d440ffa605a04cc92ca9e77b6be3295042fdc088b12565c73ae3bb4c7fbabae",
            "public_nonce": "0309338aec074b65e82e6077aab0e5a9b052df9948207e047bbedca1477f17a6cd"
          }
        ],
        "payment_proof": null,
        "ttl_cutoff_height": "2794609",
        "tx": {
          "body": {
            "inputs": [],
            "kernels": [
              {
                "excess": "098d440ffa605a04cc92ca9e77b6be3295042fdc088b12565c73ae3bb4c7fbabae",
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

The recipient processes the slate using the [receive_tx](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.ForeignRpc.html#tymethod.receive_tx) method.


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
    "BEGINSLATEPACK. KbRGFBmJFBg5qWg k9Fi7EttkQKZ5pp L4mYHzzCfWw7Anf V8CZ6Ke1bkv3HxH XtrFoycTQ5FgC3p VZZpUiHVDXSXmKD wQJJHpKXZyqL66f bAs8CWvTPZoquaB Azd6XQVqeMRiape dmqpmhPUYE3f4Yr DQNLi9dzSPLU8c3 NT9frEz4oA2GaGB XsbFXqgsVgHeED5 f7859HKg8RVHQCn bC7dGVk3GnZKPA3 ejGahpUud7odiJi WJgThiYTwR7YdZg 9oyH21VCwoNMsar P1. ENDSLATEPACK.",
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
	"Ok": "BEGINSLATEPACK. 2t5mcXih1Sfx51S CH9rhDbtfhuV4ih apEUin14ZMSAZ8r W2ZnELPJzPCADDa bFdgZZp97dL7Dpb oGt2M1DpaiHCn7o L6yabNsTF7JaAcq samYT8nakedqasr be5TTpZ7QCzJSpS NgFE1ksmJfG2izv YdoGCstWSfr4ziV N6aPgP5TLZ2mGcH 6E7WJah9PYMXXkz DBwYacEgkZTMvxz T8YEQXRxCSBewUP 53jk86rc9Cx59ze 8WKaC2wLJ6JKN2F d9DwjPJkTrNX8sQ SyispCGBucFnd5b BfwQXkewm7XuiHQ rf2RcEWwaPDY6To ZgjPbSjP7FVbLqm uWS9niHA9VHBQzw sukTPryeoJrZsbq AUqhY7nvR78db9T EiqaLoWCF1VexbC oWgSkVvFo3CM5d5 rF1dqF63rn7i8WA SfGAMSAjWE1XPgy cD2wFXtUrnPpR6Y 1kpu91yJqybnYZk g1tVdMb37iyGtVW F361CVCwMFPYQ4W vctsgNiMzRkNpWm BqztHACWWKyEuUM DhL5rK7p77KXYo3 pj3mQ1CNh6ckLjC gtG4Eawkoriq3vH LA2Q3g1eW2v2zdM BRrJhJKZKiTZH7h U994Bnx5huHRJ3i Qio7A8z3VktMdwu wFMZdUB8RDPw3r9 p8JjeuDYWpY8LvU nQNabw23pZxpLyY by289pWZqCBWkta H1UkiQ5aYhrwAK5 5ggDfonxnUgHH2b JwZkj7zLRw7jXaZ HmcJbNHBYizFCZe rQHYrkwrywNRar6 AAJD7Lt5ABg1L5q cEVgUwuS86D2b7k x389o3D1XVSRGno JZ63aWJTZqRQhkd Rhs7cvbugraQdnF gAHfUnMBMEqjwDw RxZyQC5ZQR5daWq uTt89NSB5yfRGy6 YYRFLHNZXTG8twC fR4PmYwTwy79paq EGFPpfqdQC29nxR paMWdnrD6Uvkhf1 eFyy4ZCRUTzFYdK daFzZBihWjvR62E AgeCs7W9QuSoF6Z VJwpSSe386xndEF cqWC2ZbJPb8RkXJ Xba6FQib9v1n9rZ JMbLJ46X7HAZgEf jZE5mGzq7qP7nmA 2ssgDtn8BykTeem U9Q8wAcXzTdqfjP pDuJa9MQABZ35rt MAjMAiP6y7ta48t gZ3hyg6uhxNa7Jw kfyuWeFiDZyVg8C 8Gi9ARbMiKLdG4C J92Xrttny51AL4T Za7XK2LPGHBdKP8 9qVjBkMVdNuhaqJ 56RuAdgfBNgC4ws fLunn55BzkHmQL4 BJt3AZFqVD7bzom 4ode7JPMbeJZibo 6JAnz5sf12cm8uX o1RKcM5BfZDeRb2 5pTj7o6VhGUEDB4 je7qGUwZUnyU2af TjZRMoZ7Lv3FhV5 ZXW4uSNBfAfExvE hiBhbAKvVsY3mGG Ycw3vos6e9FZ7oh dQy6tHNm5ZQak45 zM81XZ9E2ZcQdMY KaL4wY7ZyMNGo5x j2wu3Nsv9chrjBM gdwH7MPnGx4yKuh nbERmiEyzvteGoi pzUZ39qYkgT8pmP ffN5. ENDSLATEPACK."
  }
}
```
:::




### **Step 2: Send Response to Sender**

The recipient shares the updated Slatepack with the sender. This allows the sender to proceed with finalizing and broadcasting the transaction to the MWC network.



**Example Response Slatepack:**
```
BEGINSLATEPACK. 2t5mcXih1Sfx51S CH9rhDbtfhuV4ih apEUin14ZMSAZ8r W2ZnELPJzPCADDa bFdgZZp97dL7Dpb oGt2M1DpaiHCn7o L6yabNsTF7JaAcq samYT8nakedqasr be5TTpZ7QCzJSpS NgFE1ksmJfG2izv YdoGCstWSfr4ziV N6aPgP5TLZ2mGcH 6E7WJah9PYMXXkz DBwYacEgkZTMvxz T8YEQXRxCSBewUP 53jk86rc9Cx59ze 8WKaC2wLJ6JKN2F d9DwjPJkTrNX8sQ SyispCGBucFnd5b BfwQXkewm7XuiHQ rf2RcEWwaPDY6To ZgjPbSjP7FVbLqm uWS9niHA9VHBQzw sukTPryeoJrZsbq AUqhY7nvR78db9T EiqaLoWCF1VexbC oWgSkVvFo3CM5d5 rF1dqF63rn7i8WA SfGAMSAjWE1XPgy cD2wFXtUrnPpR6Y 1kpu91yJqybnYZk g1tVdMb37iyGtVW F361CVCwMFPYQ4W vctsgNiMzRkNpWm BqztHACWWKyEuUM DhL5rK7p77KXYo3 pj3mQ1CNh6ckLjC gtG4Eawkoriq3vH LA2Q3g1eW2v2zdM BRrJhJKZKiTZH7h U994Bnx5huHRJ3i Qio7A8z3VktMdwu wFMZdUB8RDPw3r9 p8JjeuDYWpY8LvU nQNabw23pZxpLyY by289pWZqCBWkta H1UkiQ5aYhrwAK5 5ggDfonxnUgHH2b JwZkj7zLRw7jXaZ HmcJbNHBYizFCZe rQHYrkwrywNRar6 AAJD7Lt5ABg1L5q cEVgUwuS86D2b7k x389o3D1XVSRGno JZ63aWJTZqRQhkd Rhs7cvbugraQdnF gAHfUnMBMEqjwDw RxZyQC5ZQR5daWq uTt89NSB5yfRGy6 YYRFLHNZXTG8twC fR4PmYwTwy79paq EGFPpfqdQC29nxR paMWdnrD6Uvkhf1 eFyy4ZCRUTzFYdK daFzZBihWjvR62E AgeCs7W9QuSoF6Z VJwpSSe386xndEF cqWC2ZbJPb8RkXJ Xba6FQib9v1n9rZ JMbLJ46X7HAZgEf jZE5mGzq7qP7nmA 2ssgDtn8BykTeem U9Q8wAcXzTdqfjP pDuJa9MQABZ35rt MAjMAiP6y7ta48t gZ3hyg6uhxNa7Jw kfyuWeFiDZyVg8C 8Gi9ARbMiKLdG4C J92Xrttny51AL4T Za7XK2LPGHBdKP8 9qVjBkMVdNuhaqJ 56RuAdgfBNgC4ws fLunn55BzkHmQL4 BJt3AZFqVD7bzom 4ode7JPMbeJZibo 6JAnz5sf12cm8uX o1RKcM5BfZDeRb2 5pTj7o6VhGUEDB4 je7qGUwZUnyU2af TjZRMoZ7Lv3FhV5 ZXW4uSNBfAfExvE hiBhbAKvVsY3mGG Ycw3vos6e9FZ7oh dQy6tHNm5ZQak45 zM81XZ9E2ZcQdMY KaL4wY7ZyMNGo5x j2wu3Nsv9chrjBM gdwH7MPnGx4yKuh nbERmiEyzvteGoi pzUZ39qYkgT8pmP ffN5. ENDSLATEPACK.
```

### Summary of Recipient Workflow

1. **Receive Initial Slatepack:** Process the initial transaction slate from the sender.
2. **Update and Encode Slate:** Update the slate with recipient details and encode it into a response Slatepack.
3. **Return Response Slatepack:** Share the response Slatepack back with the sender for transaction finalization.