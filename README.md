# Reading Roulette

Reading Roulette is a React-based web application that allows users to randomly select a book based on subject and language. The application integrates with the Google Books API to fetch book details and offers a user-friendly interface with filtering options.

## Features

- Search for books by subject and language.
- Filter search results with custom keywords.
- View detailed book information in a modal window.
- Responsive design implemented using Bulma CSS framework.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v12.x or newer recommended).
- npm or Yarn as package managers.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ryanhatton/reading-roulette.git
cd reading-roulette
npm install
```

## Usage

To start the application locally, run:

```bash
npm start
```
This will launch the application on http://localhost:3000. Navigate to this URL in your web browser to use the application.



Once the application is running:

- **Select a Subject**: Choose from a list of subjects like Fiction, Non-Fiction, Science, etc.
- **Select a Language**: Choose from English, Spanish, and French.
- **Select a Keyword**: Add an additional keyword to refine the book search output.
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

## Acknowledgments & Credits

- Google Books API for providing the book data.
- Bulma CSS for the styling framework.
- FontAwesome for providing the web icons used in the application.
- The project utilizes axios for API calls and lodash for utility functions.

## Contact

Ryan Hatton - [@HiRyanHatton](https://twitter.com/HiRyanHatton)

**Project Link**: [https://github.com/ryanhatton/reading-roulette](https://github.com/ryanhatton/reading-roulette)
