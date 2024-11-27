# MWC Wallet User Guide

This Document is detailed documentation for the MWC CLI Wallet, for more specific Userguides check the Sidebar on the right!
The information on this page is current as of release v3.2.1

- [General Information](#general-information)
    - [Wallet File Structure](#wallet-file-structure)
    - [Data Directory](#data-directory)
    - [Logging Output](#logging-output)
    - [TOR Configuration](#tor-configuration)
- [Global Wallet Arguments](#global-wallet-arguments)
    - [Account](#account)
    - [Node Address](#node-address)
    - [Password](#password)
- [Wallet Commands](#wallet-commands)
    - [help](#help)
    - [init](#init)
        * [Recovering from a passphrase](#recovering-from-an-existing-seed)
    - [recover](#recover)
    - [account](#account)
    - [info](#info)
    - [listen](#listen)
        * [Listening via TOR](#listening-via-tor)
    - [send](#send)
        * [Sending via HTTP](#sending-via-http)
        * [Sending via TOR](#sending-via-tor)
        * [Sending via file](#sending-via-tor)
        * [Self-sending](#self-sending)
        * [Requesting a payment proof](#requesting-a-payment-proof)
        * [Other flags](#other-flags)
    - [invoice](#invoice)
    - [outputs](#outputs)
    - [txs](#txs)
    - [cancel](#cancel)
    - [address](#address)
    - [receive](#receive)
    - [pay](#pay)
    - [finalize](#finalize)
    - [post](#post)
    - [repost](#repost)
    - [scan](#scan)
    - [export_proof and verify_proof](#export_proof-and-verify_proof)
- [Wallet Plugins](#wallet-plugins)
    - [Keybase](#keybase)

# General Information

## Wallet File Structure

A MWC wallet maintains its state in an LMDB database, with the master seed stored in a separate file. When creating a new wallet, the file structure should be:

```
~/[Wallet Directory]
   -wallet_data/
      -db/
         -/lmdb
      wallet.seed
   -tor/
   mwc-wallet.toml
   mwc-wallet.log
```

* `mwc-wallet.toml` contains configuration information for the wallet. You can modify values within to change ports, the address of your MWC node, or logging values.

* `wallet_data/wallet.seed` is your master seed file. Its contents are encrypted with your password (required). You should back this file up somewhere in order to be able to recover or restore your wallet. Your seed file can also be recovered using a seed phrase if you lose this file or forget your password.

* `tor` contains TOR configuration files used by the wallet listener. There should be no need to manipulate anything in this directory manually.

## Data Directory

By default MWC will create all wallet files in the hidden directory `.mwc` under your home directory (i.e. `~/.mwc`). You can also create and use a wallet with data files in the current directory, as explained in the `mwc-wallet init` command below.

## Logging Output

Logging configuration for the wallet is read from `mwc-wallet.toml`.

## TOR configuration

`mwc-wallet.toml` contains a [tor] section used to configure values when sending or listening via TOR.

`use_tor_listener` specifies whether the TOR listener should also be invoked when starting the wallet listener via [`listen`](#listen). This defaults to true

`socks_proxy_address` contains the listening address of TOR's socks proxy port. (This should generally be left alone)

# Global Wallet Arguments

## Account

The wallet supports multiple accounts. To set the active account for a wallet command, use the '-a' switch, e.g:

```sh
mwc-wallet -a account_1 info
```

All output creation, transaction building, and querying is done against a particular account in the wallet. If the '-a' switch is not provided for a command, the account named 'default' is used.

## Node Address

The wallet generally needs to talk to a running MWC node in order to remain up-to-date and verify its contents. By default, the wallet tries to contact a node at `127.0.0.1:3413`. To change this, modify the value in the wallet's `MWC_wallet.toml` file. Alternatively, you can provide the `-r` (seRver) switch to the wallet command, e.g.:

```sh
mwc-wallet -r "http://192.168.0.2:1341" info
```

If commands that need to update from a MWC node can't find one, they will generally inform you that the node couldn't be reached and the results could not be verified against the latest chain information.

## Password

Your wallet.seed file, which contains your wallet's unique master seed, is encrypted with your password. Your password is specified at wallet creation time, and must be provided for any wallet operation. You will be prompted for your password when required, but you can also specify it on the command line by providing the `-p` argument. Please note this will place your password in your shell's command history, so use this switch with caution.

```sh
mwc-wallet -p mypass info
```

# Wallet Commands

## help

`mwc-wallet --help` will display usage info and all flags.
`mwc-wallet help [command]` will display flags specific to the command, e.g `mwc-wallet help listen`

## init

Before using a wallet a new `mwc-wallet.toml` configuration file, master seed (contained in `wallet.seed`) and storage database need to be generated via the init command as follows:

```sh
mwc-wallet init
```

You will be prompted to enter a password for the new wallet. By default, your wallet files will be placed into `~/.mwc`. Alternatively, if you'd like to run a wallet in a directory other than the default, you can run:

```sh
mwc-wallet init -h
```

This will create a `mwc-wallet.toml` file in the current directory configured to use the data files in the current directory, as well as all needed data files. When running any `mwc-wallet` command, MWC will check the current directory to see if a `mwc-wallet.toml` file exists. If not it will use the default in `~/.mwc`

On a successful wallet init, the wallet will print a 24 (or 12) word recovery phrase, which you should write down and store in a non-digital format. This phrase can be used to re-create your master seed file if it gets lost or corrupted, or if you forget the wallet password. If you'd prefer to use a 12-word recovery phrase, you can also pass in the `--short_wordlist` or `-s` parameter.

It is highly recommended that you back up the `~/.mwc/main/wallet_data/wallet.seed` file somewhere safe and private, and ensure you somehow remember the password used to encrypt the wallet seed file.

### Recovering from an existing seed

If you need to recreate your wallet from an existing seed, you can `init` a wallet with an existing recovery phrase using the `-r` `--recover` flag. The following initializes a wallet in the current directory, prompting the user for a recovery phrase to use when creating its `wallet.seed` file.

```sh
mwc-wallet init -hr
File /home/yeastplume/wallet/mwc-wallet.toml configured and created
Please enter your recovery phrase:
phrase> error decide hen crunch despair play entry decorate moon risk mixed exit century razor endless attack either spray small stable fan result wrong brief
Please provide a new password for the recovered wallet
Password:
Confirm Password:
20190110 11:33:42.111 WARN MWC_wallet::types - Generating wallet seed file at: /home/yeastplume/wallet/wallet_data/wallet.seed                                                                                                                                                 
Your recovery phrase is:

error decide hen crunch despair play entry decorate moon risk mixed exit century razor endless attack either spray small stable fan result wrong brief

Please back-up these words in a non-digital format.
Command 'init' completed successfully
```

This command will recreate your existing wallet seed. On first run, the wallet will scan the entire chain and restore any outputs that may belong to the wallet.

## recover

The `recover` command is used to display the wallet's 24 (or 12) word recovery phrase, e.g:

```sh
mwc-wallet recover
Password:
Your recovery phrase is:

shiver alarm excuse turtle absorb surface lunch virtual want remind hard slow vacuum park silver asthma engage library battle jelly buffalo female inquiry wire

Please back-up these words in a non-digital format.
```

## account

The `account` command is use used to manage wallet accounts. To create a new account, use the `mwc-wallet account` command with the argument '-c', e.g.:

```sh
mwc-wallet account -c my_account
```

This will create a new account called 'my_account'. To use this account in subsequent commands, provide the '-a' flag to all wallet commands:

```sh
mwc-wallet -a my_account info
```

To display a list of created accounts in the wallet, use the 'account' command with no flags:

```sh
mwc-wallet account

____ Wallet Accounts ____

 Name       | Parent BIP-32 Derivation Path
------------+-------------------------------
 default    | m/0/0
 my_account | m/1/0
 
```

## info

The `info` command summarizes wallet account balances.

```sh
mwc-wallet info
Password:

____ Wallet Summary Info - Account 'default' as of height 13833 ____

 Total                            | 60.482000000
 Immature Coinbase (< 1440)       | 60.030000000
 Awaiting Confirmation (< 10)     | 0.452000000
 Awaiting Finalization            | 1200.453000000
 Locked by previous transaction   | 1200.453000000
 -------------------------------- | -------------
 Currently Spendable              | 0.000000000

Command 'info' completed successfully
```

* **Total** is the total confirmed amount in the wallet, including coins ready for spending and those awaiting confirmation.
* **Immature coinbase** denotes coinbase rewards in the wallet that have not yet matured and are unavailable for spending (you must wait a day's worth of blocks, or 1440 before spending coinbase outputs).
* **Awaiting confirmation** denotes the balance from transactions that have appeared on-chain but for which your wallet is waiting a set number of blocks before marking them as spendable. You can override this value by providing the `-c` (`--minimum_confirmations`) switch to the wallet.
* **Awaiting Finalization** is the balance from transactions that have not yet appeared on the chain. This is usually due to the other involved party not having completed or posted a transaction. This amount does not appear in the wallet total.
* **Locked by previous transaction** is the balance locked by a previous transaction you have made that is currently awaiting finalization. This is usually made up of change outputs that are to be returned to your wallet. Once the involved transaction appears on chain, this balance should become unlocked and available for spending.
* **Currently Spendable** is the amount currently available for transacting.

## listen

The `listen` command opens an http and (if available) TOR listener on the specified port, which will listen for:

* Coinbase Transaction from a mining server
* Transactions initiated by other parties

By default the `listen` commands runs in a manner that only allows http access from the local machine. To open this port up to other machines, you can either modify the `api_listen_interface` parameter in `mwc-wallet.toml`, or use the `-e` switch:

```sh
mwc-wallet -e listen
```

Note that listening externally via the `-e` switch is not necessary when using your TOR hidden service address ([see below](#listening-via-tor).

To change the port on which the wallet is listening, either configure `api_listen_port` in `mwc-wallet.toml` or use the `-l` flag, e.g:

```sh
mwc-wallet -l 14000 listen
```

The wallet will listen for requests until the process is cancelled with `<Ctrl-C>`. Note that external ports/firewalls need to be configured properly if you're expecting requests from outside your local network (well out of the scope of this document). As an alternative to this, you can ensure your wallet is:

### Listening via TOR

As of v3.0.0, the wallet listener is capable of listening via a TOR hidden service. This means that listeners do not have to worry about configuring their network or firewalls so long as your machine can connect to the TOR network.

The wallet listener will automatically listen via TOR so long as the `tor` or `tor.exe` executable is available on the system path. If TOR is found, the wallet will automatically configure a hidden service and display the wallet's listening address. This address can then be provided to other users to send you funds via the [`send`](#send) command.

Note that the TOR listener still requires the http listener to be active, however it does not need to be listening externally (i.e. with the `-e`) flag. So long as the TOR executable is on the path, it should suffice to run `mwc-wallet listen`.

You can prevent starting the TOR listener with the `-n`,`--no-tor` flag.

## send

The `send` command is the method through which you interactively send MWCs to another party. This can either be an immediate synchronous exchange, as happens when contacting a listening wallet directly via http or TOR, or an asynchronous process, such as exchanging transaction files via email. 

It's important to understand exactly what happens during a send command, so at a very basic level the `send` interaction is as follows:

1) Your wallet selects a number of unspent inputs from your wallet, enough to cover the 60 MWCs + fees.
2) Your wallet locks these inputs so as not to select them for other transactions, and creates a change output in your wallet for the difference.
3) Your wallet adds these inputs and outputs to a transaction, and sends the transaction to the recipient.
4) The recipient adds their output for 60 MWCs to the transaction, and returns it to the sender.
5) The sender completes signing of the transaction.
6) The sender posts the transaction to the chain.

Outputs in your wallet that are involved in a `send` transaction will appear as awaiting finalization, unconfirmed or locked until the transaction hits the chain and is mined and validated.

There are currently several methods of sending:

### Sending via HTTP

If the recipient is running an accessible wallet listener, sending a transaction via HTTP is the most direct method. Usually, all that should be required are the destination (`-d`) and the amount itself. To send an amount to another listening wallet:

```sh
mwc-wallet send -d "http://192.168.0.10:13415" 60.00
```

This will create a transaction with the other wallet listening at 192.168.0.10, port 13415 which credits the other wallet 60 MWCs while debiting the 60 MWC + fees from your wallet.

### Sending via TOR

If the recipient is running a TOR listener (see the [`listen`](#listen) command above), you can send directly to the listener's TOR hidden service address:

```sh
mwc-wallet send -d "http://zw5ws7q4oh3arzskmlkco6ia4awmjr2usv72ax7z3pfmhvklhmavzoid.onion" 60.00
```

### Sending via File

* `-m` 'Method', which can be 'http', 'file' or 'self' (described above). If 'http' is specified (default), the transaction will be sent to the IP address which follows the `-d` flag. 

Transaction can also be created via the exchange of files. If the parameter `-m file` is specified, MWC wallet will generate a partial transaction file under the file name specified in the `-d` flag:

```sh
mwc-wallet send -d "transaction.tx" -m file 60.00
```

This file then needs to be sent to the recipient, who can then import the transaction into their wallet using:
```sh
mwc-wallet receive -f transaction.tx
```

This will create a `transaction.tx.response` file, which the recipient must send back to the sender to finalize:

```sh
mwc-wallet finalize -f transaction.tx.response`
```

### Self Sending

You can also create a transaction entirely within your own wallet by specifying the method 'self'. Using the 'self' method, you can send yourself money in a single command (for testing purposes,) or distribute funds between accounts within your wallet without having to run a listener or manipulate files. For instance, to send funds from your wallet's 'default' account to an account called 'account1', use:

```sh
mwc-wallet send -m self -d "account1" 60
```

or, to send between accounts, use the -a flag to specify the source account:

```sh
mwc-wallet -a "my_source_account" send -m self -d "my_dest_account" 60
```

When sending to self, the transaction will be created and posted to the chain in the same operation.

### Requesting a Payment Proof

As of v3.0.0, it is possible to request that the recipient fill out a payment proof when responding to your transaction. When the transaction is completed, the sender will have intractable proof that the funds in the transaction were received by the recipient's wallet.

Payment proofs require that a wallet has some way to identify itself. MWC's payment proofs rely on the wallet deterministically generating a unique address from its master seed. Note that this is not the same concept of address that other Bitcoin-based cryptocurrencies might use to build transactions (as MimbleWimble has no addresses); this address is used uniquely for payment-proof identification.

Conveniently, this address also corresponds to the TOR hidden service address used by a wallet listening over TOR. This, when sending a transaction and requesting a payment proof via TOR, the sender does not need to specify any additional information when requesting a payment proof.

To request the that the recipient complete a payment proof as part of a transaction, use the `--request-payment-proof` (`-y`) flag when performing as send. If sending via TOR:

```sh
mwc-wallet send -y -d "http://zw5ws7q4oh3arzskmlkco6ia4awmjr2usv72ax7z3pfmhvklhmavzoid.onion" 60.00
```

If not sending via TOR, a payment proof can still be specified so long as the recipient provides the user with their address (which can be retrieved via the [`address`](#address) command). If not sending via TOR, this must be provided via the `--proof-address` (`-z`) option:

```sh
mwc-wallet send -y -z zw5ws7q4oh3arzskmlkco6ia4awmjr2usv72ax7z3pfmhvklhmavzoid -d "http://192.168.0.2:3415" 60.00
```

Once a payment-proof enabled transaction is completed, the proof can be viewed in the sender's transaction log when viewing a single transaction (see the [`txs`](#txs) command). It can also be exported and verified via the [`export-proof` and `verify_proof`](#export_proof-and-verify_proof) commands.

### Other flags

* `-e` 'Estimate selection', performs a 'dry-run' of the transaction creation, without locking or committing funds. This can be used to see what coins would be selected using the selection strategies outlined below.

* `-m` 'Method', which can be 'http', 'file' or 'self' (described above). 

* `-s` 'Selection strategy', which can be 'all' or 'smallest'. This defaults to `smallest`, which chooses the minimum number of outputs needed from your wallet to cover the requested amount. You can also use `all`, which reduces your wallet size and increases operation speed by consolidating your wallet's content (up to a maximum number of inputs) into a single output. The downside of this that the entire contents of your wallet remains locked until the transaction is validated on the chain. To use this method:

```sh
mwc-wallet send -d "http://192.168.0.10:13415" -s all 60.00
```

* `-f` 'Fluff' MWC uses a protocol called 'Dandelion' which bounces your transaction directly through several listening nodes in a 'Stem Phase' before randomly 'Fluffing', i.e. broadcasting it to the entire network. This reduces traceability at the cost of lengthening the time before your transaction appears on the chain. To ignore the stem phase and broadcast immediately:

```sh
mwc-wallet send -f -d "http://192.168.0.10:13415" 60.00
```

* `-g` 'Message' - You can specify an optional message to include alongside your transaction data. This message is purely for informational purposes between all transacting participants, and is not included in transaction data sent to the chain. Each participant message includes a signature that can be verified with the participant's public key. A message can also be specified by the recipient during a `mwc-wallet receive`
command.

```sh
mwc-wallet send -f -d "http://192.168.0.10:13415" -g "This is from Dave" 60.00
```

* `-b`, `--ttl_blocks` - If this is specified, the number of blocks into the future after which wallets should refuse to process transaction further. This can be useful for putting time limits on transaction finalization, but please note this is not enforced at the MWC protocol level; it's completely up to individual wallets whether they wish to respect this flag.

## invoice

It is also possible to send an `invoice` transaction, e.g. a transaction in which the initiator requests an amount for payment, and sends to the other party to pay the amount into the transaction.

Since invoice transactions require manual confirmation from the party inserting the funds, they can only be created and sent to payers via file. The command is

```sh
mwc-wallet invoice -d "invoice.tx" 60.00
```

The transaction file can be sent to the other party, who can choose to fill out the transaction using the [`pay`](#pay) command:

```sh
mwc-wallet pay -m file -i "invoice.tx" -d "invoice.tx.resp"

Password: 

This command will pay the amount specified in the invoice using your wallet's funds.
After you confirm, the following will occur: 

* 60.000000000 of your wallet funds will be added to the transaction to pay this invoice.
* The resulting transaction will be saved to the file 'invoice.tx.2', which you can manually send back to the invoice creator.

The invoice slate's participant info is:

Participant ID 1 (Recipient)
---------------------
Public Key: 038b7e3f1f6a1fb56422fc8dba732a643bcabf72b031d626e2e6d35860190c6eb6
Message: None
Message Signature: None

Please review the above information carefully before proceeding

To proceed, type the exact amount of the invoice as displayed above (or Q/q to quit) > 60.000000000
```

This file can then be sent back to the initiator for completion via the [`finalize`](#finalize) command.

Note that it is possible to send the paid transaction directly back to the initiator's listening wallet:

```sh
mwc-wallet pay -i "invoice.tx" -d zw5ws7q4oh3arzskmlkco6ia4awmjr2usv72ax7z3pfmhvklhmavzoid
```

See the [`pay`](#pay) command for further details

## outputs

Simply displays all the the outputs in your wallet: e.g:

```sh
mwc-wallet outputs
Wallet Outputs - Account 'default' - Block Height: 49                                                                                                               
------------------------------------------------------------------------------------------------------------------------------------------------
 Key Id                Child Key Index  Block Height  Locked Until  Status       Is Coinbase?  Num. of Confirmations  Value         Transaction
================================================================================================================================================
Wallet Outputs - Account 'default' - Block Height: 12548
------------------------------------------------------------------------------------------------------------------------------------------------------
 Output Commitment                                                   Block Height  Locked Until  Status       Coinbase?  # Confirms  Value         Tx
======================================================================================================================================================
 0916ac8d29511c1c75a190981c09664fc077eb917888ee1755114de0e0d01101fa  12548         0             Unconfirmed  false      0           14.742000000  3
------------------------------------------------------------------------------------------------------------------------------------------------------
 088c087a1efcd3b0711fde1ef56f95b0d781dc7f9678411e8ae7fcfcd94b40c3b1  12548         0             Unconfirmed  false      0           10.250000000  4
------------------------------------------------------------------------------------------------------------------------------------------------------
 08f2218522fcc3b7e6bc24f26de25e429d057219716615e77061fcbed37df73e2b  6762          6762          Locked       false      5787        0.049000000   3
------------------------------------------------------------------------------------------------------------------------------------------------------
 08feb352971ed97918759ba29461aed9634989c3080c9319bcd2a99b46662cd3f2  6762          6762          Locked       false      5787        24.950000000  3
------------------------------------------------------------------------------------------------------------------------------------------------------

```

Spent outputs are not shown by default. To show them, provide the `-s` flag.

```sh
mwc-wallet -s outputs
```

## txs

Every time an operation is performed in your wallet (receive coinbase, send, receive), an entry is added to an internal transaction log containing vital information about the transaction. Because the Mimblewimble chain contains no identifying information whatsoever, this transaction log is necessary in order to allow your wallet to keep track of what was sent and received. To view the contents of the transaction log, use the `txs` command:

```sh
mwc-wallet txs
Transaction Log - Account 'default' - Block Height: 353623                                                                                                                                                                                                                                                                     
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Id  Type         Shared Transaction Id                 Creation Time        TTL Cutoff Height  Confirmed?  Confirmation Time    Num.    Num.     Amount    Amount   Fee    Net         Payment   Kernel                                                              Tx  
                                                                                                                                 Inputs  Outputs  Credited  Debited         Difference  Proof                                                                         Data 
===========================================================================================================================================================================================================================================================================
 0   Received Tx  None                                  2019-11-27 14:28:04  None               true        2019-11-27 14:28:04  0       1        798.991   0.0      None   798.991     None      None                                                                None 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1   Sent Tx      464d6f28-1ee7-4d9f-99b0-cef05c5484bc  2019-11-27 14:29:46  None               true        2019-11-27 14:36:00  1       1        788.983   798.991  0.008  -10.008     Yes       09c1d295da693471b0e0f54d52ef92fb6ce2ce596d62cc3ee405f913d69a3bbbd0  Yes  
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 2   Sent Tx      c226eb2b-e49a-4ad5-9de4-b3b1e59b0a0b  2019-11-27 15:02:38  None               true        2019-11-28 09:45:33  1       1        778.975   788.983  0.008  -10.008     None      08bb2b9cfad39088c1a49af71454d40f8652f0fb80bb55592077839fd225249689  Yes 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 3   Sent Tx      cd58b6f5-006c-41ce-85fa-988f2631e8a7  2019-11-28 09:45:34  None               true        2019-11-28 09:50:07  1       1        768.967   778.975  0.008  -10.008     Yes       091950306a52f5be2ed2f17744270e4df927dfad4e40f74745256605c223750c7d  Yes 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 4   Sent Tx      999290be-e79b-4a8e-9592-dfb667c93d45  2019-12-03 19:11:02  None               true        2019-12-03 19:15:08  1       1        767.959   768.967  0.008  -1.008      None      0879c57c5f3a70c733d7cd9570f1f1567e4c3dad640b412bc798846393d7dbb01f  Yes  
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 5   Sent Tx      69eb11e5-c3ad-45a5-ba1f-5c8dbf06b36a  2019-12-03 19:18:20  None               true        2019-12-03 19:41:40  1       1        766.951   767.959  0.008  -1.008      None      0927f00070aedc10ad896679de33b5fb608ab350bd15c8ffa331ba5cfa24426e39  Yes 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 6   Received Tx  83c68aeb-6722-47df-8ad8-2991256d1d84  2019-12-03 19:41:23  None               true        2019-12-03 19:41:50  0       1        1.0       0.0      None   1.0         None      0843d88116306a6f6a130aaf412a992d19b45ef39c380d789d9cb926ee33af1e5c  None 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

To see the inputs/outputs associated with a particular transaction, as well as any messages or payment proofs associated with the transaction use the `-i` switch providing the Id of the given transaction, e.g:

```sh
mwc-wallet txs -i 26
Transaction Log - Account 'default' - Block Height: 353625
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Id  Type     Shared Transaction Id                 Creation Time        TTL Cutoff Height  Confirmed?  Confirmation Time    Num.    Num.     Amount    Amount   Fee    Net         Payment   Kernel                                                              Tx  
                                                                                                                             Inputs  Outputs  Credited  Debited         Difference  Proof                                                                         Data 
=======================================================================================================================================================================================================================================================================
 26  Sent Tx  5cfb76d7-1ca9-4345-a939-2aa2dc423085  2020-01-24 10:51:32  None               true        2020-01-30 11:40:11  1       1        753.905   754.913  0.008  -1.008      Yes       081794e546cc9964e5fdbd98625cd66bf83dedb3ae348296d612cbde7bde4fd974  Yes 
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Wallet Outputs - Account 'default' - Block Height: 353625
-------------------------------------------------------------------------------------------------------------------------------------------------------------
 Output Commitment                                                   MMR Index  Block Height  Locked Until  Status  Coinbase?  # Confirms  Value          Tx 
=============================================================================================================================================================
 080c4f242821d7342e3e6976c1ab5de35d088bc608515fef8e9477b564d3ec0d7c  None       339866        0             Spent   false      13760       754.913000000  26 
-------------------------------------------------------------------------------------------------------------------------------------------------------------


Transaction Messages - Transaction '26'
--------------------------------------------------------------------------------------------------------
 Participant Id  Message  Public Key                                                          Signature 
========================================================================================================
 0               None     029dc1cd28acfec01f575f880b3c57bdd3cdc435ade104a8d3ef8f598c943dc684  None 
--------------------------------------------------------------------------------------------------------
 1               None     035da777ecb227f6691b5067183f1af0f705304551f455fe5aef3232949348f825  None 
--------------------------------------------------------------------------------------------------------


Payment Proof - Transaction '26'

Receiver Address: pyai5nmtxil5cfxcqllcm6r4nkwypoiqsm5ngtp2jv6szevwxiyrekid
Receiver Signature: ba37f3850f5b4666c2fdd99fc027f8ef114ce224f08a3df4a43996cdd96ebf61575b875320a2898386cbcb8fb092357127465de23751db5b3dbceca09460f00a
Amount: 1.0
Kernel Excess: 081794e546cc9964e5fdbd98625cd66bf83dedb3ae348296d612cbde7bde4fd974
Sender Address: zw5ws7q4oh3arzskmlkco6ia4awmjr2usv72ax7z3pfmhvklhmavzoid
Sender Signature: 66aee2aa869b949a05af45a380826cf820dd3759a0c57ac887c754ad93249871ff3892e3e37039ecb5b65f87fa79263f2696338ec00207e956a0801b7190a90d
```

## cancel

Everything before Step 6 in the [`send`](#send) phase above happens completely locally in the wallets' data storage and separately from the chain. Since it's very easy for a sender, (through error or malice,) to fail to post a transaction to the chain, it's very possible for the contents of a wallet to become locked, with all outputs unable to be selected because the wallet is waiting for a transaction that will never hit the chain to complete. 

For example, this transaction from `mwc-wallet txs` is showing as `confirmed == false`:

```sh
 8   Sent Tx      ac6778e1-7fdc-423e-ba78-5f3b05b840af  2019-12-03 20:30:42  None               false       None                 2       1        765.936   766.943  0.007  -1.007      None      0923fdb0447b15fd1548939e6ad5a8b0c69abeafd082555553deefbecf52cb78e7  Yes                                                                                                                                                                                                                                                          
```

Meaning the wallet has not seen any of the associated outputs on the chain. If it's evident that this transaction will never be posted, locked outputs can be unlocked and associate unconfirmed outputs removed with the `cancel` command.

Running against the data above, as an example:

```sh
mwc-wallet cancel -i 8
mwc-wallet txs -i 8
Transaction Log - Account 'default' - Block Height: 353626
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Id  Type         Shared Transaction Id                 Creation Time        TTL Cutoff Height  Confirmed?  Confirmation Time  Num.    Num.     Amount    Amount   Fee    Net         Payment   Kernel                                                              Tx  
                                                                                                                               Inputs  Outputs  Credited  Debited         Difference  Proof                                                                         Data 
=========================================================================================================================================================================================================================================================================
 8   Sent Tx      ac6778e1-7fdc-423e-ba78-5f3b05b840af  2019-12-03 20:30:42  None               false       None               2       1        765.936   766.943  0.007  -1.007      None      0923fdb0447b15fd1548939e6ad5a8b0c69abeafd082555553deefbecf52cb78e7  Yes 
     - Cancelled                                                                                                                                                                                                                                                     
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Wallet Outputs - Account 'default' - Block Height: 353626






Transaction Messages - Transaction '8'
--------------------------------------------------------------------------------------------------------
 Participant Id  Message  Public Key                                                          Signature 
========================================================================================================
 0               None     02733d48361600392a8b5ad37d95e7cd71a9efa17edf32bc3f784b662cec1ee838  None 
--------------------------------------------------------------------------------------------------------


Payment Proof - Transaction '8'
None
```

Note that the Sent transaction has been cancelled, the locked outputs are marked for spending again, and the corresponding change output was removed from the wallet. If I were the recipient, my output would have been deleted.

Be sure to use this command with caution. It's generally best to confirm with the other party reasons for not completing the transaction before cancelling. However, if you should make a mistake and cancel a transaction that the other party then completes and posts, don't worry. The wallet will scan the chain for outputs that belong to you and re-create the outputs and transaction in your wallet (with some transaction detail possibly missing).

## repost

If you're the sender of a posted transaction that doesn't confirm on the chain (due to a fork or full transaction pool), you can repost the copy of it that MWC automatically stores in your wallet data whenever a transaction is finalized. This doesn't need to communicate with the recipient again, it just re-posts a transaction created during a previous `send` attempt.  

To do this, look up the transaction id using the `mwc-wallet txs` command, and using the id (say 3 in this example,) enter:

```sh
mwc-wallet repost -i 3
```

This will attempt to repost the transaction to the chain. Note this won't attempt to send if the transaction is already marked as 'confirmed' within the wallet.

You can also use the `repost` command to dump the transaction in a raw json format with the `-m` (duMp) switch, e.g:

```sh
mwc-wallet repost -i 3 -m tx_3.json
```

This will create a file called tx_3.json containing your raw transaction data. Note that this formatting in the file isn't very user-readable.

## address

This command outputs your unique wallet address which can be provided to a sender to request a payment proof. When transacting via methods other than TOR, this will need to be provided to the sender manually.

```sh
mwc-wallet address
Password: 

Address for account - default
-------------------------------------
zw5ws7q4oh3arzskmlkco6ia4awmjr2usv72ax7z3pfmhvklhmavzoid
```

See the section [Requesting a payment proof](#requesting-a-payment-proof) for details on how this address is used.

## receive

Receives a file-based transaction from a sender. See the workflow in the [`send`](#send) command for further detail on how this command is used.

## pay

Pays a file-based invoice transaction received from an initiator. Note that many of the flags and options here are the same as those found in the [`send`](#send) command. See the workflow in the [`invoice`](#invoice) command for further detail on how this command is used..


## finalize

Used to complete a file-, or Slate-based transaction that has already been completed by the transaction recipient. For example:

```sh
mwc-wallet finalize -f "tx_3.tx.resp"
```

This will attempt to finalize the transaction and post it to the chain. If you don't wish the completed transaction to be posted to the chain, specify an output file with the `-d`, `--dest` option:

```sh
mwc-wallet finalize -d "tx_3_finalized.tx" -f "tx_3.tx.resp"
```

This finalized transaction can then be posted to the chain via the [`post`](#post) command.

## post

Posts a finalized transaction saved to file via the [`finalize`](#finalize) command.

```sh
mwc-wallet post -i "tx_3_finalized.tx"
```

## scan

The wallet continually scans the outputs on the chain to help ensure the wallet is in a consistent state. For instance, transactions or outputs that may have been lost via the [`cancel`](#cancel) command will usually be restored automatically. 

It should not usually be necessary to run the `scan` command manually. However, if for some reason the you believe your outputs and transactions are in an inconsistent state, you can initiate a manual `scan` process, which will scan the node's entire output set and attempt to fix/restore missing outputs and transactions:

```sh
mwc-wallet scan
```

If you'd like to limit the scan to a certain number of blocks, you can specify the first block from which to scan via the `-h`, `--start_height` option:

```sh
mwc-wallet scan -h 500000
```

The `scan` command will scan the entire UTXO set from the node, identify which outputs are yours and update your wallet state to be consistent with what's currently in the UTXO set. This command will unlock all outputs, restore any missing outputs, and mark any outputs that have been marked 'Spent' but are still in the UTXO set as 'Unspent' (as can happen during a fork). 

If you would like to also cancel any transaction log entries and delete any unconfirmed outputs, you can specify the `-d`, `--delete-unconfirmed` flag:

```sh
mwc-wallet scan -d
```

In addition to the above repairs, this command will also attempt to cancel any transaction log entries associated with any locked outputs and unlock the outputs. For these reasons, you should be fairly sure that nobody will attempt to post any unconfirmed transactions involving your wallet before using the -d flag, (but even it someone does, it should be possible to re-run this command to fix any resulting issues.

Also note that on initializing a wallet from an existing seed via the [`mwc-wallet init -r`](#init) command, this scan is performed automatically on first run.

## export_proof and verify_proof

**These commands are currently available on the master branch only, and scheduled for release in v3.1.0**

Payment proofs can be exported for validation by other wallets. To export a payment proof for a transaction, a payment proof must have been requested for a transaction, and the transaction must have been completed.

The sender can then export the payment proof by specifying either the transaction ID or transaction log ID of the transaction:

```sh
mwc-wallet export_proof -i 26 proof.txt
```

Another wallet can then verify this proof via the `verify_proof` command. Briefly, this ensures that:
* The kernel for the transaction in the proof is validated and can be found on-chain
* Both the sender and recipient's signatures correctly sign for the amount and the kernel.

Additionally, if the sender or recipient address belongs to the wallet doing the verification, the user will be informed.

```sh
mwc-wallet verify_proof proof.txt
Password: 
Payment proof's signatures are valid.
The proof's recipient address belongs to this wallet.
Command 'verify_proof' completed successfully
```

# Wallet plugins

Other than the default communication methods (http, file), MWC exposes an interface that developers can use to integrate any communication channel (i.e Telegram, Signal, email) for the exchange of slates.

## Keybase

MWC comes bundled with an experimental keybase.io plugin. The keybase client must be installed in the system. Usage is as follows:

Recipient starts a keybase listener.
```sh
mwc-wallet listen -m keybase
```

Sender creates a transaction, sends it to the recipient and awaits for the reply.

```sh
mwc-wallet send <amount> -m keybase -d <recipient>
```

Where recipient is a keybase username. If everything goes well the transaction is finalized and sent to the node for broadcasting.