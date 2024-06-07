import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';


const ConnectMetaMask: React.FC = () => {
  const [provider, setProvider] = useState<any>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

    const instance = await web3Modal.connect();
    const web3 = new Web3(instance);
    const accounts = await web3.eth.getAccounts();

   
  };

  return (
    
  );
};

export default ConnectMetaMask;
