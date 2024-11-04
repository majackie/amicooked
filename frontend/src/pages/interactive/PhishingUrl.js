import Navbar from "../../shared/Navbar";
import "../../style/PhishingUrl.css"

function PhisingUrl() {
    return (
        <div className="PhishingUrl">
            <Navbar type={"default"} />
            <div className="PhishingUrl-body">
                {/* <img src={ScamAlert} className="Scam-alert" alt="scam-alert"/> */}
                <div className="Scam-alert">
                    <h1><b>! SCAM ALERT</b></h1>
                </div>
                <h2>Dangerous site</h2>
                <p>Attackers on the site the you're trying to visit might trick you into installing software or revealing your senstive information. We strongly recommend that you never click on any links before verifying them.</p>
                <p>By entering a site like this, your machine may have already been infected with malware embedded in the url.</p>
            </div>
        </div>

    );
}

export default PhisingUrl;