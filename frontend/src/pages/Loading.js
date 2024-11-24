import logo from '../asset/logo.png';
import '../style/Loading.css';

function Loading() {
  return (
    <div className="Loading">
      <header className="Loading-header">
        <img src={logo} className="App-logo-loading" alt="logo" />
        <h3 className="App-name">
          Loading...
        </h3>
      </header>
    </div>
  );
}

export default Loading;
 