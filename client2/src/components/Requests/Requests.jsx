import { useEffect, useState } from "react";
import axios from "axios";
import ConnectionsDetails from "./RequestDetails";

const ReceivedConnections = () => {
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const response = await axios.get('http://localhost:5001/connection/receivedconnections');
                setConnections(response.data); // Assuming the data you need is in the 'data' property of the response
                console.log("Connections fetched succesfully");
                console.log(response.data);
            } catch (error) {
                console.log("Error while fetching data:", error);
            }
        };

        fetchConnections();
    }, []);

    return (
        <div className="admin-connections">
            <h3>Connections Received</h3>
            {connections && connections.map(item => (
                <ConnectionsDetails connections={item} key={item.id} />
            ))}
        </div>
    );
};

export default ReceivedConnections;