const ComplaintDetails = ({complaint}) =>{

    return(
        <div className="complaint-details">
        <h4>{complaint.name}</h4>
        <p><strong>houseid: </strong>{complaint.houseid}</p>
        <p><strong>email: </strong>{complaint.email}</p>
        <p><strong>mobile</strong>{complaint.mobile}</p>
        <p>{complaint.createdAt}</p>
        </div>
    )
}
export default ComplaintDetails