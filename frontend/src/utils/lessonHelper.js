import axios from "axios";

// Helper functions to help with Lesson-related pages

const token = localStorage.getItem("token");

// Update new points to a topic when a user completes a lesson
export const updatePoints = async (user_id, topic_id, new_points) => {
    try {
        const data = {
            userid: parseInt(user_id),
            topicid: parseInt(topic_id),
            points: parseInt(new_points)
        }

        const response = await axios.post(`http://127.0.0.1:5000/update_points`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    } catch (error) {
        console.error("Error updating points:", error);
    }
}

// Completes a lesson
export const completeLesson = async (user_id, topic_id) => {
    try {
        const data = {
            userid: parseInt(user_id),
            topicid: parseInt(topic_id)
        }
    
        const response = await axios.post(`http://127.0.0.1:5000/complete_lesson`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    } catch (error) {
        console.error("Error completing lesson:", error);
    }
}

// Gets the current status of a lesson
// True for completed, else false.
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

// Handles finished lessons
export const handleFinishLesson = (user_id, topic_id, points) => {

    const fetchStatus = async () => {
        try {
            console.log("fetching status...")
            const status = await getLessonStatus(user_id, topic_id)
            if (!status)
            {
                updatePoints(user_id, topic_id, points)
                completeLesson(user_id, topic_id)
            }
            else
            {
                console.log('Lesson is already completed. Finishing.')
            }

        } catch (error) {
            console.error("Error fetching lesson:", error);
        }
    }
    fetchStatus();
}