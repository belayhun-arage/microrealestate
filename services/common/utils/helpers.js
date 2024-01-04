const crypto = require('crypto');

// Function to generate a random string of a given length
const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // Convert to hexadecimal format
    .slice(0, length); // Trim to desired length
};

// Generate tokens
const ACCESS_TOKEN_SECRET = generateRandomString(32); // Adjust the length as needed
const REFRESH_TOKEN_SECRET = generateRandomString(32); // Adjust the length as needed
const RESET_TOKEN_SECRET = generateRandomString(32); // Adjust the length as needed

// Display the generated tokens
console.log('ACCESS_TOKEN_SECRET:', ACCESS_TOKEN_SECRET);
console.log('REFRESH_TOKEN_SECRET:', REFRESH_TOKEN_SECRET);
console.log('RESET_TOKEN_SECRET:', RESET_TOKEN_SECRET);
