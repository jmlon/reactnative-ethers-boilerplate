// React native libraries
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import the required shims
import 'ethers/dist/shims.js';

// Import the ethers library
import { ethers } from 'ethers';


export default function App() {

  const [ network, setNetwork ] = useState('');
  const [ block, setBlock ] = useState(0);
  const [ balance, setBalance ] = useState(0);
  const [ gasPrice, setGasPrice ] = useState(0);
  const [ txCount, setTxCount ] = useState(0);

  // The default is "info"; other options
  // "debug", "info", "warn", "error", "off"
  ethers.errors.setLogLevel("error");

  useEffect( () => {
    // Disable YellowBox warning about long timers
    console.disableYellowBox = true;
  });


  // let provider = new ethers.providers.Web3Provider(web3.currentProvider);

  // const PROJECT_ID='YOUR_ID_HERE';
  // let provider = new ethers.providers.InfuraProvider("ropsten", PROJECT_ID);

  let provider = new ethers.getDefaultProvider("ropsten");

  provider.getBlockNumber().then(blk => setBlock(blk));
  provider.getNetwork().then(x => setNetwork(x.name));
  provider.getGasPrice().then(gp => setGasPrice(ethers.utils.formatUnits(gp, "gwei")));

  let address = ethers.utils.getAddress("0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B");
  provider.getBalance(address)
    .then(bn => ethers.utils.formatEther(bn))
    .then(x => setBalance(x));

  provider.getTransactionCount(address).then(setTxCount);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Network: {network}</Text>
      <Text>Last block: {block}</Text>
      <Text>Gas price: {gasPrice} gwei</Text>
      <Text>Account {address} : {balance} ETH</Text>
      <Text>tx count : {txCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
