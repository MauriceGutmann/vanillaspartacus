// ******************************************************
// ************* Get the Preferred Network **************
// ******************************************************

let net = "wss://xls20-sandbox.rippletest.net:51233"

let company_account= null
let company_public_key= null
let company_private_key= null
let company_seed =null



// ************* Get Account *****************************

async function getAccount(type) {
  const client = new xrpl.Client(net)
  const walletServer = net

  await client.connect()

  results += '\nConnected, funding wallet.'
  document.getElementById('customerResultField').value = results

  const my_wallet = (await client.fundWallet(null, {faucetHost: walletServer})).wallet
  const my_balance = (await client.getXrpBalance(my_wallet.address))

    document.getElementById('customerAccountField').value = my_wallet.address
    document.getElementById('customerPubKeyField').value = my_wallet.publicKey
    document.getElementById('customerPrivKeyField').value = my_wallet.privateKey
    document.getElementById('customerBalanceField').value =
      (await client.getXrpBalance(my_wallet.address))
    document.getElementById('customerSeedField').value = my_wallet.seed
    results += '\ncustomer account created.'
    document.getElementById('customerResultField').value = results

  document.getElementById('seeds').value = customerSeedField.value
  client.disconnect()
} // End of getAccount()


// ********** Get Accounts from Seeds ********************

async function getAccountsFromSeeds() {
  const client = new xrpl.Client(net)
  document.getElementById('customerResultField').value = results
  await client.connect()
  results += '\nConnected, finding wallets.\n'
  document.getElementById('customerResultField').value = results
  // var lines = seeds.value.split('\n');
  const customer_wallet = xrpl.Wallet.fromSeed(seeds.value)
  // const company_wallet = xrpl.Wallet.fromSeed(lines[1])
  const customer_balance = (await client.getXrpBalance(customer_wallet.address))
  // const company_balance = (await client.getXrpBalance(company_wallet.address))
  document.getElementById('customerAccountField').value = customer_wallet.address
  document.getElementById('customerPubKeyField').value = customer_wallet.publicKey
  document.getElementById('customerPrivKeyField').value = customer_wallet.privateKey
  document.getElementById('customerSeedField').value = customer_wallet.seed
  document.getElementById('customerBalanceField').value =
    (await client.getXrpBalance(customer_wallet.address))

  /*document.getElementById('companyAccountField').value = company_wallet.address
  document.getElementById('companyPubKeyField').value = company_wallet.publicKey
  document.getElementById('companyPrivKeyField').value = company_wallet.privateKey
  document.getElementById('companySeedField').value = company_wallet.seed
  document.getElementById('companyBalanceField').value =
    (await client.getXrpBalance(company_wallet.address))*/

  client.disconnect()

} // End of getAccountsFromSeeds()


// ******************** Send XRP *************************

async function sendXRP() {
  results = "Connecting to the ledger.\n"
  document.getElementById('customerResultField').value = results
  const client = new xrpl.Client(net)
  await client.connect()

  results += "\nConnected. Sending XRP.\n"
  document.getElementById('customerResultField').value = results

  const customer_wallet = xrpl.Wallet.fromSeed(customerSeedField.value)
  const company_wallet = xrpl.Wallet.fromSeed(company_seed)
  const sendAmount = customerAmountField.value

  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": customer_wallet.address,
    "Amount": xrpl.xrpToDrops(sendAmount),
    "Destination": company_account
  })
  const signed = customer_wallet.sign(prepared)
  const tx = await client.submitAndWait(signed.tx_blob)
  results += "\nBalance changes: " +
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  document.getElementById('customerResultField').value = results

  document.getElementById('customerBalanceField').value =
    (await client.getXrpBalance(customer_wallet.address))
  document.getElementById('companyBalanceField').value =
    (await client.getXrpBalance(company_wallet.address))
  client.disconnect()

} // End of sendXRP()


// ****** Reciprocal Transactions ****************************************

// ********* Send XRP from company account ***********


async function oPsendXRP() {


  results = "Connecting to testnet.\n"
  document.getElementById('companyResultField').value = results
  const client = new xrpl.Client(net)
  await client.connect()


  results += "\nConnected. Sending XRP.\n"
  document.getElementById('companyResultField').value = results


  const company_wallet = xrpl.Wallet.fromSeed(companySeedField.value)
  const customer_wallet = xrpl.Wallet.fromSeed(customerSeedField.value)
  const sendAmount = companyAmountField.value


  results += "\ncompany_wallet.address: = " + company_wallet.address
  document.getElementById('companyResultField').value = results


  // ---------------------------------- Prepare transaction
  // Note that the destination is hard coded.
  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": company_wallet.address,
    "Amount": xrpl.xrpToDrops(companyAmountField.value),
    "Destination": companyDestinationField.value
  })


  // ---------------------------- Sign prepared instructions
  const signed = company_wallet.sign(prepared)


  // ------------------------------------ Submit signed blob
  const tx = await client.submitAndWait(signed.tx_blob)


  results += "\nBalance changes: " +
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  document.getElementById('companyResultField').value = results


  document.getElementById('customerBalanceField').value =
    (await client.getXrpBalance(customer_wallet.address))
  document.getElementById('companyBalanceField').value =
    (await client.getXrpBalance(company_wallet.address))


  client.disconnect()


} // End of oPsendXRP()


window.getAccountsFromSeeds = getAccountsFromSeeds
window.getAccount = getAccount
window.sendXRP = sendXRP
window.oPsendXRP = oPsendXRP
