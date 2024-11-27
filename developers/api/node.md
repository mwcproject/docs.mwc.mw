
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