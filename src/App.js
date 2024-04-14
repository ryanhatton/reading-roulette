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
        
        <button className="button is-primary">Find a book!</button>
      </div>
      </header>
    </div>
  );
}

export default App;
