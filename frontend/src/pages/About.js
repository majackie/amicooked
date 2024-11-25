import { useNavigate } from 'react-router-dom';
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
import '../style/About.css';
import team from '../asset/team.png';

function About() {
    const navigate = useNavigate();
    return (
        <div className="About">
            <Navbar type={"default"} />
            <div className="Body">
				<p>Meet the cooks!</p>
				<img src={team} className="team" alt="team" />
				<Button theme="primary" onClick={() => window.location.href = 'https://github.com/majackie/amicooked'}>Source Code</Button>
            </div>
        </div>
    )
}

export default About;
