const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');



const provider = new HDWalletProvider(
  "aware tumble syrup acid garden stem own expire furnace better solution tail", 
"https://rinkeby.infura.io/v3/3f612d9efc874cf180d3c90defd4688a"
);

const web3 = new Web3(provider)


const deploy = async () => {
  try {

    const accounts = await web3.eth.getAccounts()
    
    console.log(`Deploying from account, ${accounts[0]}`)
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments: ["Howdy!"]})
    .send({
      gas: '1000000',
      from:accounts[0]})
      
      console.log(`Contract deployed to: ${result.options.address}`)
    } catch (error) {
      console.log(error.message)
    }
}

deploy()