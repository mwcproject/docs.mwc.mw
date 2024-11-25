
# Wallet API

The [wallet API](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/) uses JSON-RPC requests and is split into two separate blocks of functionality:

* [Owner API](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/struct.Owner.html)
* [Foreign API](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/struct.Foreign.html)

Basic auth passwords:
Username: `mwcmain`
Password: `.api_secret`.






## Foreign API

Implementing the `ForeignRpc` trait allows for the creation of a Foreign JSON-RPC API, which is accessible when running `mwc-wallet listen` with default settings. The V2 API is available at `localhost:3415/v2/foreign`, supporting only POST operations with the JSON-RPC request as the body.

## Required Methods

The `ForeignRpc` trait mandates the implementation of the following methods:

- `check_version`: Checks the version of the Foreign API.
- `get_proof_address`: Retrieves the proof address.
- `build_coinbase`: Constructs a coinbase transaction.
- `verify_slate_messages`: Verifies messages within a slate.
- `receive_tx`: Receives a transaction slate.
- `finalize_invoice_tx`: Finalizes an invoice transaction.
- `receive_swap_message`: Processes a swap message.
- `marketplace_message`: Handles a marketplace message.

## Method Details

### `check_version`

Checks the version of the Foreign API.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "check_version",
  "id": 1,
  "params": []
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": {
      "foreign_api_version": 2,
      "supported_slate_versions": [
        "SP",
        "V3B",
        "V3",
        "V2"
      ]
    }
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3415/v2/foreign \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "check_version",
  "id": 1,
  "params": []
}'
```

---

### `get_proof_address`

Retrieves the proof address.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "get_proof_address",
  "id": 1,
  "params": []
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": "fffqrotuelaodwjblwmifg36xjedjw4azbwvfexmxmmzsb6xvzbkhuqd"
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3415/v2/foreign \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "get_proof_address",
  "id": 1,
  "params": []
}'
```

---

### `build_coinbase`

Constructs a coinbase transaction.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "build_coinbase",
  "id": 1,
  "params": [
    {
      "fees": 0,
      "height": 0,
      "key_id": null
    }
  ]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": {
      "kernel": {
        "excess": "08dfe86d732f2dd24bac36aa7502685221369514197c26d33fac03041d47e4b490",
        "excess_sig": "8f07ddd5e9f5179cff19486034181ed76505baaad53e5d994064127b56c5841be02fa098c54c9bf638e0ee1ad5eb896caa11565f632be7b9cd65643ba371044f",
        "features": "Coinbase"
      },
      "key_id": "0300000000000000000000000400000000",
      "output": {
        "commit": "08fe198e525a5937d0c5d01fa354394d2679be6df5d42064a0f7550c332fce3d9d",
        "features": "Coinbase",
        "proof": "9d8488fcb43c9c0f683b9ce62f3c8e047b71f2b4cd94b99a3c9a36aef3bb8361ee17b4489eb5f6d6507250532911acb76f18664604c2ca4215347a5d5d8e417d00ca2d59ec29371286986428b0ec1177fc2e416339ea8542eff8186550ad0d65ffac35d761c38819601d331fd427576e2fff823bbc3faa04f49f5332bd4de46cd4f83d0fd46cdb1dfb87069e95974e4a45e0235db71f5efe5cec83bbb30e152ac50a010ef4e57e33aabbeb894b9114f90bb5c3bb03b009014e358aa3914b1a208eb9d8806fbb679c256d4c1a47b0fce3f1235d58192cb7f615bd7c5dab48486db8962c2a594e69ff70029784a810b4eb76b0516805f3417308cda8acb38b9a3ea061568f0c97f5b46a3beff556dc7ebb58c774f08be472b4b6f603e5f8309c2d1f8d6f52667cb86816b330eca5374148aa898f5bbaf3f23a3ebcdc359ee1e14d73a65596c0ddf51f123234969ac8b557ba9dc53255dd6f5c0d3dd2c035a6d1a1185102612fdca474d018b9f9e81acfa3965d42769f5a303bbaabb78d17e0c026b8be0039c55ad1378c8316101b5206359f89fd1ee239115dde458749a040997be43c039055594cab76f602a0a1ee4f5322f3ab1157342404239adbf8b6786544cd67d9891c2689530e65f2a4b8e"
      }
    }
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3415/v2/foreign \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "build_coinbase",
  "id": 1,
  "params": [
    {
      "fees": 0,
      "height": 0,
      "key_id": null
    }
  ]
}'
```


### `verify_slate_messages`

Verifies messages within a slate.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "verify_slate_messages",
  "id": 1,
  "params": [
    {
      "version": 2,
      "id": "some-slate-id"
    }
  ]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": true
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3415/v2/foreign \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "verify_slate_messages",
  "id": 1,
  "params": [
    {
      "version": 2,
      "id": "some-slate-id"
    }
  ]
}'
```

---

### `receive_tx`

Receives a transaction slate.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "receive_tx",
  "id": 1,
  "params": [
    {
      "slate": {
        "id": "some-slate-id",
        "amount": 1000000,
        "fee": 10000
      },
      "dest_acct_name": null,
      "message": "Transaction message"
    }
  ]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": {
      "id": "some-slate-id",
      "amount": 1000000,
      "fee": 10000
    }
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3415/v2/foreign \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "receive_tx",
  "id": 1,
  "params": [
    {
      "slate": {
        "id": "some-slate-id",
        "amount": 1000000,
        "fee": 10000
      },
      "dest_acct_name": null,
      "message": "Transaction message"
    }
  ]
}'
```

---

### `finalize_invoice_tx`

Finalizes an invoice transaction.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "finalize_invoice_tx",
  "id": 1,
  "params": [
    {
      "slate": {
        "id": "some-invoice-id",
        "amount": 500000
      }
    }
  ]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": {
      "id": "some-invoice-id",
      "amount": 500000
    }
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3415/v2/foreign \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "finalize_invoice_tx",
  "id": 1,
  "params": [
    {
      "slate": {
        "id": "some-invoice-id",
        "amount": 500000
      }
    }
  ]
}'
```

---

### `receive_swap_message`

Processes a swap message.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "receive_swap_message",
  "id": 1,
  "params": [
    {
      "message": "some-swap-message"
    }
  ]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": true
  }
}
```
