import React, { useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const [book, setBook] = useState(null);
  const [subject, setSubject] = useState("fiction"); // Default to Fiction
  const [language, setLanguage] = useState("en"); // Default to English

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const fetchRandomBook = (retry = 0, maxRetries = 5) => {
    const maxResults = 40;
    const maxStartIndex = 200;
    const startIndex = Math.floor(Math.random() * maxStartIndex);
  
    axios
      .get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: `subject:${subject}`,
          langRestrict: language,
          startIndex: startIndex,
          maxResults: maxResults,
        },
      })
      .then((response) => {
        const books = response.data.items;
        if (!books || books.length === 0) {
          if (retry < maxRetries) {
            console.log(`No books found, retrying... [Attempt ${retry + 1}]`);
            setTimeout(() => fetchRandomBook(retry + 1, maxRetries), 1000);
          } else {
            console.error("No books found after several attempts.");
            alert("No books found for this subject. Please try again or choose another subject.");
          }
        } else {
          // Filter out books that do not have both authors and a description
          const validBooks = books.filter(book =>
            book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.description);
  
          if (validBooks.length > 0) {
            const shuffledBooks = shuffleArray(validBooks);
            const randomBook = shuffledBooks[0];
            setBook(randomBook);
          } else {
            // If no valid books are found in the current fetch, retry fetching
            console.log("No valid books in this fetch, retrying...");
            setTimeout(() => fetchRandomBook(retry + 1, maxRetries), 1000);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("Failed to load data. Please check your network connection and try again.");
      });
  };
  

  return (
    <div className="App">
      <header className="App-header mb-4">
        <img src={logo} className="App-logo is-hidden-mobile" alt="logo" />
        <h1 class="title has-text-info is-1 mt-6">Reading Roulette</h1>
        <p class="subtitle is-4 mt-2">Leave your next book to chance.</p>
      </header>

      <div className="container mb-6">
        <div class="mb-6">
          <div className="field column">
            <label className="label is-medium ">Select a Subject:</label>
            <div className="control has-icons-left">
              <div className="select is-large">
                <select
                  class="dropdown-content"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="fiction">Fiction</option>
                  <option value="nonfiction">Non-Fiction</option>
                  <option value="history">History</option>
                  <option value="biography">Biography</option>
                  <option value="self-help">Self-Help</option>
                  <option value="science">Science</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="technology">Technology</option>
                  <option value="philosophy">Philosophy</option>
                </select>
                <span class="icon is-small is-left">
                  <i class="fas fa-book"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="field column">
            <label className="label is-medium">Select Language:</label>
            <div className="control has-icons-left">
              <div className="select is-large">
                <span class="select">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                  <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="button is-primary is-large"
          onClick={fetchRandomBook}
        >
          Find a Book
        </button>

        {book && (
          <div className="modal is-active">
            <div
              className="modal-background"
              onClick={() => setBook(null)}
            ></div>
            <div className="modal-card">
              <section className="modal-card-body">
                <div className="media">
                  {book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.thumbnail && (
                      <div className="mr-5 is-hidden-mobile">
                        <figure className="image is-128x128">
                          <img
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title}
                          />
                        </figure>
                      </div>
                    )}
                  <div className="media-content">
                    <p className="title is-size-3 mb-1 has-text-left">
                      {book.volumeInfo.title}
                    </p>
                    <p className="subtitle is-5 has-text-left">
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors.join(", ")
                        : "Author information not available"}
                    </p>
                    <div className="content has-text-left">
                      {book.volumeInfo.description ||
                        "No description available."}
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot is-justify-content-center">
                <div class="buttons">
                  <button
                    className="button is-rounded is-medium"
                    onClick={() => setBook(null)}
                  >
                    Close
                  </button>
                  <button
                    className="button is-primary is-rounded is-medium"
                    onClick={fetchRandomBook}
                  >
                    <span class="icon">
                      <i class="fas fa-solid fa-spinner"></i>
                    </span>
                    <span>Pick Again</span>
                  </button>

                  <a
                    className="button is-info is-rounded is-medium"
                    href={book.volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="icon">
                      <i class="fas fa-solid fa-link"></i>
                    </span>
                    <span>Learn more</span>
                  </a>
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>

      <footer class="footer">
        <div class="content has-text-centered mt-6">
          <p class="subtitle mb-6">
            <strong>Reading Roulette</strong> was made with ❤️ by{" "}
            <a href="https://ryanhatton.net">Ryan Hatton</a>.
          </p>
          <p>
            Source code licensed
            <a href="http://opensource.org/licenses/mit-license.php">
              &nbsp;MIT
            </a>
            . The website content licensed
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              &nbsp;CC BY NC SA 4.0
            </a>
            .
          </p>
          <div class="buttons is-grouped is-centered">
            <a
              href="https://github.com/ryanhatton/reading-roulette/tree/main"
              class="button is-info is-inverted"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              <span>View on Github</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
