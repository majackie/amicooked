import axios from "axios";

export const updatePoints = async (user_id, topic_id, new_points) => {
    try {
        const response = await axios.post(`http://127.0.0.1:5000/update_points`, {
            userid: parseInt(user_id),
            topicid: parseInt(topic_id),
            points: parseInt(new_points),
        });
        console.log(response.data)
    } catch (error) {
        console.error("Error updating points:", error);
    }
}

export const completeLesson = async (user_id, topic_id) => {
    try {
        const response = await axios.post(`http://127.0.0.1:5000/complete_lesson`, {
            userid: parseInt(user_id),
            topicid: parseInt(topic_id),
        });
        console.log(response.data)
    } catch (error) {
        console.error("Error completing lesson:", error);
    }
}

export const getLessonStatus = async (user_id, topic_id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/get_lesson_status`, {
            userid: parseInt(user_id),
            topicid: parseInt(topic_id),
        });
        console.log(response.data)
    } catch (error) {
        console.error("Error getting lesson status:", error);
    }
}

export const handleFinishLesson = (user_id, lesson_id, points) => {
    console.log('lesson status: '+getLessonStatus(user_id, lesson_id))
    if (getLessonStatus(user_id, lesson_id))
    {
        updatePoints(user_id, lesson_id, points)
        completeLesson(user_id, lesson_id)
    }
    else
    {
        console.log('lesson is already completed... skipped')
    }
    
}