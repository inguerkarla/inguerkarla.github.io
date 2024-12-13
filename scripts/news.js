'use strict';

// News API key and endpoint
const apiKey = '627ed0f3b2e8432b8670d2b8d7d2f6a5';
const newsEndpoint = 'https://newsapi.org/v2/top-headlines';

// Function to fetch news data using AJAX
function AjaxNews() {
    // Step: Instantiate an XHR object
    let xhr = new XMLHttpRequest();

    // Step: Open a connection to the server
    xhr.open('GET', `${newsEndpoint}?country=us&apiKey=${apiKey}`);

    // Step: Add event listener for ready state change event
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
            // Check if the request was successful (status code 200)
            if (xhr.status === 200) {
                // Response succeeded - data is available here
                const data = JSON.parse(xhr.responseText);

                // Update the news container
                const newsContainer = document.getElementById('news-container');
                newsContainer.innerHTML = '';

                data.articles.slice(0, 3).forEach(function (article) {
                    const newsItem = `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.description}</p>
                                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                                </div>
                            </div>
                        </div>
                    `;

                    newsContainer.innerHTML += newsItem;
                });
            } else {
                // Request failed
                console.error('Error fetching news:', xhr.statusText);
            }
        }
    });

    // Step: Send the request
    xhr.send();
}

// Fetch news when the page loads
document.addEventListener('DOMContentLoaded', function () {
    AjaxNews();
});
