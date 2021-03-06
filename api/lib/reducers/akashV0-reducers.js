const terraV3Reducers = require('./terraV3-reducers')

function blockReducer(networkId, block, transactions) {
  return {
    networkId,
    height: block.block.header.height,
    chainId: block.block.header.chain_id,
    hash: block.block_id.hash,
    time: block.block.header.time,
    transactions,
    proposer_address: block.block.header.proposer_address
  }
}

function setTransactionSuccess(transaction) {
  return transaction.code ? false : true
}

function delegationReducer(delegation, validator) {
  const delegationCoin = terraV3Reducers.coinReducer(delegation.balance)
  return {
    validatorAddress: delegation.validator_address,
    delegatorAddress: delegation.delegator_address,
    validator,
    amount: delegationCoin.amount
  }
}

module.exports = {
  ...terraV3Reducers,
  blockReducer,
  delegationReducer,
  setTransactionSuccess
}
