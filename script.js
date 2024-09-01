:root {
    --initial-points: 10000000;
    --daily-increment: 1000000;
    --total-token-supply: 1000000000;  /* 1 billion tokens */
    --token-supply-for-trading-points: calc(0.025 * var(--total-token-supply));  /* 2.5% of total supply = 25 million tokens */
    --valuations: 50000000, 75000000, 100000000, 250000000, 500000000, 1000000000, 2000000000;
    --start-time: 14:00; /* 2 PM UTC start time */
}

/* Function to calculate the total points based on days passed */
function updateCurrentPoints() {
    const now = new Date();
    const startTime = getComputedStyle(document.documentElement).getPropertyValue('--start-time').trim();
    const initialPoints = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--initial-points').trim(), 10);
    const dailyIncrement = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--daily-increment').trim(), 10);
    const daysPassed = Math.floor((now - new Date('1970-01-01T' + startTime + 'Z')) / (24 * 60 * 60 * 1000));
    return initialPoints + (daysPassed * dailyIncrement);
}

function calculateValues() {
    const userPoints = document.getElementById('userPoints').value;
    const currentTotalPoints = updateCurrentPoints();
    const circulationPointsElement = document.getElementById('circulationPoints');
    const currentPointsElement = document.getElementById('currentPoints');
    const valuationTableBody = document.querySelector('#valuationTable tbody');
    const tokenSupplyForTradingPoints = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--token-supply-for-trading-points').trim(), 10);
    const valuations = getComputedStyle(document.documentElement).getPropertyValue('--valuations').trim().split(',').map(Number);
    
    circulationPointsElement.textContent = `Current Circulation Points: ${currentTotalPoints}`;
    currentPointsElement.textContent = `Current Points: ${currentTotalPoints}`;

    let resultHTML = `<p>Your Points: ${userPoints}</p>`;
    
    // Clear previous table rows
    valuationTableBody.innerHTML = '';

    valuations.forEach(valuation => {
        // User's token allocation
        const userTokenAllocation = (userPoints / currentTotalPoints) * tokenSupplyForTradingPoints;
        // Dollar value based on valuation
        const dollarValue = (userTokenAllocation / parseInt(getComputedStyle(document.documentElement).getPropertyValue('--total-token-supply').trim())) * valuation;
        const row = document.createElement('tr');
        row.innerHTML = `<td>$${(valuation / 1000000).toFixed(0)}M</td><td>$${dollarValue.toFixed(2)}</td>`;
        valuationTableBody.appendChild(row);
    });
    document.getElementById('results').innerHTML = resultHTML; /* Clear previous results and display new ones */
}

/* Function to create snowflake animation */
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

window.addEventListener('load', function() {
    updateCurrentPoints(); /* Update points immediately on load */
    calculateValues(); /* Automatically calculate values on load */
});

