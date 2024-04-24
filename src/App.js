import React, { useState } from "react";
import axios from "axios";
import { shuffle } from "lodash";
import "bulma/css/bulma.min.css";

//Components
import Dropdown from "./Dropdown";

//Dropdown arrays
import { languages } from "./languages";
import { subjects } from "./subjects";

import "./App.css";
import logo from "./logo.svg";

function App() {
  const [book, setBook] = useState(null);
  const [subject, setSubject] = useState("fiction");
  const [language, setLanguage] = useState("en");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeKeyword = (keyword) => {
    const stopwords = ["the", "in", "on", "at", "of", "and"];
    return keyword
      .split(" ")
      .filter((word) => !stopwords.includes(word.toLowerCase()))
      .join(" ");
  };

  const truncateDescription = (description, maxWords = 125) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  const fetchRandomBook = async (retry = 0, maxRetries = 5) => {
    setIsLoading(true);
    if (retry === 0) setError(""); // Clear error only on the first try

    const maxResults = 40;
    const startIndex = retry === 0 ? Math.floor(Math.random() * 200) : 0;
    const processedKeyword = analyzeKeyword(keyword);
    const query = processedKeyword
      ? `(${processedKeyword} OR intitle:${processedKeyword} OR inauthor:${processedKeyword})+subject:${subject}`
      : `subject:${subject}`;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes`,
        {
          params: {
            q: query,
            langRestrict: language,
            startIndex,
            maxResults,
            orderBy: "relevance",
            printType: "books",
            projection: "full",
          },
        }
      );

      let books = response.data.items || [];
      if (books.length === 0 && retry < maxRetries) {
        setTimeout(() => fetchRandomBook(retry + 1, maxRetries), 1000);
      } else if (books.length > 0) {
        books = books.filter(
          (book) =>
            book.volumeInfo &&
            book.volumeInfo.authors &&
            book.volumeInfo.description
        );
        setBook(shuffle(books)[0]); // Random selection from valid books
        setError("");
      } else {
        setError(
          "No results found after several attempts. Please modify your search and try again."
        );
        setBook(null);
      }
    } catch (error) {
      setError(
        "Failed to load data. Please check your network connection and try again."
      );
      setBook(null);
      if (retry < maxRetries)
        setTimeout(() => fetchRandomBook(retry + 1, maxRetries), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App pr-6 pl-6">
      <header className="App-header mb-6">
        <img src={logo} className="App-logo is-hidden-mobile mt-6" alt="logo" />
        <h1 className="title has-text-info is-1 mt-6">Reading Roulette</h1>
        <p className="subtitle is-4 mt-2">Leave your next book to chance.</p>
      </header>

      <div className="grid is-column-gap-6">
        <div className="cell">
          <label className="label is-medium">Subject:</label>
          <Dropdown
            options={subjects}
            value={subject}
            onChange={setSubject}
            dropdownId="subjects-dropdown"
          />
        </div>
        <div className=" cell">
          <label className="label is-medium">Language:</label>
          <Dropdown
            options={languages}
            value={language}
            onChange={setLanguage}
            dropdownId="languages-dropdown"
          />
        </div>
        <div className=" cell is-col-span-2">
          <label className="label is-medium">Keyword:</label>
          <div className="control">
            <input
              className="input is-medium"
              type="text"
              placeholder="Add a keyword (optional)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-2">
        {!isLoading ? (
          <button
            className="button is-primary is-large is-rounded"
            onClick={fetchRandomBook}
          >
            Find a Book
          </button>
        ) : (
          <button className="button is-primary is-large is-rounded is-loading">
            Loading...
          </button>
        )}

        {book ? (
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
                      {book.volumeInfo.description
                        ? truncateDescription(book.volumeInfo.description)
                        : "No description available."}
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot is-justify-content-center">
                <div className="buttons">
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
                    <span className="icon">
                      <i className="fas fa-solid fa-spinner"></i>
                    </span>
                    <span>Pick Again</span>
                  </button>

                  <a
                    className="button is-info is-rounded is-medium"
                    href={book.volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="icon">
                      <i className="fas fa-solid fa-link"></i>
                    </span>
                    <span>Learn more</span>
                  </a>
                </div>
              </footer>
            </div>
          </div>
        ) : (
          error && (
            <div className="modal is-active">
              <div
                className="modal-background"
                onClick={() => {
                  setError("");
                  setBook(null);
                }}
              ></div>
              <div className="modal-card">
                <section className="modal-card-body">
                  <div className="content has-text-centered">
                    <p className="title is-size-3 mb-1 has-text-info">
                      {error}
                    </p>
                  </div>
                </section>
                <footer className="modal-card-foot is-justify-content-center">
                  <div className="buttons">
                    <button
                      className="button is-rounded is-medium"
                      onClick={() => {
                        setError("");
                        setBook(null);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="button is-primary is-rounded is-medium"
                      onClick={() => {
                        setError("");
                        fetchRandomBook();
                      }}
                    >
                      Retry
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          )
        )}
      </div>

      <footer className="footer mt-6">
        <div className="content has-text-centered mt-6">
          <p className="subtitle mb-4">
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
          <div className="buttons is-grouped is-centered">
            <a
              href="https://github.com/ryanhatton/reading-roulette/tree/main"
              className="button is-info is-inverted"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <i className="fab fa-github"></i>
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
