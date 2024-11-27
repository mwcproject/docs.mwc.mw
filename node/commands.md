# MWC Node CLI Documentation

Lightweight implementation of the MimbleWimble protocol.

## Global Arguments

- `--floonet`: Run MWC against the Floonet (testnet).
- `--usernet`: Run MWC as a local-only network. Doesn't block peer connections but will not connect to any peer or seed.

## Subcommands

### `clean`
Clean MWC chain data.

---

### `server`
Control the MWC server.

#### Arguments

- `-c, --config_file <file>`: Path to the `mwc-server.toml` configuration file.
- `-p, --port <port>`: Port to start the P2P server on.
- `--api_port <port>`: Port for the API server (e.g., transaction pool API).
- `-s, --seed <node>`: Override seed node(s) to connect to.
- `-w, --wallet_url <url>`: Wallet listener URL for mining rewards.
- `--allow_to_stop`: Enables API to stop the node (non-TUI only).

#### Subcommands

- **`config`**: Generate a `mwc-server.toml` configuration file in the current directory.
- **`run`**: Run the MWC server in the current console.

---

### `client`
Communicate with the MWC server.

#### Subcommands

- **`status`**: Display the current status of the MWC chain.

- **`listconnectedpeers`**: Print a list of currently connected peers.

- **`ban`**: Ban a specific peer.
  - `-p, --peer <address>`: Peer IP and port (e.g., `10.12.12.13:13414`). **Required**.

- **`unban`**: Unban a specific peer.
  - `-p, --peer <address>`: Peer IP and port (e.g., `10.12.12.13:13414`). **Required**.

- **`resetchainhead`**: Reset the local chain head.
  - `<hash>`: Header hash to reset to. **Required**.

- **`verify-chain`**: Trigger a verification of rangeproofs, kernel signatures, and excesses.
  - `-f, --fast`: Skip verification of rangeproofs and kernel signatures; only validate the sum of kernel excesses.

- **`invalidateheader`**: Add a header hash to the denylist.
  - `<hash>`: The header hash to invalidate. **Required**.

---

This documentation outlines all available commands, arguments, and subcommands for the `mwc` node CLI. Customize examples or additional details as necessary.
