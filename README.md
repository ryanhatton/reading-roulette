# Reading Roulette

Reading Roulette is a web application built with React that allows users to discover random books based on selected subjects and languages. Utilizing the Google Books API, Reading Roulette makes book discovery exciting and spontaneous.

## Features

- **Book Selection**: Users can choose a book's subject and language.
- **Random Book Discovery**: Fetches a random book from a pool of books based on the user's selection.
- **Detailed Book Information**: Displays detailed information about the book, including title, authors, and description.
- **Responsive Design**: Fully responsive web design that works on desktop and mobile.

## Technologies Used

- React.js
- [Lodash](https://lodash.com/), a modern JavaScript utility library delivering modularity, performance, & extras, to simplify various array and object manipulations. Specifically, we use the `shuffle` function from Lodash to randomize the array of books fetched from the Google Books API. This choice was made for its performance benefits and reliability over a custom shuffle implementation (my initial approach).
- Axios for API requests
- Bulma CSS Framework
- FontAwesome for icons

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your computer. Node.js 12.x or newer is recommended.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ryanhatton/reading-roulette.git
   cd reading-roulette
2. **Install dependencies**

   ```bash
   npm install
3. **Start the development server**

   ```bash
   npm start
   ```
   This runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

## Usage

Once the application is running:

- **Select a Subject**: Choose from a list of subjects like Fiction, Non-Fiction, Science, etc.
- **Select a Language**: Choose from English, Spanish, French, etc.
- **Find a Book**: Click on the 'Find a Book' button to fetch a random book based on your selections.
- **View Book Details**: If a book is found, the modal will display detailed information about the book.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](http://opensource.org/licenses/mit-license.php).

## Acknowledgments

- Google Books API for providing the book data.
- Bulma CSS for the styling framework.
- FontAwesome for providing the web icons used in the application.

## Contact

Ryan Hatton - [@HiRyanHatton](https://twitter.com/HiRyanHatton)

**Project Link**: [https://github.com/ryanhatton/reading-roulette](https://github.com/ryanhatton/reading-roulette)
