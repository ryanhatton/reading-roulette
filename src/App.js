import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 class="title is-1">Pick A Book</h1>
        <p class="subtitle is-3"> A project to help you find your next book.</p>
        <div>
        <input
          class="input is-large"
          type="text"
          placeholder="Large 
        input"/>
        <button className="button is-primary">Find a book!</button>
      </div>
      </header>

      <footer class="footer">
        <div class="content has-text-centered">
        <p>
          <strong>Pick A Book</strong> by <a href="https://ryanhatton.net">Ryan Hatton</a>.
          The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >CC BY NC SA 4.0</a
          >.
        </p>
      </div>
</footer>
    </div>
  );
}

export default App;
