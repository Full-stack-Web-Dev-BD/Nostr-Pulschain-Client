const ursa = require('ursa');

// Generate an Ed25519 key pair (preferred for Nostr)
const keyPair = ursa.generatePrivateKey('ed25519');

// Extract private and public keys
const privateKey = keyPair.toPrivatePem('base64');
const publicKey = keyPair.toPublicPem('base64');