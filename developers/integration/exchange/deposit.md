# Integrate Deposit with Slatepack Method

### Steps:


1. **User API Request to Generate Slatepack Address**
   - **Functionality:** Use the `mwc-wallet` API to create a unique Slatepack Address for the user.
   - **API Call:**
     - **Endpoint:** `GET /v3/owner/wallet/receive_address`
     - **Response Example:**
       ```json
       {
         "address": "slatepack_address_here"
       }
       ```
   - **Attribution:** Store this Slatepack address in your database and associate it with the user's account.



2. **Monitor for Incoming Transactions**
   - Use the `listen` command or polling via `grin-wallet` APIs to check for new Slatepack transactions.

   - **Function: Listen for Incoming Slatepack**
     - Run a Slatepack listener in the background:
       ```bash
       grin-wallet listen
       ```
       This listens for incoming transactions.

   - **Polling API Call:**
     - **Endpoint:** `GET /v3/owner/wallet/transactions`
     - **Purpose:** List all wallet transactions, including pending ones.
     - **Response Example:**
       ```json
       [
         {
           "id": 1,
           "tx_slate_id": "slate-id",
           "amount": 1000000000,
           "status": "received",
           "timestamp": "2024-11-24T12:34:56Z",
           "user_id": "user_123"
         }
       ]
       ```



3. **Match Deposits to Users**
   - Use the `tx_slate_id` or metadata in the transaction to match it with the user who initiated it.
   - Record the status as "pending" until the transaction is confirmed on the blockchain.



4. **Confirm and Credit User’s Account**
   - Once a transaction is confirmed:
     - Change its status to "confirmed."
     - Credit the user's account with the equivalent Grin balance.


---

## Withdrawal Using Slatepack

### Steps:


1. **User Requests Withdrawal**
   - Through your API, the user specifies:
     - Amount to withdraw.
     - Their **Slatepack Address**.



2. **Initiate Transaction**
   - Use the `send` API or CLI to create an initial Slatepack transaction:
     - **CLI Command:**
       ```bash
       grin-wallet send --to 'recipient_slatepack_address' --amount 10.0
       ```
     - **API Call:**
       - **Endpoint:** `POST /v3/owner/wallet/transaction/send`
       - **Request Body:**
         ```json
         {
           "address": "recipient_slatepack_address",
           "amount": 1000000000,
           "fee": null
         }
         ```
       - **Response:**
         ```json
         {
           "slatepack_message": "slatepack_data",
           "tx_slate_id": "slate-id"
         }
         ```

   - Store the **Slatepack Message** and associate it with the user withdrawal request.



3. **Send the Slatepack to the User**
   - Provide the **Slatepack Message** to the user via your API response or UI.



4. **Wait for User to Finalize**
   - Wait for the user to process the Slatepack and send back the finalized transaction.
   - **Receive Finalized Slatepack:**
     - **CLI Command:**
       ```bash
       grin-wallet receive --slate 'finalized_slatepack_data'
       ```
     - **API Call:**
       - **Endpoint:** `POST /v3/owner/wallet/transaction/finalize`
       - **Request Body:**
         ```json
         {
           "slate": "finalized_slatepack_data"
         }
         ```
       - **Response Example:**
         ```json
         {
           "tx_id": "finalized_transaction_id",
           "broadcasted": true
         }
         ```



5. **Broadcast the Transaction**
   - Use the `finalize` command or API to broadcast the finalized transaction to the network.
     - **CLI Command:**
       ```bash
       grin-wallet finalize --file slatepack_finalized
       ```
     - **API Call:**
       - **Endpoint:** `POST /v3/owner/wallet/transaction/post`
       - **Request Body:**
         ```json
         {
           "tx_id": "finalized_transaction_id"
         }
         ```



6. **Confirm Completion**
   - Once the transaction is confirmed on the blockchain:
     - Mark the user’s withdrawal request as "completed."
     - Notify the user via API response or email.


---

## API Workflow Example

### User Deposit


1. **User Fetches Slatepack Address:**
   - `GET /api/grin/deposit`
   - Response:
     ```json
     {
       "slatepack_address": "slatepack_address_here"
     }
     ```



2. **System Monitors Incoming Deposits**:
   - Poll `/v3/owner/wallet/transactions` for deposits.
   - Map deposits to users based on the `slate_id`.



3. **Confirm and Credit User:**
   - On confirmation, credit the user's account.


### User Withdrawal


1. **User Requests Withdrawal:**
   - `POST /api/grin/withdraw`
   - Request Body:
     ```json
     {
       "amount": 10.0,
       "slatepack_address": "user_slatepack_address"
     }
     ```



2. **API Creates Slatepack Transaction:**
   - Calls `POST /v3/owner/wallet/transaction/send`.



3. **Provide Slatepack to User:**
   - Response:
     ```json
     {
       "slatepack_message": "slatepack_data"
     }
     ```



4. **User Returns Finalized Slatepack:**
   - `POST /api/grin/withdraw/finalize`
   - Request Body:
     ```json
     {
       "finalized_slatepack": "finalized_slatepack_data"
     }
     ```



5. **API Finalizes and Broadcasts Transaction.**


---

## Security Considerations


- Ensure secure communication for sharing Slatepack messages.
- Use HTTPS and authenticated API endpoints.
- Implement strict validation on amounts and Slatepack data to prevent misuse.


