import axios from 'axios'
const ConnectionsDetails = ({connections}) =>{
    const deleteConnection = async () => {
        // console.log("Button is clicked, and the complaint is:", complaint);
    
        try {
            const response = await axios.delete(`http://localhost:5001/connection/acceptconnection/${connections._id}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // console.log(Complaint with id: ${complaint._id} is successfully deleted);
        } catch (error) {
            console.log("Error while trying to delete");
            console.error('Error:', error);
        }
    };

    return(
        <div className="connection">
            <h3><strong>CAN Number: {connections.can}</strong></h3>
            <span><strong>Name: </strong>{connections.name}</span>
            <span><strong>Address: </strong>{connections.address}</span>
            <span><strong>City: </strong>{connections.city}</span>
            <span><strong>Pincode: </strong>{connections.pincode}</span>
            <button onClick={deleteConnection}>Accept Connection</button>
        </div>
    )
}
export default ConnectionsDetails