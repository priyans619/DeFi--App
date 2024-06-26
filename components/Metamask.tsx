"use client";

import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import CustomButton from './CustomButton';


const ConnectMetaMask: React.FC = () => {
  const [provider, setProvider] = useState<any>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    const instance = await web3Modal.connect();
    const web3 = new Web3(instance);
    const accounts = await web3.eth.getAccounts();

    setProvider(instance);
    setWeb3(web3);
    setAccount(accounts[0]);

    instance.on('accountsChanged', (accounts: string[]) => {
      setAccount(accounts[0]);
    })
  };

  return (
    <div className="flex items-center">
      {account ? (
        <div className="flex items-center space-x-4">
          <p className="text-green-500">Connected as {account}</p>
          <CustomButton
            btnType="button"
            title="Disconnect"
            handleClick={() => {
              provider.close();
              setProvider(null);
              setWeb3(null);
              setAccount(null);
            }}
            styles="bg-red-500"
          />
        </div>
      ) : (
        <CustomButton
          btnType="button"
          title="Connect MetaMask"
          handleClick={connectWallet}
          styles="bg-violet-800"
        />
      )}
    </div>
  );
};

export default ConnectMetaMask;
