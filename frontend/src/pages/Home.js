import logo from '../asset/logo.png';
import '../style/Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-name">
          amicooked
        </p>
      </header>
    </div>
  );
}

export default Home;
 