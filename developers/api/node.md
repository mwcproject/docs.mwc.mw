
# Node API

The API is used to query a node about various information on the blockchain, networks and peers. By default, the API will listen on `localhost:3413`. The API is started at the same time as the mwc node.
This endpoint requires, by default, [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). The username is `mwcmain`.


## Node API v2

This API version uses JSON-RPC for its requests. It is split up into a foreign API and an owner API. The documentation for these endpoints is automatically generated:

-  [Owner API](https://docs.rs/mwc_api/latest/mwc_api/owner_rpc/trait.OwnerRpc.html)
  - URL: `localhost:3413/v2/owner`
  - Basic Authentification:
    - Username: `mwcmain`
    - Password: `~/.mwc/main/.api_secret`
* [Foreign API](https://docs.rs/mwc_api/latest/mwc_api/foreign_rpc/trait.ForeignRpc.html)
  - URL: `localhost:3413/v2/foreign`
  - Basic Authentification:
    - Username: `mwcmain`
    - Password: `~/.mwc/main/.foreign_api_secret`

Basic auth passwords can be found in `.api_secret`/`.foreign_api_secret` files respectively.