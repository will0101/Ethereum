import './App.css';

import {useEffect, useState} from 'react'

import lottery from './web3/lottery'
import web3 from './web3'

function App() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalace] = useState('')
  const [ether, setEther] = useState('')

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
  }, [])

  return (
    <div className="App">
            {JSON.stringify({manager,players,balance})}

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
        <button>Enter</button>
      </form>
    </div>
  );
}

export default App;
