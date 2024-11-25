<<<<<<< HEAD
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
 
=======
import { useNavigate } from 'react-router-dom';
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
import '../style/Home.css';

function Home() {
    const navigate = useNavigate();
    return (
        <div className="Home">
            <Navbar type={"default"} />
            <div className="Body">
                <Button theme="primary" onClick={() => navigate('/login')}>Login</Button>
                <Button theme="primary" onClick={() => navigate('/signup')}>Signup</Button>
				<Button theme="primary" onClick={() => navigate('/about')}>About</Button>
            </div>
        </div>
    )
}

export default Home;
>>>>>>> Develop
