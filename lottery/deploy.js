const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "aware tumble syrup acid garden stem own expire furnace better solution tail", 
  "https://rinkeby.infura.io/v3/20469c29708147599a13084f89d36f58"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "500000", from: accounts[0] });
    console.log(interface)
  console.log("Contract deployed to", result.options.address);
};
deploy();
