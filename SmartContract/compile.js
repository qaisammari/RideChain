const path = require('path');
const fs = require('fs');
const solc = require('solc'); // JavaScript bindings for the Solidity compiler.
const BCPath = path.resolve(__dirname, 'contracts', 'RideChain.sol');

const source = fs.readFileSync(BCPath, 'utf8');

const input = {
  sources: {
    'RideChain.sol': source
    }
};

let compiled = solc.compile(input, 1);
console.log(compiled);
module.exports  = compiled.contracts[ 'RideChain.sol:RideChain'];