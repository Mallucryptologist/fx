function calculateValue() {
  const myPoints = document.getElementById("myPoints").value;
  const totalPoints = 9000000; // Adjust based on current total points
  const circulationPoints = 7000000; // Replace with actual circulation points
  const tokenSupply = 1000000000;
  const valuations = [50000000, 75000000, 100000000, 250000000, 500000000, 1000000000, 2000000000];

  let result = "";
  for (let i = 0; i < valuations.length; i++) {
    const valuation = valuations[i];
    const value = (tokenSupply / totalPoints) * myPoints / valuation;
    result += `At ${valuation} valuation: $${value.toFixed(2)}<br>`;
  }

  document.getElementById("result").innerHTML = result;
  document.getElementById("circulationPoints").innerHTML = `Circulation Points: ${circulationPoints}`;
}
