import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../style/Tips.css"
import { Carousel } from '@trendyol-js/react-carousel';
import Button from "../shared/Button"
import Navbar from "../shared/Navbar"
import HtmlRenderer from "../shared/HtmlRenderer";
import { TipColor } from "../shared/TipColor";
import Loading from "../pages/Loading"

function Tips() {
    const { topicId } = useParams();
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        console.log("fetching data for topicId="+topicId)
        setLoading(true)
        const fetchTips = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/tips/${topicId}`);
                setTips(response.data)
            } catch (error) {
                console.error("Error fetching tips:", error);
            } finally {
                setLoading(false)
            }
        };

        if (topicId)
        {
            fetchTips();
        }

    }, [topicId]);

    if (loading)
    {
        return <><Loading /></>
    }

    // TODO - Billy: Find a way to reload the tips data.
    // Check out https://chatgpt.com/share/6735bf07-df48-800e-b200-254206d99fea
    return (
        <div className="Tips">
            <Navbar />
            <div className="Tips-body">
            <h2>TIPS</h2>
            {tips[0] && (
                <>
                <h3 >{tips[0]["topicname"]}</h3>
                <Carousel className="Carousel" show={1} slide={1} swiping={true} leftArrow={<Button theme="round">{'<'}</Button>} rightArrow={<Button theme="round">{'>'}</Button>}>
                    {tips.map((tip, index) => {
                        return (
                            <div className="Carousel-item"key={index} style={{ padding: '20px', backgroundColor: TipColor[Math.floor(Math.random() * 16)] }}><h3>{index+1}</h3><HtmlRenderer htmlString={tip.tipcontent}/></div>
                        )
                    })}
                </Carousel>
                </>
            )}
            </div>
        </div>
    );
}

export default Tips;