import {useState, useEffect} from 'react'
import ComplaintDetails from './ComplaintDetails'


const Complaints = () =>{
  const [complaints, setComplaints] = useState(null)
useEffect(() => {
  const fetchComplaints = async () =>{
    const response = await fetch('api/complaints')
    const json = await response.json()

    if (response.ok){
      setComplaints(json)

    }
  }
  fetchComplaints()

},[])

return (
  <div className="home">
    <div className="allComplaints">
      {complaints && complaints.map(item => (
        <ComplaintDetails complaint={item} key={item.id}/>
        ))}
    </div>
  </div>
)
      }
export default Complaints