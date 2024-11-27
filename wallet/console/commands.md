# MWC Wallet CLI Documentation

Comprehensive CLI for managing MWC wallets, transactions, outputs, swaps, and more.


## Global Arguments

- `--floonet`: Run `mwc-wallet` on the Floonet (testnet).
- `--usernet`: Run `mwc-wallet` as a local-only network. Does not block peer connections but will not connect to any peers or seeds.
- `-p, --pass <passphrase>`: Wallet passphrase to encrypt the wallet seed.
- `-a, --account <name>`: Specify the wallet account to use.
- `-t, --top_level_dir <dir>`: Specify the top-level directory for wallet files (`mwc-wallet.toml` location).
- `-e, --external`: Listen on all interfaces (`0.0.0.0`) to allow external connections (default: `127.0.0.1`).
- `-s, --show_spent`: Show spent outputs in wallet output commands.
- `-r, --api_server_address <address>`: Specify the API address of the running node for checking inputs and posting transactions.

---

## Subcommands

### `info`
Show a basic wallet summary.

**Arguments**
- `-c, --min_conf <num>`: Minimum confirmations required for outputs. Default: `10`.

---

### `outputs`
Display raw wallet output information.

**Arguments**
- `-s, --show_spent`: Include spent outputs in the list.
- `-u, --show_unspent`: Include only unspent outputs.

---

### `txs`
Display wallet transaction information.

**Arguments**
- `-i, --id <id>`: Display details of a transaction with the given ID.
- `-t, --txid <uuid>`: Display details of a transaction with the given TxID.
- `-c, --count <num>`: Maximum number of transactions to display.

---

### `post`
Post a finalized transaction to the blockchain.

**Arguments**
- `-i, --input <file>`: File containing the transaction to post.
- `-f, --fluff`: Fluff the transaction, bypassing the Dandelion protocol.

---

### `repost`
Repost a stored, unconfirmed transaction to the chain.

**Arguments**
- `-i, --id <id>`: Transaction ID to repost.
- `-m, --dumpfile <file>`: Save the transaction to a file instead of posting.
- `-f, --fluff`: Fluff the transaction.

---

### `cancel`
Cancel a previously created transaction, unlocking outputs.

**Arguments**
- `-i, --id <id>`: Transaction ID to cancel.
- `-t, --txid <uuid>`: Transaction UUID to cancel.

---

### `scan`
Check and repair wallet outputs by scanning the blockchain.

**Arguments**
- `-d, --delete_unconfirmed`: Delete unconfirmed outputs and associated transactions.
- `-h, --start_height <block>`: Block height to start scanning from.
- `-b, --backwards_from_tip <blocks>`: Start scanning backwards from the tip by this many blocks.

---

### `address`
Display the wallet's payment proof address.

---

### `init`
Initialize a new wallet.

**Arguments**
- `-h, --here`: Create wallet files in the current directory instead of the default location.
- `-s, --short_wordlist`: Generate a 12-word recovery phrase instead of the default 24 words.
- `-r, --recover`: Initialize the wallet using a recovery phrase.

---

### `close`
Close the wallet in interactive mode.

---

### `recover`
Display the recovery phrase for the wallet.

---

### `send`
Send coins to a specified listener or save the transaction to a file.

**Arguments**
- `<amount>`: Amount of coins to send (e.g., `12.34` or `max` for the maximum balance).
- `-c, --min_conf <num>`: Minimum confirmations required for outputs. Default: `10`.
- `-x, --exclude_change_outputs`: Exclude change outputs from the confirmation requirement.
- `-r, --minimum_confirmations_change_outputs <num>`: Minimum confirmations for change outputs (requires `-x`).
- `-s, --selection <strategy>`: Coin selection strategy (`all`, `smallest`). Default: `smallest`.
- `-e, --estimate-selection`: Estimate all possible selection strategies.
- `-o, --change_outputs <num>`: Number of change outputs to generate (default: `1`).
- `--min_fee <amount>`: Specify a minimal fee value.
- `-m, --method <method>`: Sending method (`http`, `file`, `slatepack`, `self`, `mwcmqs`). Default: `http`.
- `-d, --dest <destination>`: Destination server or file.
- `-a, --apisecret <secret>`: Receiver wallet's API secret (HTTP/HTTPS only).
- `-y, --proof`: Request a payment proof from the recipient.
- `-z, --proof_address <address>`: Recipient's proof address (required for non-Tor).
- `-f, --fluff`: Fluff the transaction (ignore Dandelion relay protocol).
- `-g, --message <msg>`: Optional participant message.
- `-b, --ttl_blocks <num>`: Transaction time-to-live in blocks.
- `-p, --outputs <outputs>`: Comma-separated custom outputs to include in the transaction.
- `--slatepack_recipient <key>`: Recipient's public key for Slatepack encoding.
- `--slate_version <num>`: Use a specific Slate version (e.g., `4` for Slatepacks).
- `--bridge`: Enable a Tor bridge relay.
- `-q, --slatepack_qr`: Display Slatepack data as a QR code.
- `--amount_includes_fee`: Specify that the transaction amount includes the fee.

---

### `receive`
Process a transaction file to accept a transfer from a sender.

**Arguments**
- `-f, --file <file>`: Input file containing the Slate or Slatepack.
- `-c, --content <data>`: Slate or Slatepack content as a string.
- `-o, --outfile <file>`: Output file for the response.
- `-g, --message <msg>`: Optional participant message.
- `-q, --slatepack_qr`: Display Slatepack data as a QR code.

---

### `finalize`
Finalize a transaction received from a sender.

**Arguments**
- `-f, --file <file>`: Input file containing the transaction.
- `-c, --content <data>`: Slate or Slatepack content as a string.
- `-l, --fluff`: Fluff the transaction (ignore Dandelion relay protocol).
- `-n, --nopost`: Do not post the transaction to the network.
- `-d, --dest <file>`: Save the finalized Slate to a specified file.

---

### `swap`
Manage atomic swaps.

**Arguments**
- `-l, --list`: List all swap trades.
- `-r, --remove`: Remove a swap trade.
- `-c, --check`: Check the status of a swap trade.
- `-p, --process`: Process the next step of a swap trade.
- `-i, --swap_id <id>`: Specify the swap trade ID for the command.
- `-m, --method <method>`: Method for sending messages (`tor`, `file`, `mwcmqs`).
- `-d, --dest <destination>`: Target location for swap files or messages.

---

### `owner_api`
Run the wallet's local owner API.

**Arguments**
- `-l, --port <port>`: Port for the wallet owner listener.
- `--run_foreign`: Run the foreign API alongside the owner API.

---

### `export_proof`
Export a payment proof for a completed transaction.

**Arguments**
- `<output>`: File to save the proof.
- `-i, --id <id>`: Transaction ID for the proof.

---

### `verify_proof`
Verify a payment proof.

**Arguments**
- `<input>`: File containing the payment proof to verify.

