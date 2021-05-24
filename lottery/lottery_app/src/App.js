import './App.css';

import {useEffect, useState} from 'react'

import lottery from './web3/lottery'
import web3 from './web3'

function App() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalace] = useState('')
  const [ether, setEther] = useState('')
  const [message, setMessage] = useState('')
  const [winnerMsg, setWinnerMsg] = useState('')

  function handleEtherChange(e) {
    setEther(e.target.value)
  }

  useEffect(() => {
    async function x() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      setManager(manager)
      setPlayers(players)
      setBalace(balance)
    }
    x()
  }, [message])

  async function handleClick(e) {
    e.preventDefault()
    
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)

    setMessage("Waiting on transaction success...")

    await lottery.methods.enter().send({
      from:accounts[0], 
      value: web3.utils.toWei(ether,"ether")
    })

    setMessage("You have entered the lottery")
  }

  async function handleClickWinner(e) {
    e.preventDefault()
    const accounts = await web3.eth.getAccounts()

    setWinnerMsg("Attempting to pick the winner...")
    
    await lottery.methods.pickWinner().send({
      from:accounts[0]
    })
    setWinnerMsg("A winner has been picked!")
  }

  return (
    <div className="App">
      <h1>Lottery Game</h1>
      <p>
        This contract is managed by {manager}.
        There are currently {players.length} people entered in the contest.
        The jackpot is {balance}
      </p>

      <form>
        <h4>Want to try your luck?</h4>
        <div>
          <label htmlFor="ether">Amount of ether to enter</label>
          <input type="text"
          value={ether}
          onChange={handleEtherChange}
          />
        </div>
        <p>{message}</p>
        <button onClick={handleClick}>Enter</button>
      </form>
      {winnerMsg}
      <button onClick={handleClickWinner}>Pick a winner</button>
    </div>
  );
}

export default App;
