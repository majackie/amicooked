import axios from "axios";

const token = localStorage.getItem("token");
// console.log("token "+token)

export const updatePoints = async (user_id, topic_id, new_points) => {
    const data = {
        userid: parseInt(user_id),
        topicid: parseInt(topic_id),
        points: parseInt(new_points)
    }

    try {
        const response = await axios.post(`http://127.0.0.1:5000/update_points`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log(response.data)
    } catch (error) {
        console.error("Error updating points:", error);
    }
}

export const completeLesson = async (user_id, topic_id) => {
    const data = {
        userid: parseInt(user_id),
        topicid: parseInt(topic_id)
    }
    try {
        const response = await axios.post(`http://127.0.0.1:5000/complete_lesson`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log(response.data)
    } catch (error) {
        console.error("Error completing lesson:", error);
    }
}

export const getLessonStatus = async (user_id, topic_id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/get_lesson_status/${user_id}/${topic_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.lesson_status
    } catch (error) {
        console.error("Error getting lesson status:", error);
    }
}

export const handleFinishLesson = (user_id, topic_id, points) => {

    const fetchStatus = async () => {
        try {
            console.log("fetching status...")
            const status = await getLessonStatus(user_id, topic_id)
            console.log('@@@ lesson status: '+status)
            if (!status)
            {
                updatePoints(user_id, topic_id, points)
                completeLesson(user_id, topic_id)
            }
            else
            {
                console.log('lesson is already completed. Finishing.')
            }

        } catch (error) {
            console.error("Error fetching lesson:", error);
        }
    }
    fetchStatus();
}