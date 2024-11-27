
# Wallet API

The [wallet API](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/) uses JSON-RPC requests and is split into two separate blocks of functionality:

* [Owner API V2](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.OwnerRpcV2.html)
  - URL: `localhost:3420/v2/owner`
  - Basic Authentification:
    - Username: `mwcmain`
    - Password: `~/.mwc/main/.owner_api_secret`

* [Owner API V3](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/trait.OwnerRpcV3.html)
  - URL: `localhost:3420/v3/owner`
  - Basic Authentification:
    - Username: `mwcmain`
    - Password: `~/.mwc/main/.owner_api_secret`


* [Foreign API](https://docs.rs/mwc_wallet_api/latest/mwc_wallet_api/struct.Foreign.html)
  - URL: `localhost:3420/v2/foreign`

Basic auth passwords:
Username: `mwcmain`
Password: `.api_secret`.
