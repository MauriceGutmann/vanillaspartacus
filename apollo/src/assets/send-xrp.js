
let net = "wss://s.altnet.rippletest.net:51233" //Testnet
let results= null

let company_account= "rJ2yU6uVrcjPBkvWADr3KHKp6rkJBCCSuf"
let company_seed = "spzUqnwurCmM1tKXEVQH4o1e4qYoK"

// ********** Get Accounts from Seeds ********************
async function getAccountsFromSeeds() {
  const client = new xrpl.Client(net)
  await client.connect()

  console.log('Connected, finding wallets.')
  const customer_wallet = xrpl.Wallet.fromSeed(seeds.value)
  const customer_balance = (await client.getXrpBalance(customer_wallet.address))

  document.getElementById('customerAccountField').value = customer_wallet.address
  document.getElementById('customerPubKeyField').value = customer_wallet.publicKey
  document.getElementById('customerSeedField').value = customer_wallet.seed
  document.getElementById('customerBalanceField').value = (await client.getXrpBalance(customer_wallet.address))

  client.disconnect()
} // End of getAccountsFromSeeds()


// ******************** Send XRP *************************
async function sendXRP() {
  console.log('Connecting to the ledger')

  const client = new xrpl.Client(net)
  await client.connect()

  console.log('Connected. Sending XRP')

  const customer_wallet = xrpl.Wallet.fromSeed(customerSeedField.value)
  console.log('1')
  const company_wallet = xrpl.Wallet.fromSeed(company_seed)
  console.log('2')

  const sendAmount = customerAmountField.value

  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": customer_wallet.address,
    "Amount":  xrpl.xrpToDrops(sendAmount),
    "Destination": company_account
  })
  console.log('3')

  const signed = customer_wallet.sign(prepared)
  const tx = await client.submitAndWait(signed.tx_blob)
  let newBalance = (await client.getXrpBalance(customer_wallet.address))
  console.log('Balance changes: '+ JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  document.getElementById('customerBalanceField').value = newBalance

  client.disconnect()
} // End of sendXRP()


window.getAccountsFromSeeds = getAccountsFromSeeds
window.sendXRP = sendXRP

