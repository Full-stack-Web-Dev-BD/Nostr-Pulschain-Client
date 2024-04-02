const ethers = require('ethers');

async function generateWalletFromSeed(seedString) {
    // Generate a wallet using a mnemonic (seed phrase) derived from the seed string
    const mnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.toUtf8Bytes(seedString));
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    
    // Retrieve the private key and public key
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    
    return { privateKey, publicKey };
}

// Example usage
const seedString = "your specific string here";
generateWalletFromSeed(seedString)
    .then(wallet => {
        console.log("Private Key:", wallet.privateKey);
        console.log("Public Key:", wallet.publicKey);
    })
    .catch(error => {
        console.error("Error:", error);
    });
