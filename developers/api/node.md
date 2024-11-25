
# Node API

The API is used to query a node about various information on the blockchain, networks and peers. By default, the API will listen on `localhost:3413`. The API is started at the same time as the mwc node.
This endpoint requires, by default, [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). The username is `mwcmain`.


## Node API v1

**Note:** version 1 of the API will be deprecated in v4.0.0 and subsequently removed in v5.0.0. Users of this API are encouraged to upgrade to API v2.

This API uses REST for its requests. To learn about what specific calls can be made read the [node API v1 doc](https://github.com/mimblewimble/mwc/blob/master/doc/api/node_api_v1.md).

Basic auth password can be found in `.api_secret`



## Node API v2

This API version uses JSON-RPC for its requests. It is split up into a foreign API and an owner API. The documentation for these endpoints is automatically generated:

* [Owner API](https://docs.rs/mwc_api/latest/mwc_api/trait.OwnerRpc.html)
* [Foreign API](https://docs.rs/mwc_api/latest/mwc_api/trait.ForeignRpc.html)

Basic auth passwords can be found in `.api_secret`/`.foreign_api_secret` files respectively.

::: tip
A complete Postman collection for the MWC Node API can be found [here](https://forum.mwc.mw/t/full-postman-collection-for-mwc-node-api/7696).
:::


## `OwnerRpc`

The `OwnerRpc` trait in the `mwc_api` crate defines the interface for the Owner JSON-RPC API, enabling comprehensive node management operations such as retrieving status, validating the chain, and managing peers.

### Overview

Implementing the `OwnerRpc` trait facilitates the creation of an Owner JSON-RPC API, which is accessible when running `mwc` with default settings. The V2 API is available at `localhost:3413/v2/owner`, supporting POST operations with JSON-RPC requests as the body.

### Required Methods

The `OwnerRpc` trait mandates the implementation of the following methods:

- `get_status`: Retrieves the current status of the node.
- `validate_chain`: Validates the blockchain.
- `compact_chain`: Compacts the blockchain to save space.
- `reset_chain_head`: Resets the chain head to a specific block.
- `invalidate_header`: Invalidates a specific block header.
- `get_peers`: Retrieves information about peers.
- `get_connected_peers`: Retrieves information about currently connected peers.
- `ban_peer`: Bans a specific peer.
- `unban_peer`: Unbans a specific peer.

### Method Details

#### `get_status`

Retrieves the current status of the node.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "get_status",
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
      "protocol_version": "2",
      "user_agent": "MW/Mwc 2.x.x",
      "connections": "8",
      "tip": {
        "height": 371553,
        "last_block_pushed": "00001d1623db988d7ed10c5b6319360a52f20c89b4710474145806ba0e8455ec",
        "prev_block_to_last": "0000029f51bacee81c49a27b4bc9c6c446e03183867c922890f90bb17108d89f",
        "total_difficulty": 1127628411943045
      },
      "sync_status": "header_sync",
      "sync_info": {
        "current_height": 371553,
        "highest_height": 0
      }
    }
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "get_status",
  "id": 1,
  "params": []
}'
```

---

#### `validate_chain`

Validates the blockchain.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "validate_chain",
  "id": 1,
  "params": [true]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": null
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "validate_chain",
  "id": 1,
  "params": [true]
}'
```

---

#### `compact_chain`

Compacts the blockchain to save space.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "compact_chain",
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
    "Ok": null
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "compact_chain",
  "id": 1,
  "params": []
}'
```

---

#### `reset_chain_head`

Resets the chain head to a specific block.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "reset_chain_head",
  "id": 1,
  "params": ["00001d1623db988d7ed10c5b6319360a52f20c89b4710474145806ba0e8455ec"]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": null
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "reset_chain_head",
  "id": 1,
  "params": ["00001d1623db988d7ed10c5b6319360a52f20c89b4710474145806ba0e8455ec"]
}'
```

---

#### `invalidate_header`

Invalidates a specific block header.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "invalidate_header",
  "id": 1,
  "params": ["00001d1623db988d7ed10c5b6319360a52f20c89b4710474145806ba0e8455ec"]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": null
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "invalidate_header",
  "id": 1,
  "params": ["00001d1623db988d7ed10c5b6319360a52f20c89b4710474145806ba0e8455ec"]
}'
```

---

#### `get_peers`

Retrieves information about peers.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "get_peers",
  "id": 1,
  "params": [null]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": [
      {
        "addr": "192.168.1.1:13414",
        "capabilities": "FULL_NODE",
        "user_agent": "MW/Mwc 2.x.x",
        "last_seen": "2024-11-24T12:00:00Z",
        "ban_reason": null,
        "is_banned": false
      },
      {
        "addr": "192.168.1.2:13414",
        "capabilities": "FULL_NODE",
        "user_agent": "MW/Mwc 2.x.x",
        "last_seen": "2024-11-24T12:01:00Z",
        "ban_reason": null,
        "is_banned": false
      }
    ]
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "get_peers",
  "id": 1,
  "params": [null]
}'
```

---

#### `get_connected_peers`

Retrieves information about currently connected peers.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "get_connected_peers",
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
    "Ok": [
      {
        "addr": "192.168.1.1:13414",
        "capabilities": "FULL_NODE",
        "user_agent": "MW/Mwc 2.x.x",
        "last_seen": "2024-11-24T12:00:00Z",
        "ban_reason": null,
        "is_banned": false
      }
    ]
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "get_connected_peers",
  "id": 1,
  "params": []
}'
```

---

#### `ban_peer`

Bans a specific peer.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "ban_peer",
  "id": 1,
  "params": ["192.168.1.1:13414"]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": null
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "ban_peer",
  "id": 1,
  "params": ["192.168.1.1:13414"]
}'
```

---

#### `unban_peer`

Unbans a specific peer.

**JSON-RPC Example:**

```json
{
  "jsonrpc": "2.0",
  "method": "unban_peer",
  "id": 1,
  "params": ["192.168.1.1:13414"]
}
```

**Expected Response:**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": null
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3413/v2/owner \
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "unban_peer",
  "id": 1,
  "params": ["192.168.1.1:13414"]
}'
```

---

This concludes the documentation for the `OwnerRpc` trait in the `mwc_api` crate. Each method in this API provides a clear and standardized way to interact with the MWC blockchain for node and peer management.
