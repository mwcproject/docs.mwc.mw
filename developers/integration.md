# Integration

The integration of the **MWC** into various systems or processes revolves around two core workflows: **Send** and **Receive**. These workflows ensure smooth, privacy-focused, and efficient transactions within the MWC ecosystem.


## Prerequisites

Before you can successfully integrate the MWC (Grin Wallet) workflows, certain prerequisites must be met. These prerequisites ensure that the necessary infrastructure and configurations are in place for seamless transactions.

**Software Requirements**
- **MWC Wallet Installation and setup**
  - Download and install the official MWC (Grin Wallet) from the [official Grin website](https://grin.mw) or the official GitHub repository.
  - Ensure you download the latest stable version for compatibility and security.

- **Grin Node Setup**
  - A Grin node is required to synchronize with the blockchain.
  - The wallet interacts with this node to validate and broadcast transactions.
  - The node must be fully synced before conducting transactions.

## Workflow

Ensure your MWC node is synced and running, and start the mwc-wallet listener in both Owner and Foreign modes to enable transaction handling and internal operations. For detailed instructions, refer to the below documentation:
- Node
- Wallet

::: info 
The MWC Python SDK provides an efficient way to interact with the MWC Wallet API for handling transactions programmatically. It simplifies integration by offering methods for managing the Owner API and Foreign API, such as transaction creation, finalization, and querying wallet balances. The SDK supports features like:

Owner API: Internal wallet operations such as initiating transactions, retrieving balance, and managing keys.
Foreign API: External interactions for receiving and finalizing transactions.
:::

## Sender Workflow

The **Sender Workflow** is responsible for initiating, encoding, and finalizing the transaction.

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
    "token": "ebff5ec5aa1d170558510b48aa278357f5c99f28bda846402ea5025b14e8298a",
    "args": {
      "src_acct_name": null,
      "amount": 500000000,
      "minimum_confirmations": 500,
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
      "fee": "8000000",
      "height": "2621642",
      "id": "09d67b19-6105-4182-901b-cb55f8cdff41",
      "lock_height": "0",
      "network_type": "mainnet",
      "num_participants": 2,
      "participant_data": [
        {
          "id": "0",
          "message": null,
          "message_sig": null,
          "part_sig": null,
          "public_blind_excess": "02ebbdb95cdd8a7040585128df651cce8617fa6c9a585522bf09aa0d18061a1028",
          "public_nonce": "02057bd954e51dbfc5acaf3a0962e653a3312595eb0a811321d159ccc261bbdf9a"
        }
      ],
      "payment_proof": null,
      "ttl_cutoff_height": null,
      "tx": {
        "body": {
          "inputs": [
            {
              "commit": "08453eec87fe3038989739b2615e2ce2c227fea7780dec15322ace5b9281177b0a",
              "features": "Plain"
            }
          ],
          "kernels": [
            {
              "excess": "000000000000000000000000000000000000000000000000000000000000000000",
              "excess_sig": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "features": "Plain",
              "fee": "8000000",
              "lock_height": "0"
            }
          ],
          "outputs": [
            {
              "commit": "09162702cb78cb9e857952a0ccabb0b0c705cda5a1f7f30b8e66efc211056927ef",
              "features": "Plain",
              "proof": "4fa97f7876101111302f1c0d681a180ee0a08a21db85f2ea845bf192563a809a4a384a401b44f7713757b6cfcaa90735a145f6637f4c792310159565ed037aee09675f908a3b1015acdaa8eaf0a596b76b1ca697b57ff91bfa4f3b5bf53f914c540042d2407497958b90f95670471fb2a22e9203ec3f3c80b7ed2d8bdda818cdea999aa8360b1146a8cddad1a3c24a81f7eb21fbc7f2ea307148da0ee51b151027c20739e44e4fc0cdd26c196ddfd96d2eee31ffb032f9ee325d7e5fc94ac8f62d808d44651eaf6d193c51561c3b34dddbd0b166cf3b8caaacf7b06b1fcea76fa3fd3e3bfcc55d74fa9190e5f8fb2af3262751e917651ca001ee90b273794b3d592ac1c9f1e6c5d5723a8f96a55dd5cfc584f5396d6b40aeebdc247c8ad168f8078ecab4d557bc57f006fb9dac5a981805963454ad58d623bbe7766e5f1794600defea588a2f2783d8d086a83c10ec6ecc64ea9da5b7c800c14cf97303c72b692861027881d801a24434f4630963138aa83d0ee2591aec430ba16a54ff2a2299558a16256010a4b411620dc4c9f334a49676c1fc4e21153db5e9a81ba03bb7791644684c6cd0205bdc83221be7986f766ee635b1ee8075dec0dfd4da43469f81358201846c37c3fc326b34a982ffa02b5782a1f6c705c5283e44bbc66f0995249d77ead0e90ae97608491191f47a09e4d670509b615143bfff484b19756f0892d0742354a601eed0325790b2c25f108d1bf554dd07a2f6f98920f1eabad1bf0b3875146b6c581332d50fb483f54e28ce0f934f90ea6f7644e15d32d7453453d7af7ba3255132506b66dc9353c858c154dd901e0ed47bd247543edafe7777f7291117f39371f62bb0d495b6501dea41e046f8dc0b16d95d80c3808ad205c22ded65fb985017484f1006ad359dc37eb97f021cf2f661ca34dcdee9fb354d9abb820991b2"
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
    "token": "ebff5ec5aa1d170558510b48aa278357f5c99f28bda846402ea5025b14e8298a",
    "slate": {
      "amount": "500000000",
      "coin_type": "mwc",
      "compact_slate": true,
      "fee": "8000000",
      "height": "2621642",
      "id": "09d67b19-6105-4182-901b-cb55f8cdff41",
      "lock_height": "0",
      "network_type": "mainnet",
      "num_participants": 2,
      "participant_data": [
        {
          "id": "0",
          "message": null,
          "message_sig": null,
          "part_sig": null,
          "public_blind_excess": "02ebbdb95cdd8a7040585128df651cce8617fa6c9a585522bf09aa0d18061a1028",
          "public_nonce": "02057bd954e51dbfc5acaf3a0962e653a3312595eb0a811321d159ccc261bbdf9a"
        }
      ],
      "payment_proof": null,
      "ttl_cutoff_height": null,
      "tx": {
        "body": {
          "inputs": [
            {
              "commit": "08453eec87fe3038989739b2615e2ce2c227fea7780dec15322ace5b9281177b0a",
              "features": "Plain"
            }
          ],
          "kernels": [
            {
              "excess": "000000000000000000000000000000000000000000000000000000000000000000",
              "excess_sig": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "features": "Plain",
              "fee": "8000000",
              "lock_height": "0"
            }
          ],
          "outputs": [
            {
              "commit": "09162702cb78cb9e857952a0ccabb0b0c705cda5a1f7f30b8e66efc211056927ef",
              "features": "Plain",
              "proof": "4fa97f7876101111302f1c0d681a180ee0a08a21db85f2ea845bf192563a809a4a384a401b44f7713757b6cfcaa90735a145f6637f4c792310159565ed037aee09675f908a3b1015acdaa8eaf0a596b76b1ca697b57ff91bfa4f3b5bf53f914c540042d2407497958b90f95670471fb2a22e9203ec3f3c80b7ed2d8bdda818cdea999aa8360b1146a8cddad1a3c24a81f7eb21fbc7f2ea307148da0ee51b151027c20739e44e4fc0cdd26c196ddfd96d2eee31ffb032f9ee325d7e5fc94ac8f62d808d44651eaf6d193c51561c3b34dddbd0b166cf3b8caaacf7b06b1fcea76fa3fd3e3bfcc55d74fa9190e5f8fb2af3262751e917651ca001ee90b273794b3d592ac1c9f1e6c5d5723a8f96a55dd5cfc584f5396d6b40aeebdc247c8ad168f8078ecab4d557bc57f006fb9dac5a981805963454ad58d623bbe7766e5f1794600defea588a2f2783d8d086a83c10ec6ecc64ea9da5b7c800c14cf97303c72b692861027881d801a24434f4630963138aa83d0ee2591aec430ba16a54ff2a2299558a16256010a4b411620dc4c9f334a49676c1fc4e21153db5e9a81ba03bb7791644684c6cd0205bdc83221be7986f766ee635b1ee8075dec0dfd4da43469f81358201846c37c3fc326b34a982ffa02b5782a1f6c705c5283e44bbc66f0995249d77ead0e90ae97608491191f47a09e4d670509b615143bfff484b19756f0892d0742354a601eed0325790b2c25f108d1bf554dd07a2f6f98920f1eabad1bf0b3875146b6c581332d50fb483f54e28ce0f934f90ea6f7644e15d32d7453453d7af7ba3255132506b66dc9353c858c154dd901e0ed47bd247543edafe7777f7291117f39371f62bb0d495b6501dea41e046f8dc0b16d95d80c3808ad205c22ded65fb985017484f1006ad359dc37eb97f021cf2f661ca34dcdee9fb354d9abb820991b2"
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

::: details Ok response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": "BEGINSLATE_BIN. 8kBm8dTRtrskDCU TRruCj5bDo56r2p o9Ux7QHP3Jk7zYz ijPWx8nxhLHzNEY oce1HTx2aCozuTM jKU9NtS82yq4Nrv qxR8YL2tJ9sxjoh deDHf4S2Rzi9bXo i9gNY4z1LAwpjHi HV. ENDSLATE_BIN."
  }
}
```
:::   


#### tx_lock_outputs

The sender ensures the outputs for the transaction are locked using [tx_lock_outputs](https://docs.rs/mwc_wallet_api/5.3.4/mwc_wallet_api/trait.OwnerRpcV3.html#tymethod.encode_slatepack_message).

`encode_slatepacktx_lock_outputs_message` <Badge type="info" text="POST" />

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
    "token": "ebff5ec5aa1d170558510b48aa278357f5c99f28bda846402ea5025b14e8298a",
    "slate": "BEGINSLATE_BIN. 8kBm8dTRtrskDCU TRruCj5bDo56r2p o9Ux7QHP3Jk7zYz ijPWx8nxhLHzNEY oce1HTx2aCozuTM jKU9NtS82yq4Nrv qxR8YL2tJ9sxjoh deDHf4S2Rzi9bXo i9gNY4z1LAwpjHi HV. ENDSLATE_BIN.",
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

we'll then return to user this text
```
BEGINSLATE_BIN. 9ahjQefP9gsCcVt 25Po4VP34y95yxE wMmTzzckUkh1tu3 y7WwT5j1ZTL7UyC 4byFhRQM4BmhM92 Y1ukWPJ8BVdpEGU MAJUrU2YbXFLAYT tdqamYotCv4Co3z keD8RdPpX4b. ENDSLATE_BIN.
```


The user on his side need to make his response. 
Once he made his response slate
he should give you a slate like this 

such as this one 
```json
BEGINSLATEPACK. BMPbuLeVjyFSo36 NvoGhFVYSFxK58D 7ENH2twNyFzuukP mHsGxDrNnBRg5Vd fbKWgneT6YxtUR2 nSmKgFrokk1NEYY qA5cHKVdKaRaKCA J9oX86S4ToB2GEC yHKuKQRe8mwgxn3 PnjdLhtxvuLvXaD 5G8FAqEdWF2RNy1 jAH2xaUsus2onwt 1QM8oENbqUXSSP1 rxo54eupY5ECeiP RW9NY4tM1M6DEf1 BDRhK13rkJRyBzV o2fyjddd4HftuFe d3eHyC1ZEhSxitC 3mi5CmPYzV1JmMp bjwDKGH3jonnxfr 7Ah3ysctRymaXUM 4dH1Ln6UVvD5umC nyam9s4XusiCAky x7VaZGR36MmLzyw eMHSNXBYi12hmq3 D4iouD74YEcPSKD 2JoV5YqZGueBRH4 p8c47hboNujhko2 SPqzY2LiecEfkSK CojyRCQH1C5TE2K QbqNVMniZQQjmN4 TxZNr2kx1D7GFGH CriBfZDoDyDHtYk S4bE6TqA8WGE7oA 9AM2XMoCsZpVyS9 TYTM6wAwXAPhMZU ELo5bZBpMC5GnwN 3LDyFAxuPjxj2Bw eVQNKhLNtUpcstW x1gkYDTNtQTaXyD n8s9oTE7cuJZ5YK 1oooXzP9T31Mmzf kahNCcmtEZipQVb 8e1ba7ormFGegug RS7TTutor3EfxDC yCBRZBuwxFf3Uxq B55wb7yZN53fAMm Zn8SBTxNBzuZiX8 16GyVZx9xbrcB64 krz7XigXGf7hWFd wmuvYqzj7yqson1 hrNftRpEhJbvk3h QFJd7AcxwHwJH2L GdT2xe3DAqBtW4e zgSkQjNnoPhPhii JXBZay4z4eaKBie 1J9KFb6YcXHtcsH dffsHHgXs6GQRZG 71od7BKQVzTWuwv r95CZp6kSpYMqfd G5MfFpjBcD9v9bq WvkoYPuWN6Jf7dA Sou wi2fXznZReqLmZzt TGtcahQF5iPLmTr MoE15UceR5bNMBY MAN3AzctE3Vr2fa BDmaMrpHvRCb7pw Y2QUv2R6ZoztGtW Tssap8D7KJtp3g9 fg7kByVQSceSvQE opCAtY7VACJdyag 9D2jmuXZLCawnLM cH3E7MuLqNADMcj PebyUeKE93ttcmW JYGifAGr6cS7WYC Ujwrzg9EhhfjVSd KpArBHx1wvXUzdP kZojuqo2cr7DVqD zQGfUDWGXMbHYbX UJuLtbwFnkQt7Cg rjnn4kj4HZfx7fj uLeS3VaBtMyxLGF 5yECTWgQ2HcGnSK iRDMM9dqncWR6rc 1nXYww6LfUzZxj7 WB1ioS9kAD3XZXw SQX8VZ54tvPbBJ3 pGz3q9RxdvbhcS2 cgxj8K4qCMjJfoM AxDNdcpD2gXuy79 whZfDJ4H6gYvTsp uUfQazqTD46yudj UhXn5X1tZgcExVx FwDUVMTHUTmqmjT 9iJ4Xox2K9HDytN XuJoEk7nH2DCQyi NgPGg4FTibENxZv DB22bb2FQR7W8mu 2hjsx8CWnqWJ56u oyYCXkqynhcKLtb G18knjmUYx3xjyN BVe1u5XHw8HJak5 C9goSRBv29hbf6z Mm4hH7waqL5kAVC vo3vwBrVPeA8K8X QE2JoJ8vuVCFXbM GWJRLnAiYTcUxtq i5aNtAgViPt6GRA 7K5rYdxRAeTc6Ym NZDeoGHoPKrLHwF D5cb8YB7JkmEtnR puX22WD1pagcRph uZJ8xw2gt6RQFQN ypXgHrDFv6W8HNX jNRDvFHpbrmceRR DTBPeWwdpYoTogg E7gnQE1U1ULRi3R XLJJLY5fAVKesTN HyutbMxBvJ3DUz3 CfWDXrRZgG6vQDM 8CboKtLz7dAs5Ui GTLbS5ZYXxpKQbY TXmfDW4wVNXS5G2 NA8gokJPRZ9phXt tYhDG3E9pfVK4mK 8Gmf9Mt6iPRxzvf aQkwRY81peGzJSz ZpPVXAhNFXjnENN MTW8pvTVfYH4Dxt Sabo3XdiBusHygj A8PbFAon6fCAySo jworMXbsSKrrFyA eM7whDYiZJVYFwR SJnqGPTnMtJy9pZ JzsUoTLJFUegFXr YVeHFDTcBJ3qniU Kbc9RsmRrTv512C HajdTQmdrVDR9c7 wC4wcRm7rmXTqny xMYLL6v62RhWcPz C315C3PZtXyxzke WhsCxvctHcS4Wd7 sVLRNvFsxfbN7be FkAjdTLP7oo2Aq9 6bn3GWTypxAdQyZ kWDxEaq8jcBDgR1 EpSLVeJJ7Vd4CrN PxMNvhhTdJs5nUp WzuZNfRNZhajTNZ FLgjbUTUnyk3u92 9PLbPmhSLvVZZHU Yw5PPiaKWWgx1AZ EpY2TxjvgMFRXJy CTFHhms1FAjDE7Q LNizD7TPNyCSbM2 Ha3RZHxPHt8gqSJ ZVbVpFdPJcWWNrQ ms9hr66LU144dgo KLKJedbLSg1sLMo vW8GA5e8hyCMQZG 3JqJKCXnfh7dyjP 5zNRzKYd9FdiR71 gSQBgVEVRavCpJV aXKco2M8kNWdPtw ZNgX. ENDSLATEPACK.
```


you will need to call decode_slatepack_message

```json
{
	"jsonrpc": "2.0",
	"method": "decode_slatepack_message",
	"params": {
		"token": "d202964900000000d302964900000000d402964900000000d502964900000000",
		"address_index": null,
		"message": "BEGINSLATEPACK. BMPbuLeVjyFSo36 NvoGhFVYSFxK58D 7ENH2twNyFzuukP mHsGxDrNnBRg5Vd fbKWgneT6YxtUR2 nSmKgFrokk1NEYY qA5cHKVdKaRaKCA J9oX86S4ToB2GEC yHKuKQRe8mwgxn3 PnjdLhtxvuLvXaD 5G8FAqEdWF2RNy1 jAH2xaUsus2onwt 1QM8oENbqUXSSP1 rxo54eupY5ECeiP RW9NY4tM1M6DEf1 BDRhK13rkJRyBzV o2fyjddd4HftuFe d3eHyC1ZEhSxitC 3mi5CmPYzV1JmMp bjwDKGH3jonnxfr 7Ah3ysctRymaXUM 4dH1Ln6UVvD5umC nyam9s4XusiCAky x7VaZGR36MmLzyw eMHSNXBYi12hmq3 D4iouD74YEcPSKD 2JoV5YqZGueBRH4 p8c47hboNujhko2 SPqzY2LiecEfkSK CojyRCQH1C5TE2K QbqNVMniZQQjmN4 TxZNr2kx1D7GFGH CriBfZDoDyDHtYk S4bE6TqA8WGE7oA 9AM2XMoCsZpVyS9 TYTM6wAwXAPhMZU ELo5bZBpMC5GnwN 3LDyFAxuPjxj2Bw eVQNKhLNtUpcstW x1gkYDTNtQTaXyD n8s9oTE7cuJZ5YK 1oooXzP9T31Mmzf kahNCcmtEZipQVb 8e1ba7ormFGegug RS7TTutor3EfxDC yCBRZBuwxFf3Uxq B55wb7yZN53fAMm Zn8SBTxNBzuZiX8 16GyVZx9xbrcB64 krz7XigXGf7hWFd wmuvYqzj7yqson1 hrNftRpEhJbvk3h QFJd7AcxwHwJH2L GdT2xe3DAqBtW4e zgSkQjNnoPhPhii JXBZay4z4eaKBie 1J9KFb6YcXHtcsH dffsHHgXs6GQRZG 71od7BKQVzTWuwv r95CZp6kSpYMqfd G5MfFpjBcD9v9bq WvkoYPuWN6Jf7dA S2fXznZReqLmZzt TGtcahQF5iPLmTr MoE15UceR5bNMBY MAN3AzctE3Vr2fa BDmaMrpHvRCb7pw Y2QUv2R6ZoztGtW Tssap8D7KJtp3g9 fg7kByVQSceSvQE opCAtY7VACJdyag 9D2jmuXZLCawnLM cH3E7MuLqNADMcj PebyUeKE93ttcmW JYGifAGr6cS7WYC Ujwrzg9EhhfjVSd KpArBHx1wvXUzdP kZojuqo2cr7DVqD zQGfUDWGXMbHYbX UJuLtbwFnkQt7Cg rjnn4kj4HZfx7fj uLeS3VaBtMyxLGF 5yECTWgQ2HcGnSK iRDMM9dqncWR6rc 1nXYww6LfUzZxj7 WB1ioS9kAD3XZXw SQX8VZ54tvPbBJ3 pGz3q9RxdvbhcS2 cgxj8K4qCMjJfoM AxDNdcpD2gXuy79 whZfDJ4H6gYvTsp uUfQazqTD46yudj UhXn5X1tZgcExVx FwDUVMTHUTmqmjT 9iJ4Xox2K9HDytN XuJoEk7nH2DCQyi NgPGg4FTibENxZv DB22bb2FQR7W8mu 2hjsx8CWnqWJ56u oyYCXkqynhcKLtb G18knjmUYx3xjyN BVe1u5XHw8HJak5 C9goSRBv29hbf6z Mm4hH7waqL5kAVC vo3vwBrVPeA8K8X QE2JoJ8vuVCFXbM GWJRLnAiYTcUxtq i5aNtAgViPt6GRA 7K5rYdxRAeTc6Ym NZDeoGHoPKrLHwF D5cb8YB7JkmEtnR puX22WD1pagcRph uZJ8xw2gt6RQFQN ypXgHrDFv6W8HNX jNRDvFHpbrmceRR DTBPeWwdpYoTogg E7gnQE1U1ULRi3R XLJJLY5fAVKesTN HyutbMxBvJ3DUz3 CfWDXrRZgG6vQDM 8CboKtLz7dAs5Ui GTLbS5ZYXxpKQbY TXmfDW4wVNXS5G2 NA8gokJPRZ9phXt tYhDG3E9pfVK4mK 8Gmf9Mt6iPRxzvf aQkwRY81peGzJSz ZpPVXAhNFXjnENN MTW8pvTVfYH4Dxt Sabo3XdiBusHygj A8PbFAon6fCAySo jworMXbsSKrrFyA eM7whDYiZJVYFwR SJnqGPTnMtJy9pZ JzsUoTLJFUegFXr YVeHFDTcBJ3qniU Kbc9RsmRrTv512C HajdTQmdrVDR9c7 wC4wcRm7rmXTqny xMYLL6v62RhWcPz C315C3PZtXyxzke WhsCxvctHcS4Wd7 sVLRNvFsxfbN7be FkAjdTLP7oo2Aq9 6bn3GWTypxAdQyZ kWDxEaq8jcBDgR1 EpSLVeJJ7Vd4CrN PxMNvhhTdJs5nUp WzuZNfRNZhajTNZ FLgjbUTUnyk3u92 9PLbPmhSLvVZZHU Yw5PPiaKWWgx1AZ EpY2TxjvgMFRXJy CTFHhms1FAjDE7Q LNizD7TPNyCSbM2 Ha3RZHxPHt8gqSJ ZVbVpFdPJcWWNrQ ms9hr66LU144dgo KLKJedbLSg1sLMo vW8GA5e8hyCMQZG 3JqJKCXnfh7dyjP 5zNRzKYd9FdiR71 gSQBgVEVRavCpJV aXKco2M8kNWdPtw ZNgX. ENDSLATEPACK."
	},
	"id": 1
}
```

::: details Ok Response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
	"Ok": {
	  "content": "SendResponse",
	  "recipient": {
		"public_key": "fffqrotuelaodwjblwmifg36xjedjw4azbwvfexmxmmzsb6xvzbkhuqd",
		"domain": "",
		"port": null
	  },
	  "sender": {
		"public_key": "7rky2tvk763cq5kvhyxv7zkjxfytmao3qttqvoc6fsiawo4kzgii7bqd",
		"domain": "",
		"port": null
	  },
	  "slate": {
		"amount": "0",
		"coin_type": "mwc",
		"compact_slate": true,
		"fee": "0",
		"height": "5",
		"id": "0436430c-2b02-624c-2032-570501212b00",
		"lock_height": "0",
		"network_type": "automatedtests",
		"num_participants": 2,
		"participant_data": [
		  {
			"id": "1",
			"message": null,
			"message_sig": null,
			"part_sig": "8f07ddd5e9f5179cff19486034181ed76505baaad53e5d994064127b56c5841bb9128fbee3070329b28c635090138e2b78fe1fbb840117b2f65777508179be0a",
			"public_blind_excess": "02e3c128e436510500616fef3f9a22b15ca015f407c8c5cf96c9059163c873828f",
			"public_nonce": "031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f"
		  }
		],
		"payment_proof": null,
		"ttl_cutoff_height": null,
		"tx": {
		  "body": {
			"inputs": [],
			"kernels": [
			  {
				"excess": "08e3c128e436510500616fef3f9a22b15ca015f407c8c5cf96c9059163c873828f",
				"excess_sig": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
				"features": "Plain",
				"fee": "0",
				"lock_height": "0"
			  }
			],
			"outputs": [
			  {
				"commit": "082967b3fe580cd110355010ef45450314fb067720db01b0e6873bb083d76708c9",
				"features": "Plain",
				"proof": "828bb24121aa0332c872062a42a8333c3ef81f8ae37d24053d953217368b3cada90410a50509a0b9fcbb5aded41397fc00ca1ff5acdac20d48afb0a3281d21e7026d32fdc6c5157461a35f98a809ffa09187c1e170ea24652ad213b7e4c9878654ac3dd9a8915eaf742db53182fcb42d2d341fbdfe8bd31bd001f4ff2c1ca9f9b1531da29137214f211edb7a5eb8f494cb8945f8527dd25bf7e698515043db4249540720008a708db5342230d05b069c094688ccb7c07d4a4a2293ea76cf999c555dc0ddc757891c360db1901bbb4dc20cae997f875f8de482d8160e05d60f9b0135e0fc313d8f953db78f1ea252449dd81cfa22dd895512ed39d566f0924542b543d25fc9fc7a819d228f3b0ee5e381f088f54893e86437dafc49dd923b3e6dff956ca843f951910379531fac9bb5fd01a182dd32a4c597f92da3c01af37cb9b0ec984500884438e74e54d7e76fa1ae7241d5050b13376310b24761634a6f6eb7cf000082f50ed7c1899d7918023d4f877586f964932a7af72e7a4984ddecfdd1921a2e1b80b00d6bd2e64a3f4cb6915a27a8d17a69d163cf45220a13fcddd15dc2bb91ae4f1b6a67224ab3b23e8d7d785df178ec78a84cf42cea086426f563822c8a4271a0b89bb21f84b643dbf1de21b6395039d673a376492767199fa36ccd9a13628ce61695424091acc16059450d59bc59fa7879e7306f5727217211b0264a6a560f886d520e41406ef45b1668805b88d246c5b2ca5a1762042c85be34fcd420ac3843f32236d079b4bd57d6b8d8013d9d18f8efb55e8e443cd9e1af9b144e7a56c8c6be0138af3b4a6c99bee9109bed2bce2e5145e736b125a2ec19aaf3fff713f6897fdd4158ce2ab04706b062ca2847bf70259c0fc4b0d390dc7fdaf0362047f775a912bd22da9d40f04d9790bcd5ece4b36b74c6c340b48c2926b916e8a9"
			  },
			  {
				"commit": "096e1669267c22ecb38c466d73b8578261d8e91c14dd66702dd5bf34f4232e10db",
				"features": "Plain",
				"proof": "7d567b0895a1103d19446929da8b98f2086819507ddce4b9dbb5ce6327107744e74aba59ef1834937da1b86eb7c1c1b0bc11d1c5d5ec79d25bc1e52aed1656f60d46f6878ba5ca8639efdbb9203e378e91171c11527c4a34713f06dc22f58ca4a08e68d83ff897e61cfc145fe376fa428b55e25cf20d15f10b9054778229798b30fb4e45d817a5053b682dcf591481a3c8174cfbba81e31aa525d5b884ca7a016713178f26c0fe8ae1f88b5382f8e70c4d91fb3828c0f307d828aa028281d3551525e68d20827ab0e6785c6b5747e895dcd38429b44e62b7f6c1c921d87ae954a9dd6e967ac52e6cd13a1d4bb2f1434da25a0723ef9c869cc573019577552dd0e0f808f8cc57723b041320025f6433779fe907998a4ec7606bf884b2199253b502065bed8e0625c2df858d6508c1aa44deddc68d06d00d81e97720e23e15a3464ed4733fc547e9fb772e563a1dbcd27ac55e40f674f9006e7dd4465444f3eb7527cb01905dee69a51cf2fc1810c861dd0834e7649d594c3e1740d85343a6b63c8a9e0a0f63059031899b38dfd9a192034d54029bd35e683ccab46282519b26cae20d398b754357abe1cf0370890f2897b5d8ada4fb3da777a8f8f1daa4197a380e6734504117dd2a92ea1917f174c44c59e0b50c6b7a5f9eb14e6d96cb6b3e5dbcb3d0eaf0e4aac1b6616d674bb708b7559e37de608e8a828bee7f25f627e2f06d9a87e8d651ade39e1e65db7204b94abc0b7ca6fdd75aadeeac6a876b6297e38039734ebdfa9a555152b4293cb00e423a66d64f827afa4748dd6fdc1dc33332bffb820dacbf5a6d347042db985bbd9cf476dceb45d6978035ba03d25612243fc164c0a902017ce7ffd632d041fa3c56554739e78c6d725ecbfdaa0739d3649239fb53294b7a46ee6ed403bf3815f6c78f06a8ca4e3c9b066234f7574fb6ea8f17d199"
			  }
			]
		  },
		  "offset": "97e0fccd0b805d10065a4f8ca46aa6cc73f0962e829c7f13836e2c8371da6293"
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
you can optionali decode the slapack 
you will need to call finalize_tx

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "decode_slatepack_message",
  "params": {
    "token": "9ad802ba3f3288d434b28bce9102aff35e953c4239cfd76c64ad2ac23202c0cf",
    "message": "BEGINSLATE_BIN. usqHiSmrwTbxJD1 BKq9tdQUBJCLmRF unXjpYfGsr1hDhH XQSGvUyUKrGPttp dfMqT2LyGtDiSbJ LBaLwqyamCRQ6ga 4SyMzhP1D4CuTpr PjXwfvXqzZiEB4R LAKt3pe9WSPcBSK MuF6Dw9Y4mDJpka zkZ8uDRM4sUzhk8 SDk3ZY5FeeEoPG8 ug7miFxCZKCfMn7 8G2hf7KLobevDeX yQHV5Jja7vRH9kx sQ6PsUN2518EJm2 kc8wtAoHyP6KQTg znNkxvdJ6aXzvEU 5BL9UqS7x2d3U1B aunvhgyEVfE3LXk 7BMp8yPrzF3BBHX KJWLsftycvZwcvM eDZMREoZzMGQWNV PE37U3tEaFbHTWM hy5nNefS4TCoKCk b8WXrZUsRnHw4eX e26LQ94RQoTbXh9 9veAK2ECuU9ttre aK7VNEKmzE9hUea YcFdzXFkSGVcxJL J58T9vdBBUkK9PQ ncoN4aMhiwHwSfr MbJfyUQCLWwjFGY V8qiiVwMLApauyW 35fHztkvtoswH3z cZTJTn1aeYCvBt8 x3mqeMGtw6sFP7u YPEkbQx4ZbNHVaw 3AYsmFLKUS6D2rV EcCaUi3c4wjGopq yjfMh8Sw1irbxDh z55XmSSD1iqu7BV XqGRpjbdEe3ks8E TCW3GpkoDBA96Hm EDvT5d1FEFDefJU eZReffaiKAj54HA MmibCcS8ZPAfLa5 4dJkDqH9Xmquqeb Ut1gRt1HjLJ78mT GLDyMEiBWGw2RVj JNJZNxXy5PZcrfr x5D3U65hobmk7ZT 6VDKzyPNYHwhiug q9QkcmKVTYwUoDT LhhXJCvw3oyNmVP GvWThjWpebSxjsv 6LobgE59ap2NTPx eHHsfhU9fSXZMpn J389tVGkPJtotdQ DHw8rqi8JS6MX6m pdo2tFr2MdKvs5f Zq4oyFBuojGrz3S 5UZgDjK1NLUuDrG ZQJpBwYGSqFza4m 559DieAWLe38khU FmM6uqh8i2ZyEHG qNBok3kCa7JHYpt 4iA93S33PXH5CS7 VowPonFVgpAofK5 oYzopFRdmJU2DUa b1VW3ANdCtNZKpb re2W2rwoDbLP34G QiddN7u1jXWuJj9 HBREYcvGzdxk4EB FfLoMG2tWERLrct 77tnwWZhcaanXTK RDibv4S9Hs912b8 HbV5XtB8d1WJhyS w2N9L9zPzoJnHN7 LQzq7KrFiwitGaK HMURznkkrWQrHuN xbAMAoZsH1rwmwo SCsSRsw6uxHzcnL ZdADUmYCVHpMUkU HThZhVwW2xaAWBY y6MpaJoEXv15JCx swhhXNGkmm5ZRf9 L3kgVcGpjDS69kN QMCpFdswUHcj5Xu 3cKkRuV6DZ7jMLn u6kLGhxh9ECGSzt As. ENDSLATE_BIN.",
    "address_index": null
  }
}
```


::: details Ok Response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
	"Ok": {
	  "amount": "2000000000",
	  "coin_type": "mwc",
	  "compact_slate": true,
	  "fee": "7000000",
	  "height": "5",
	  "id": "0436430c-2b02-624c-2032-570501212b01",
	  "lock_height": "0",
	  "network_type": "automatedtests",
	  "num_participants": 2,
	  "participant_data": [
		{
		  "id": "0",
		  "message": null,
		  "message_sig": null,
		  "part_sig": "8f07ddd5e9f5179cff19486034181ed76505baaad53e5d994064127b56c5841be4f05245454b9681075ed2f92baefea88971d1b8192abdc79d08683e9ef18c98",
		  "public_blind_excess": "02e89cce4499ac1e9bb498dab9e3fab93cc40cd3d26c04a0292e00f4bf272499ec",
		  "public_nonce": "031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f"
		},
		{
		  "id": "1",
		  "message": null,
		  "message_sig": null,
		  "part_sig": "8f07ddd5e9f5179cff19486034181ed76505baaad53e5d994064127b56c5841bb9128fbee3070329b28c635090138e2b78fe1fbb840117b2f65777508179be0a",
		  "public_blind_excess": "02e3c128e436510500616fef3f9a22b15ca015f407c8c5cf96c9059163c873828f",
		  "public_nonce": "031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f"
		}
	  ],
	  "payment_proof": null,
	  "ttl_cutoff_height": null,
	  "tx": {
		"body": {
		  "inputs": [
			{
			  "commit": "098778ce2243fa34e5876c8cb7f6dbbbd6a5649c1561973a807a6811941c12363c",
			  "features": "Coinbase"
			},
			{
			  "commit": "0910c1752100733bae49e877286835aab76d5856ef8139b6c6e3f51798aa461b03",
			  "features": "Coinbase"
			}
		  ],
		  "kernels": [
			{
			  "excess": "09eac5f5872fa5e08e0c29fd900f1b8f77ff3ad1d0d1c46aeb202cbf92363fe0af",
			  "excess_sig": "66074d25a751c4743342c90ad8ead9454daa00d9b9aed29bca321036d16c4b4d9d03e203295399aab9ea354abcc18cd40170f1739e2bd4799460df8e1f6b4ba3",
			  "features": "Plain",
			  "fee": "7000000",
			  "lock_height": "0"
			}
		  ],
		  "outputs": [
			{
			  "commit": "082967b3fe580cd110355010ef45450314fb067720db01b0e6873bb083d76708c9",
			  "features": "Plain",
			  "proof": "828bb24121aa0332c872062a42a8333c3ef81f8ae37d24053d953217368b3cada90410a50509a0b9fcbb5aded41397fc00ca1ff5acdac20d48afb0a3281d21e7026d32fdc6c5157461a35f98a809ffa09187c1e170ea24652ad213b7e4c9878654ac3dd9a8915eaf742db53182fcb42d2d341fbdfe8bd31bd001f4ff2c1ca9f9b1531da29137214f211edb7a5eb8f494cb8945f8527dd25bf7e698515043db4249540720008a708db5342230d05b069c094688ccb7c07d4a4a2293ea76cf999c555dc0ddc757891c360db1901bbb4dc20cae997f875f8de482d8160e05d60f9b0135e0fc313d8f953db78f1ea252449dd81cfa22dd895512ed39d566f0924542b543d25fc9fc7a819d228f3b0ee5e381f088f54893e86437dafc49dd923b3e6dff956ca843f951910379531fac9bb5fd01a182dd32a4c597f92da3c01af37cb9b0ec984500884438e74e54d7e76fa1ae7241d5050b13376310b24761634a6f6eb7cf000082f50ed7c1899d7918023d4f877586f964932a7af72e7a4984ddecfdd1921a2e1b80b00d6bd2e64a3f4cb6915a27a8d17a69d163cf45220a13fcddd15dc2bb91ae4f1b6a67224ab3b23e8d7d785df178ec78a84cf42cea086426f563822c8a4271a0b89bb21f84b643dbf1de21b6395039d673a376492767199fa36ccd9a13628ce61695424091acc16059450d59bc59fa7879e7306f5727217211b0264a6a560f886d520e41406ef45b1668805b88d246c5b2ca5a1762042c85be34fcd420ac3843f32236d079b4bd57d6b8d8013d9d18f8efb55e8e443cd9e1af9b144e7a56c8c6be0138af3b4a6c99bee9109bed2bce2e5145e736b125a2ec19aaf3fff713f6897fdd4158ce2ab04706b062ca2847bf70259c0fc4b0d390dc7fdaf0362047f775a912bd22da9d40f04d9790bcd5ece4b36b74c6c340b48c2926b916e8a9"
			},
			{
			  "commit": "096e1669267c22ecb38c466d73b8578261d8e91c14dd66702dd5bf34f4232e10db",
			  "features": "Plain",
			  "proof": "7d567b0895a1103d19446929da8b98f2086819507ddce4b9dbb5ce6327107744e74aba59ef1834937da1b86eb7c1c1b0bc11d1c5d5ec79d25bc1e52aed1656f60d46f6878ba5ca8639efdbb9203e378e91171c11527c4a34713f06dc22f58ca4a08e68d83ff897e61cfc145fe376fa428b55e25cf20d15f10b9054778229798b30fb4e45d817a5053b682dcf591481a3c8174cfbba81e31aa525d5b884ca7a016713178f26c0fe8ae1f88b5382f8e70c4d91fb3828c0f307d828aa028281d3551525e68d20827ab0e6785c6b5747e895dcd38429b44e62b7f6c1c921d87ae954a9dd6e967ac52e6cd13a1d4bb2f1434da25a0723ef9c869cc573019577552dd0e0f808f8cc57723b041320025f6433779fe907998a4ec7606bf884b2199253b502065bed8e0625c2df858d6508c1aa44deddc68d06d00d81e97720e23e15a3464ed4733fc547e9fb772e563a1dbcd27ac55e40f674f9006e7dd4465444f3eb7527cb01905dee69a51cf2fc1810c861dd0834e7649d594c3e1740d85343a6b63c8a9e0a0f63059031899b38dfd9a192034d54029bd35e683ccab46282519b26cae20d398b754357abe1cf0370890f2897b5d8ada4fb3da777a8f8f1daa4197a380e6734504117dd2a92ea1917f174c44c59e0b50c6b7a5f9eb14e6d96cb6b3e5dbcb3d0eaf0e4aac1b6616d674bb708b7559e37de608e8a828bee7f25f627e2f06d9a87e8d651ade39e1e65db7204b94abc0b7ca6fdd75aadeeac6a876b6297e38039734ebdfa9a555152b4293cb00e423a66d64f827afa4748dd6fdc1dc33332bffb820dacbf5a6d347042db985bbd9cf476dceb45d6978035ba03d25612243fc164c0a902017ce7ffd632d041fa3c56554739e78c6d725ecbfdaa0739d3649239fb53294b7a46ee6ed403bf3815f6c78f06a8ca4e3c9b066234f7574fb6ea8f17d199"
			}
		  ]
		},
		"offset": "e88c17b8cdcb6606c3d263a8fb4be8fd6bd9d435852c6ff78602385bb31a8849"
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

you will need to call finalize_tx

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "finalize_tx",
  "params": {
    "token": "9ad802ba3f3288d434b28bce9102aff35e953c4239cfd76c64ad2ac23202c0cf",
    "slate": "BEGINSLATE_BIN. usqHiSmrwTbxJD1 BKq9tdQUBJCLmRF unXjpYfGsr1hDhH XQSGvUyUKrGPttp dfMqT2LyGtDiSbJ LBaLwqyamCRQ6ga 4SyMzhP1D4CuTpr PjXwfvXqzZiEB4R LAKt3pe9WSPcBSK MuF6Dw9Y4mDJpka zkZ8uDRM4sUzhk8 SDk3ZY5FeeEoPG8 ug7miFxCZKCfMn7 8G2hf7KLobevDeX yQHV5Jja7vRH9kx sQ6PsUN2518EJm2 kc8wtAoHyP6KQTg znNkxvdJ6aXzvEU 5BL9UqS7x2d3U1B aunvhgyEVfE3LXk 7BMp8yPrzF3BBHX KJWLsftycvZwcvM eDZMREoZzMGQWNV PE37U3tEaFbHTWM hy5nNefS4TCoKCk b8WXrZUsRnHw4eX e26LQ94RQoTbXh9 9veAK2ECuU9ttre aK7VNEKmzE9hUea YcFdzXFkSGVcxJL J58T9vdBBUkK9PQ ncoN4aMhiwHwSfr MbJfyUQCLWwjFGY V8qiiVwMLApauyW 35fHztkvtoswH3z cZTJTn1aeYCvBt8 x3mqeMGtw6sFP7u YPEkbQx4ZbNHVaw 3AYsmFLKUS6D2rV EcCaUi3c4wjGopq yjfMh8Sw1irbxDh z55XmSSD1iqu7BV XqGRpjbdEe3ks8E TCW3GpkoDBA96Hm EDvT5d1FEFDefJU eZReffaiKAj54HA MmibCcS8ZPAfLa5 4dJkDqH9Xmquqeb Ut1gRt1HjLJ78mT GLDyMEiBWGw2RVj JNJZNxXy5PZcrfr x5D3U65hobmk7ZT 6VDKzyPNYHwhiug q9QkcmKVTYwUoDT LhhXJCvw3oyNmVP GvWThjWpebSxjsv 6LobgE59ap2NTPx eHHsfhU9fSXZMpn J389tVGkPJtotdQ DHw8rqi8JS6MX6m pdo2tFr2MdKvs5f Zq4oyFBuojGrz3S 5UZgDjK1NLUuDrG ZQJpBwYGSqFza4m 559DieAWLe38khU FmM6uqh8i2ZyEHG qNBok3kCa7JHYpt 4iA93S33PXH5CS7 VowPonFVgpAofK5 oYzopFRdmJU2DUa b1VW3ANdCtNZKpb re2W2rwoDbLP34G QiddN7u1jXWuJj9 HBREYcvGzdxk4EB FfLoMG2tWERLrct 77tnwWZhcaanXTK RDibv4S9Hs912b8 HbV5XtB8d1WJhyS w2N9L9zPzoJnHN7 LQzq7KrFiwitGaK HMURznkkrWQrHuN xbAMAoZsH1rwmwo SCsSRsw6uxHzcnL ZdADUmYCVHpMUkU HThZhVwW2xaAWBY y6MpaJoEXv15JCx swhhXNGkmm5ZRf9 L3kgVcGpjDS69kN QMCpFdswUHcj5Xu 3cKkRuV6DZ7jMLn u6kLGhxh9ECGSzt As. ENDSLATE_BIN."
  }
}
```


::: details Ok Response
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "Ok": "BEGINSLATE_BIN. b2RNEZb7VUWmqf6 qixEg51cwYSF5Km yufpLtpbPdkFCfp jmtMDEgJKjbvqSm A7jrbQSfz7Yorky 5EwhBfG1W9Jkd47 Lj8S1BdkdM2vMfC aMV3huudT8iYzzJ cQ1Wa62WCU1Wrgr zfL5P3uupbKv5Pj KceHWVbo87w2r1U d31F6pMGNQ4ZZdX drTov3NjciyHhuE 9xYodxaY6tAFpRj Tshitd1kCzoGZaf AgmnXjKPMuUsbB6 D8UzkBw4pTZRtfy 2hHBXqQJBBAwX9F Xgsrq6xiiYzv9UF vbeF9FUMRLg3jfE QiPHzKEH4hXLyM2 TUdRmicKf6uBnz2 crQRpWJh5gzBP9x HHvKd6mxTfyzuMZ rKymbwQpuPULc1m dLWw5UiQA8jrRGv t7bCDD3qdPkpLBz 9ucjqJwuxZ3mFX5 eWThz57LmNnEz9N RNEvxby7xG1JpgD ZFQLKgyWPmmSY9p 8rJTQ3Le45tKXNk zjNjN5vqX88MiEN tEPEt3Ss9WkmDYG Kp7vVCFL93FxAuS C46s6LFYT2RuL56 ZAK92DeWh4D4gGW mJHJFugdFhHxPKX 5hAWaUtJKD3sEja k5nkgdHwaWQT91c jw9xqBgTFwMkRcv KKxFvHDUWTAj1mU yMHpydTdbeNtGep XXtZ1GjKVkGSqnL 4WiCbEQQnb3pmo8 efJE2SDDcB7Cs9L wixpfm7g4TJ2J28 Wh1jNfNcxUSSHsf xErxNtKbXnHZstK ByfHxhfDRZ42Yhk Jqcr9YKdp5DPaSP RrQLm3GPeyiuach yXWEtvobAGpqRJe dbq756GdiQKcVCw FFn5XMtZCqMpCPV PMq1DpAjRcKJhVN cA5zPPJw4MkZpzr V1m7yHq25ER5ZZL 9fpENr3pcTtqEum BU3Kc7htf8YesyF FdypKTrxbc3QmJv VprcGhVq4dUfDwG AKhaurhJiXbpivf J3JiVaRV6Fq61Rz hJ8AiCLLZ965xWL KCeB17xNjFD3HyT shMKX1g9zj9spie uimi6VMxKTh4U36 sZbjfzfVNDwuYDH BXqA8JWCprYNzLZ 2ZiGaZRyoY39EY5 AprieP7cgDsJtwR b4jXs27S6jBh3bm A75toW2sCsvPZAF 3tmtQgXr1iFjRL5 Rf3519obpfxXkKZ EwD57kQYw2GtGCN ugpgBPgUn3G389i bUbAapCxH1YwazL sjTZ6ZqKrJFSWkn B1xTXj4ofYVBdLX SmZEi1Lj8VEn8bN uYagMcGooWrxNRU bgTpj1J7wMwo7Lz kb7iAqqswW21as1 Uf8wxRQXfU1GGvz 2b6bcGQ7pFkGP3j 9MZ6UKtn7Rx4DG8 hE1NFb6BQx6mEnL SrgVKpaXhxEgCDN kC7ZC1bYR3Ee382 vSHNY2adq8hXWeq UEwvrrEAVVkuZRC 89uFVjzFEttwjUq cNPJXDZdrvVAczm JdmdfJ4GvFxTJEG kG1biy6Hh9EDbqu PzocyrsLQnpUy7K Mh4CczgBx8ipEpY dtTPtgRk2ygoUfd gcdf13iNbkDFzey E1JYNaFFup13w5Q J28zNMdybyvQ2Ww Ch54esBmK1iJg2g y9H3oS2Px8XSqGK MzMDtfo6asTpdF5 qM4wBG6BN6GbhjF Moq5jrhdHYovMjn BgH8ULKvjkF4D8D TeVYcBvDu6zX7aY oHHb89Ge7NEjEBe 9zMnPJfq9E2K79C AjtGHBfDv4KoKKi cNz1cWp3sBkMsVF BLS8BV3JoURgGKt 5NmgWoDJZdACNWz eddDPyu5eViCk93 wpY66b9VwxhQuVu wdEfuV3zQBXjqke zduwYjdMMcKjjmA synLsZH9TomQDWf okbsGARZ8LnASba i2RTh4By5aBj45B dqoE2xgCCAiGvm8 G9iZn8NfZXGbHhE 3pbL86S7zZPgUHp 4RygbWNLbVvLW3Y ggtYAha71S5WXjS 9K8RgZVbzGLazSB HNmyJCZ93n5KevP Phg4qSRDDLKWx37 2UxFK7kEgDGHCdN RQHg67jX4VhDpYA FL1PXby9LUMeP46 roYaYhGykZgv815 LPQ5nXXw2HeuWMi mrkxGRs3dtEMpFj rC8sEpPukAmQG4g oDHikNNWA2ffqzx 5qCqA2ihB2B2yNo h1d7pidFMgWMj65 qKkg5kuY5hHwdbq Dn6tR7zPFcws9dK sciFj8n5bN2dq2f NEsy3hngBfSadLM eGhWXiRcBjb5kfS WUkRQYsgwcbzBiZ EFVUnwYbioPNey6 J7MtFyVdNuSfGxL wcSkpmaMQqZ6b2P tv4uBNiUzz1rRM9 USFvWNP93n2hw2a 7ayMB1m9KCYc787 KovcetggqsBqsC2 hLQ2DDseDJ3TWZ9 zryvdDVVRrNZjMj A5Urn5cefCo1rnj i2wKLw6H2aBUF1B WXfCCmxT81ZAHLS Qgjq6Gxb8syX9qH Feo8brWYwHm1qcP PBan7wsaXDuGX3L XvVkoXhdip9QYyc nj4Ey7zXLaUp5sD fCjTRE5Q2JsauhV RQbHbrEHGqA6Pva jxEFubfMbZRQHEs QoyLWcscbJM8kE5 He9B6XanbgVvqTF nmjkgpQwZoW2fQ2 eKvfbh7RRgAegNS T. ENDSLATE_BIN."
  }
}
```
:::


And finally once the transaction is finalized you will need to submit it to the node to propagate it through the network: 
```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "post_tx",
	"params": {
		"token": "d202964900000000d302964900000000d402964900000000d502964900000000",
		"tx": {
			"offset": "d202964900000000d302964900000000d402964900000000d502964900000000",
			"body": {
				"inputs": [
					{
					  "commit": "098778ce2243fa34e5876c8cb7f6dbbbd6a5649c1561973a807a6811941c12363c",
					  "features": "Coinbase"
					},
					{
					  "commit": "0910c1752100733bae49e877286835aab76d5856ef8139b6c6e3f51798aa461b03",
					  "features": "Coinbase"
					}
				],
				"outputs": [
					{
					  "commit": "082967b3fe580cd110355010ef45450314fb067720db01b0e6873bb083d76708c9",
					  "features": "Plain",
					  "proof": "828bb24121aa0332c872062a42a8333c3ef81f8ae37d24053d953217368b3cada90410a50509a0b9fcbb5aded41397fc00ca1ff5acdac20d48afb0a3281d21e7026d32fdc6c5157461a35f98a809ffa09187c1e170ea24652ad213b7e4c9878654ac3dd9a8915eaf742db53182fcb42d2d341fbdfe8bd31bd001f4ff2c1ca9f9b1531da29137214f211edb7a5eb8f494cb8945f8527dd25bf7e698515043db4249540720008a708db5342230d05b069c094688ccb7c07d4a4a2293ea76cf999c555dc0ddc757891c360db1901bbb4dc20cae997f875f8de482d8160e05d60f9b0135e0fc313d8f953db78f1ea252449dd81cfa22dd895512ed39d566f0924542b543d25fc9fc7a819d228f3b0ee5e381f088f54893e86437dafc49dd923b3e6dff956ca843f951910379531fac9bb5fd01a182dd32a4c597f92da3c01af37cb9b0ec984500884438e74e54d7e76fa1ae7241d5050b13376310b24761634a6f6eb7cf000082f50ed7c1899d7918023d4f877586f964932a7af72e7a4984ddecfdd1921a2e1b80b00d6bd2e64a3f4cb6915a27a8d17a69d163cf45220a13fcddd15dc2bb91ae4f1b6a67224ab3b23e8d7d785df178ec78a84cf42cea086426f563822c8a4271a0b89bb21f84b643dbf1de21b6395039d673a376492767199fa36ccd9a13628ce61695424091acc16059450d59bc59fa7879e7306f5727217211b0264a6a560f886d520e41406ef45b1668805b88d246c5b2ca5a1762042c85be34fcd420ac3843f32236d079b4bd57d6b8d8013d9d18f8efb55e8e443cd9e1af9b144e7a56c8c6be0138af3b4a6c99bee9109bed2bce2e5145e736b125a2ec19aaf3fff713f6897fdd4158ce2ab04706b062ca2847bf70259c0fc4b0d390dc7fdaf0362047f775a912bd22da9d40f04d9790bcd5ece4b36b74c6c340b48c2926b916e8a9"
					},
					{
					  "commit": "096e1669267c22ecb38c466d73b8578261d8e91c14dd66702dd5bf34f4232e10db",
					  "features": "Plain",
					  "proof": "7d567b0895a1103d19446929da8b98f2086819507ddce4b9dbb5ce6327107744e74aba59ef1834937da1b86eb7c1c1b0bc11d1c5d5ec79d25bc1e52aed1656f60d46f6878ba5ca8639efdbb9203e378e91171c11527c4a34713f06dc22f58ca4a08e68d83ff897e61cfc145fe376fa428b55e25cf20d15f10b9054778229798b30fb4e45d817a5053b682dcf591481a3c8174cfbba81e31aa525d5b884ca7a016713178f26c0fe8ae1f88b5382f8e70c4d91fb3828c0f307d828aa028281d3551525e68d20827ab0e6785c6b5747e895dcd38429b44e62b7f6c1c921d87ae954a9dd6e967ac52e6cd13a1d4bb2f1434da25a0723ef9c869cc573019577552dd0e0f808f8cc57723b041320025f6433779fe907998a4ec7606bf884b2199253b502065bed8e0625c2df858d6508c1aa44deddc68d06d00d81e97720e23e15a3464ed4733fc547e9fb772e563a1dbcd27ac55e40f674f9006e7dd4465444f3eb7527cb01905dee69a51cf2fc1810c861dd0834e7649d594c3e1740d85343a6b63c8a9e0a0f63059031899b38dfd9a192034d54029bd35e683ccab46282519b26cae20d398b754357abe1cf0370890f2897b5d8ada4fb3da777a8f8f1daa4197a380e6734504117dd2a92ea1917f174c44c59e0b50c6b7a5f9eb14e6d96cb6b3e5dbcb3d0eaf0e4aac1b6616d674bb708b7559e37de608e8a828bee7f25f627e2f06d9a87e8d651ade39e1e65db7204b94abc0b7ca6fdd75aadeeac6a876b6297e38039734ebdfa9a555152b4293cb00e423a66d64f827afa4748dd6fdc1dc33332bffb820dacbf5a6d347042db985bbd9cf476dceb45d6978035ba03d25612243fc164c0a902017ce7ffd632d041fa3c56554739e78c6d725ecbfdaa0739d3649239fb53294b7a46ee6ed403bf3815f6c78f06a8ca4e3c9b066234f7574fb6ea8f17d199"
					}
				],
				"kernels": [
					{
					  "excess": "08b3b8b83c622f630141a66c9cad96e19c78f745e4e2ddea85439f05d14a404640",
					  "excess_sig": "66074d25a751c4743342c90ad8ead9454daa00d9b9aed29bca321036d16c4b4d1f1ac30ec6809c5e1a983a83af0deb0635b892e5e0ea3a3bd7f68be99f721348",
					  "features": "Plain",
					  "fee": "7000000",
					  "lock_height": "0"
					}
				]
			}
		},
		"fluff": false
	}
}
```
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

If the response is Ok we can assume that the transactions was correctly built and sent to the node and correctly progated to the network.
2. **Interaction with the Receiver**  


### Receive

receive_tx 
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
```
BEGINSLATE_BIN. usqHiSmrwTbxJD1 BKq9tdQUBJCLmRF unXjpYfGsr1hDhH XQSGvUyUKrGPttp dfMqT2LyGtDiSbJ LBaLwqyamCRQ6ga 4SyMzhP1D4CuTpr PjXwfvXqzZiEB4R LAKt3pe9WSPcBSK MuF6Dw9Y4mDJpka zkZ8uDRM4sUzhk8 SDk3ZY5FeeEoPG8 ug7miFxCZKCfMn7 8G2hf7KLobevDeX yQHV5Jja7vRH9kx sQ6PsUN2518EJm2 kc8wtAoHyP6KQTg znNkxvdJ6aXzvEU 5BL9UqS7x2d3U1B aunvhgyEVfE3LXk 7BMp8yPrzF3BBHX KJWLsftycvZwcvM eDZMREoZzMGQWNV PE37U3tEaFbHTWM hy5nNefS4TCoKCk b8WXrZUsRnHw4eX e26LQ94RQoTbXh9 9veAK2ECuU9ttre aK7VNEKmzE9hUea YcFdzXFkSGVcxJL J58T9vdBBUkK9PQ ncoN4aMhiwHwSfr MbJfyUQCLWwjFGY V8qiiVwMLApauyW 35fHztkvtoswH3z cZTJTn1aeYCvBt8 x3mqeMGtw6sFP7u YPEkbQx4ZbNHVaw 3AYsmFLKUS6D2rV EcCaUi3c4wjGopq yjfMh8Sw1irbxDh z55XmSSD1iqu7BV XqGRpjbdEe3ks8E TCW3GpkoDBA96Hm EDvT5d1FEFDefJU eZReffaiKAj54HA MmibCcS8ZPAfLa5 4dJkDqH9Xmquqeb Ut1gRt1HjLJ78mT GLDyMEiBWGw2RVj JNJZNxXy5PZcrfr x5D3U65hobmk7ZT 6VDKzyPNYHwhiug q9QkcmKVTYwUoDT LhhXJCvw3oyNmVP GvWThjWpebSxjsv 6LobgE59ap2NTPx eHHsfhU9fSXZMpn J389tVGkPJtotdQ DHw8rqi8JS6MX6m pdo2tFr2MdKvs5f Zq4oyFBuojGrz3S 5UZgDjK1NLUuDrG ZQJpBwYGSqFza4m 559DieAWLe38khU FmM6uqh8i2ZyEHG qNBok3kCa7JHYpt 4iA93S33PXH5CS7 VowPonFVgpAofK5 oYzopFRdmJU2DUa b1VW3ANdCtNZKpb re2W2rwoDbLP34G QiddN7u1jXWuJj9 HBREYcvGzdxk4EB FfLoMG2tWERLrct 77tnwWZhcaanXTK RDibv4S9Hs912b8 HbV5XtB8d1WJhyS w2N9L9zPzoJnHN7 LQzq7KrFiwitGaK HMURznkkrWQrHuN xbAMAoZsH1rwmwo SCsSRsw6uxHzcnL ZdADUmYCVHpMUkU HThZhVwW2xaAWBY y6MpaJoEXv15JCx swhhXNGkmm5ZRf9 L3kgVcGpjDS69kN QMCpFdswUHcj5Xu 3cKkRuV6DZ7jMLn u6kLGhxh9ECGSzt As. ENDSLATE_BIN.
```
	
   MWC transactions require an interactive exchange between the sender and receiver. Options include:
   - **File Transfer:** The transaction slate is exported as a file and sent to the receiver (via email, messenger, etc.).
   - **HTTP Listener:** The receiver runs a listener, allowing real-time communication and transaction negotiation.
   - **TOR:** The sender connects to the receiver’s TOR address for enhanced privacy.

3. **Sign and Finalize**  
   - After the receiver adds their information to the transaction slate, it is returned to the sender for signing and finalization.
   - The finalized transaction is then broadcast to the MWC blockchain.

4. **Transaction Confirmation**  
   - Once broadcast, the transaction is confirmed by the network.
   - Both sender and receiver can verify the status of the transaction via their wallet or node.

---



The process of receiving MWC involves securely accepting, completing, and confirming the transaction initiated by the sender.

1. **Prepare to Receive**  
   - The receiver sets up their wallet to accept transactions.
   - This may include running an HTTP listener, configuring TOR, or preparing to exchange files with the sender.

2. **Share Transaction Details**  
   - The receiver provides the necessary interaction method (file, HTTP listener URL, or TOR address) to the sender.

3. **Add Information to the Transaction Slate**  
   - Upon receiving the initial transaction slate from the sender, the receiver adds their information to the slate.
   - This includes their portion of the signature to maintain transaction privacy and integrity.

4. **Return the Slate to the Sender**  
   - The updated transaction slate is sent back to the sender for finalization.

5. **Monitor and Confirm**  
   - Once the sender broadcasts the finalized transaction, the receiver monitors the wallet for confirmation.
   - The transaction status is updated, and funds are credited after network confirmation.

---

### Benefits of MWC Workflows

- **Enhanced Privacy:** The interactive nature of transactions ensures that no public addresses or identifiable information are exposed.
- **Multiple Communication Channels:** Users can choose between file-based, HTTP listener, or TOR methods for added flexibility.
- **Secure and Decentralized:** The workflows rely on cryptographic signatures and decentralized validation through the MWC blockchain.

These workflows form the backbone of integrating MWC into any payment or transaction system, maintaining the core values of privacy, simplicity, and decentralization.
