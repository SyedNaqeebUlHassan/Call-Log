import React, { useEffect,useState } from 'react'
import postServices from '../Services/postServices'
import Header from './Header'
function Home() {
    const [data,SetData]=useState([]);
    const [calls,setCalls]=useState([]);
    const [context,SetContext]=useState("");
    useEffect(()=>{
        postServices.getCalls().then((response)=>{
            console.log(response.data)
            setCalls(response.data.nodes)
        },
        (error)=>{
            console.log(error);
        }
        )
    },[])

    const getArcheive=(is_Archeive)=>{
       if(is_Archeive===true){
        return <p style={{color:"#00FA9A"}}>Archeived</p>
       }
       else if(is_Archeive===false){
        return <p>UnArcheived</p>
       }
    }
    const setSeconds=(duration)=>{
        const seconds=duration;
        const minutes=Math.floor(seconds/60);
        const remaingSeconds=seconds%60;
        return(
            <p style={{color:'black'}}>{minutes} minutes {remaingSeconds} seconds</p>
        )
    }

    const callType=(Call_Type)=>{
    if(Call_Type==="missed"){
        return (<p style={{color:'red'}}>Missed</p>)
    }
    else if(Call_Type==="answered"){
        return (<p style={{color:'green'}}>Answered</p>)
    }
    else if(Call_Type==="voicemail"){
        return (<p style={{color:'blue'}}>Voice Mail</p>)
    }
    }

    const latterUpperCase=(Call_Direction)=>{
        const str=Call_Direction;
        const str2=str.charAt(0).toUpperCase()+str.slice(1);
        return(<p>{str2}</p>)
    }

    const setDate=(Created_at)=>{
        const str=Created_at;
        const str2=str.slice(0,10);
        return(<p>{str2}</p>)
    }

   const handleClick=(id,call_Type,duration,from,to,via)=>{
        console.log(duration,id,call_Type,from,to);
        SetData({duration:duration,id:id,call_Type:call_Type,from:from,to:to,via:via});
    }
    
    const handleSave=(e)=>{
        e.preventDefault();
        console.log(context);
        try{
            postServices.postNotes(data.id,context).then((response)=>console.log(response.data))
        } catch(error){
            console.log(error);
        }
    }
  return (
    <div>
     <Header/>
       <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Call Type</th>
                    <th scope="col">Direction</th>
                    <th scope="col">Duration</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Via</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Archeive</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            {calls.map((call,i)=>(
                <tbody key={i}>
                    <tr>
                        <td>{callType(call.call_type)}</td>
                        <td style={{color:"blue"}}>{latterUpperCase(call.direction)}</td>
                        <td style={{color:'blue'}}>{setSeconds(call.duration)} ({call.duration} seconds)</td>   
                        <td>{call.from}</td>
                        <td>{call.to}</td>
                        <td>{call.via}</td>
                        <td>{setDate(call.created_at)} </td>
                        <td>{getArcheive(call.is_archived)}</td>
                        <td><button 
                        onClick={()=>{
                            handleClick(call.id,call.call_type,call.duration,call.from,call.to,call.via);
                        }} 
                        type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Add Note</button></td>                           
                    </tr>    
                </tbody>
            ))}
       </table>    

                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add Notes</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p style={{color:'blue'}}>Call ID {data.id}</p>
                            <div>
                                <p style={{display:'flex',whiteSpace:'pre'}}>Call Type: {callType(data.call_Type)}</p>
                                <p style={{display:'flex',whiteSpace:'pre'}}>Duration: {setSeconds(data.duration)}</p>
                                <p>From: {data.from}</p>
                                <p>To: {data.to}</p>
                                <p>Via: {data.via}</p>
                            </div>
                            <div>
                                <p>Notes</p>
                                <input
                                style={{height:"50px",width:"400px"}}
                                type='text'
                                placeholder='Notes'
                                value={context}
                                onChange={(e)=>SetContext(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={handleSave} type="button" class="btn btn-primary">Save</button>
                        </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default Home