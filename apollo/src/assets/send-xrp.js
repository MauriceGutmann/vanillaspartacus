// ******************************************************
// ************* Get the Preferred Network **************
// ******************************************************

let net = "wss://s.altnet.rippletest.net:51233"
let results= null

let company_account= "rJ2yU6uVrcjPBkvWADr3KHKp6rkJBCCSuf"
let company_public_key= null
let company_private_key= null
let company_seed = "spzUqnwurCmM1tKXEVQH4o1e4qYoK"



// ************* Get Account *****************************

async function getAccount() {
  const client = new xrpl.Client(net)
  const walletServer = net
 console.log('1')
  await client.connect()
  console.log('2')
  //results += '\nConnected, funding wallet.'
  document.getElementById('customerResultField').value = results
  console.log('3')
  const my_wallet = (await client.fundWallet(null, {faucetHost: walletServer})).wallet
  console.log('4')
  const my_balance = (await client.getXrpBalance(my_wallet.address))
  console.log('5')
    document.getElementById('customerAccountField').value = my_wallet.address
    document.getElementById('customerPubKeyField').value = my_wallet.publicKey
    document.getElementById('customerPrivKeyField').value = my_wallet.privateKey
    document.getElementById('customerBalanceField').value = my_balance

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

  client.disconnect()

} // End of getAccountsFromSeeds()


// ******************** Send XRP *************************

async function sendXRP() {
  results = "Connecting to the ledger.\n"
  document.getElementById('customerResultField').value = results
  const client = new xrpl.Client(net)
  await client.connect()
  console.log('1')

  results += "\nConnected. Sending XRP.\n"
  document.getElementById('customerResultField').value = results

  const customer_wallet = xrpl.Wallet.fromSeed(customerSeedField.value)
  console.log('2')

  const company_wallet = xrpl.Wallet.fromSeed(company_seed)
  console.log('3')

  const sendAmount = customerAmountField.value
  console.log('4')

  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": customer_wallet.address,
    "Amount": xrpl.xrpToDrops(sendAmount),
    "Destination": company_account
  })
  console.log('4')
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
console.log('OPSend')
} // End of oPsendXRP()


window.getAccountsFromSeeds = getAccountsFromSeeds
window.getAccount = getAccount
window.sendXRP = sendXRP
window.oPsendXRP = oPsendXRP
