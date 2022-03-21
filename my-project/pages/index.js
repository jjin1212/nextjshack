import SelectMenu from "./selectMenu.js"
import { useEffect, useState } from "react";
import { fetchSupplyRateForGivenToken } from "./api/compound.js";
import cETH from "./api/compound.js";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [supplyRate, setSupplyRate] = useState(0);

  const fetchSupplyRate = async () => {
    
    try {
      var newSupplyRate = await fetchSupplyRateForGivenToken(cETH);
      setSupplyRate(newSupplyRate);
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
    fetchSupplyRate();
  }, 0)

  return (
    <div>
      <span>
        {
          currentAccount ?
          <div className="flex items-center justify-center pt-5">{currentAccount}</div> :
          <div className="flex items-center justify-center pt-5">
            <button 
              className="content-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() =>
                {connectWallet}
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
        <div class="h-56 grid grid-cols-2 gap-4 content-center ...">
          <div class="md:flex md:items-center mb-6">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Deposit Amount
            </label>
            <div class="md:w-2/3">
              <input type="text" placeholder="Placeholder" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Withdraw Amount
              </label>
            <div class="md:w-2/3">
              <input type="text" placeholder="Placeholder" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4 text-center">
              <div class="p-4 sm:w-1/4 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{supplyRate}%</h2>
                <p class="leading-relaxed">ETH Supply APY</p>
              </div>
              <div class="p-4 sm:w-1/4 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">0%</h2>
                <p class="leading-relaxed">COMP Distribution APY</p>
              </div>
              <div class="p-4 sm:w-1/4 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">0</h2>
                <p class="leading-relaxed">ETH in wallet</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container mx-auto">
        <h1>Farming Details</h1>
        <div class="h-56 grid grid-cols-3 gap-4 content-center ...">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Deposited: 0</div>
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Total APY: {supplyRate}%</div>
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Health Factor: 0</div>
        </div>
      </div>
      <div className="container mx-auto">
        <div class="h-56 grid grid-cols-2 gap-4 content-center ...">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Farm
          </button>
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}
