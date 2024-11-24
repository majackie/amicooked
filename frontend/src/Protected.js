import React, { useEffect, useState } from "react";
import axios from "axios";

const Protected = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/protected", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                alert("Access denied");
            }
        };

        fetchData();
    }, []);

    return <div>{data ? `Welcome ${data.logged_in_as}` : "Loading..."}</div>;
};

export default Protected;
