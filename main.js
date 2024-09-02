document.getElementById('navButton').onclick = function() {
  var sidebar = document.getElementById('sidebar');
  if (sidebar.style.left === "-200px") {
      sidebar.style.left = "0";
  } else {
      sidebar.style.left = "-200px";
  }
};

// Your CryptoCompare API Key
const apiKey = 'adaaf6469c6b1b01ef4874d0be0f16788fe5c192cd65e5c84cebda4141f555b5';

// Function to fetch real-time Bitcoin price
function fetchRealTimePrice() {
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const priceContainer = document.getElementById('price-container');
            priceContainer.innerHTML = `<p>Bitcoin Price: $${data.USD}</p>`;
        })
        .catch(error => console.error('Error fetching real-time price:', error));
}

// Function to fetch recent news related to Bitcoin
function fetchRecentNews() {
    fetch(`https://min-api.cryptocompare.com/data/v2/news/?categories=BTC&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            let newsHTML = '';
            data.Data.slice(0, 5).forEach(newsItem => {
                newsHTML += `
                    <div class="news-item">
                        <h4>${newsItem.title}</h4>
                        <p>${newsItem.body}</p>
                        <a href="${newsItem.url}" target="_blank">Read more</a>
                    </div>
                `;
            });
            newsContainer.innerHTML = newsHTML;
        })
        .catch(error => console.error('Error fetching recent news:', error));
}

// Function to fetch historical price data for Bitcoin and display it on a chart
function fetchHistoricalTrends() {
  fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30', {
      method: 'GET',
      headers: {
          'Authorization': `Apikey ${apiKey}`
      }
  })
  .then(response => response.json())
  .then(data => {
      const ctx = document.getElementById('trend-chart').getContext('2d');
      const dates = data.Data.Data.map(entry => new Date(entry.time * 1000).toLocaleDateString());
      const prices = data.Data.Data.map(entry => entry.close);

      const chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: dates,
              datasets: [{
                  label: 'Bitcoin Price (USD)',
                  data: prices,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 2,
                  fill: false
              }]
          },
          options: {
              scales: {
                  x: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Date'
                      }
                  },
                  y: {
                      beginAtZero: false,
                      title: {
                          display: true,
                          text: 'Price (USD)'
                      }
                  }
              }
          }
      });
  })
  .catch(error => console.error('Error fetching historical trends:', error));
}

// Call the functions to fetch data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchRealTimePrice();
    fetchRecentNews();
    fetchHistoricalTrends();
});


//quiz

