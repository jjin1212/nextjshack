import SelectMenu from "./selectMenu.js"
import { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'


export default function Home() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  })

  const [account, setAccount] = useState(null)

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()

      if(provider) {
        console.log('Ethereum successfully detected')

        setWeb3Api({
          web3: new Web3(provider),
          provider: provider
        })
      } else {
        console.error('Please install Metamask!')
      }
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccounts()
  }, [web3Api.web3])

  return (
    <div>
      <span>
        {
          account ?
          <div>{account}</div> :
          <div className="flex items-center justify-center pt-5">
            <button 
              className="content-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() =>
                web3Api.provider.request({method: 'eth_requestAccounts'}
                )
              }
            >
              Connect Wallet
            </button>
          </div>
        }
      </span>
      
      <div className="container mx-auto">
        <SelectMenu></SelectMenu>
      </div>
      <div className="container mx-auto">
        <div class="h-56 grid grid-cols-3 gap-4 content-center ...">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Deposited:</div>
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Total APY:</div>
        </div>
      </div>
    </div>
    
  )
}
