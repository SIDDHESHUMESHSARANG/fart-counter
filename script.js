function updateCounter() {
  const counterElement = document.getElementById("counter");
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(24, 0, 0, 0);

  const start = localStorage.getItem("counter")
    ? parseInt(localStorage.getItem("counter"))
    : Math.floor(Math.random() * 100000000000); // Starting with a random large number if not already stored
  const end = 144000000000; // 144 billion
  const duration = endOfDay.getTime() - now.getTime();
  const increment = (end - start) / duration;

  let currentCount = start;

  function incrementCounter() {
    if (new Date().getTime() >= endOfDay.getTime()) {
      currentCount = Math.floor(Math.random() * 100000000000);
    } else {
      currentCount += increment;
      if (currentCount >= end) {
        currentCount = Math.floor(Math.random() * 100000000000);
      }
    }

    localStorage.setItem("counter", Math.floor(currentCount)); // Store the current count in localStorage
    counterElement.textContent =
      Math.floor(currentCount).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }) + " M";
  }

  setInterval(incrementCounter, 1000); // Update every second
}

updateCounter();

// Reset the counter at midnight
setInterval(function () {
  const now = new Date();
  if (
    now.getHours() === 0 &&
    now.getMinutes() === 0 &&
    now.getSeconds() === 0
  ) {
    localStorage.removeItem("counter"); // Clear the stored count
    updateCounter();
  }
}, 1000);
