const initialPoints = 9000000;
const dailyIncrement = 1000000;
const totalTokenSupply = 1000000000;  // 1 billion tokens
const tokenSupplyForTradingPoints = 0.025 * totalTokenSupply;  // 2.5% of total supply = 25 million tokens
const valuations = [50000000, 75000000, 100000000, 250000000, 500000000, 1000000000, 2000000000];
const startTime = new Date().setUTCHours(14, 0, 0, 0); // 2 PM UTC start time

// Function to calculate the total points based on days passed
function updateCurrentPoints() {
    const now = new Date();
    const daysPassed = Math.floor((now - startTime) / (24 * 60 * 60 * 1000));
    return initialPoints + (daysPassed * dailyIncrement);
}

// Function to calculate and display the dollar value of points at different valuations
function calculateValues() {
    const userPoints = document.getElementById('userPoints').value;
    const currentTotalPoints = updateCurrentPoints();
    const circulationPointsElement = document.getElementById('circulationPoints');
    
    circulationPointsElement.textContent = `Current Circulation Points: ${currentTotalPoints}`;

    let resultHTML = `<p>Your Points: ${userPoints}</p>`;
    
    valuations.forEach(valuation => {
        // User's token allocation
        const userTokenAllocation = (userPoints / currentTotalPoints) * tokenSupplyForTradingPoints;
        // Dollar value based on valuation
        const dollarValue = (userTokenAllocation / totalTokenSupply) * valuation;
        resultHTML += `<p>At $${(valuation / 1000000).toFixed(0)}M valuation: $${dollarValue.toFixed(2)}</p>`;
    });
    
    document.getElementById('results').innerHTML += resultHTML;
}

// Function to create snowflake animation
function createSnowflakes(num) {
    for (let i = 0; i < num; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(snowflake);
    }
}

createSnowflakes(50);
updateCurrentPoints(); // Update points immediately on load
calculateValues(); // Automatically calculate values on load
</script>
</body>
</html>
