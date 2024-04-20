


// All the variables needed for the variables before converting
let inputAmount = document.getElementById("inputAmount");
let convertFromLabel = document.getElementById("convertFromLabel");
let convertFromCurrencyType = document.getElementById("convertFromCurrencyType");
// The variable that converts
const convertButton = document.getElementById("convertButton");
// All the variables needed for the variables after converting
const convertToLabel = document.getElementById("convertToLabel");
let convertToCurrencyType = document.getElementById("convertToCurrencyType");
let newCurrencyValueDisplay = document.getElementById("newCurrencyValueDisplay");

// My API key now I know needs to be hidden, is hidden in another file.


//Function for when the button is clicked, and an event listener for the click.
convertButton.addEventListener("click", () => {
    fetch(`https://api.currencyapi.com/v3/latest?apikey=`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            // Access exchange rates from the JSON data
            const exchangeRates = data.data;

            // Get the selected currency codes
            const fromCurrency = convertFromCurrencyType.value;
            const toCurrency = convertToCurrencyType.value;

            // Check if the selected currencies exist in the response
            if (!exchangeRates[fromCurrency]) {
                throw new Error('From currency not found in exchange rates');
            }
            if (!exchangeRates[toCurrency]) {
                throw new Error('To currency not found in exchange rates');
            }

            // Get the exchange rates for the selected currencies. Previously I only did fromCurrency - took me 3 hours to figure it out, as all my currencies came back weird.
            const fromExchangeRate = exchangeRates[fromCurrency].value;
            const toExchangeRate = exchangeRates[toCurrency].value;
            // Get the amount entered by the user
            const amount = parseFloat(inputAmount.value);
            // Calculate the converted amount
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;

            // Display the converted amount to the user
            newCurrencyValueDisplay.textContent = `Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Display an error message to the user
            newCurrencyValueDisplay.textContent = 'Error fetching data. Please try again later.';
        });
});

