import logo from '../asset/logo.png';
import '../style/Loading.css';

/**
 * A Loading component to be used during waits and data fetches.
 */
function Loading() {
  return (
    <div className="Loading">
      <header className="Loading-header">
        {/* Spinning amicooked logo */}
        <img src={logo} className="App-logo-loading" alt="logo" />
        <h3 className="App-name">
          Loading...
        </h3>
      </header>
    </div>
  );
}

export default Loading;
 