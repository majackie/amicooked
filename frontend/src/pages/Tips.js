import AppHeader from "../shared/AppHeader"
import "../style/Tips.css"
import { Carousel } from '@trendyol-js/react-carousel';
import Button from "../shared/Button"

function Tips(props) {
    return (
        <div className="Tips">
            <AppHeader />
            <div className="Tips-body">
            <Carousel show={1} slide={1} swiping={true} leftArrow={<Button theme="round">{'<'}</Button>} rightArrow={<Button theme="round">{'>'}</Button>}>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#ffddc1' }}>Tip 1</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#c2f0c2' }}>Tip 2</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#c2e9fb' }}>Tip 3</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#f6d6ad' }}>Tip 4</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#d9e3f0' }}>Tip 5</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#e0f7fa' }}>Tip 6</div>
            </Carousel>
            </div>
        </div>
    );
}

export default Tips;