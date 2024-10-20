import Navigation from "./Navigation"
import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { createTask } from "../API/apiService";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-blue/theme.css';  // Choose a theme
import 'primereact/resources/primereact.min.css';                 // Core PrimeReact CSS
import 'primeicons/primeicons.css';                               // PrimeIcons for icons

 
import "./static/Create.css"
function Create() {
    const [task, setTask] = useState<string>('');
    const [taskDate, setDate] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [user_id, setUserId] = useState<number>(1);
    // const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const toast = useRef<Toast | null>(null);

    const onSuccess = () =>{
        if (toast.current){
            toast.current.show({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Task created successfully',
                life: 3000
            });
        }
        setTask('');
        setStatus('');
        setDescription('');
    }
    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setUserId(parseInt(userId as string));
        createTask(task, status, description, taskDate,user_id)
        .then((response) => {
            console.log(response);
            onSuccess();
        })
        .catch((eror) => {
            console.log(eror);
        })

    }

    return (
    <>
    <div className="bg-dark vh-100">
        <Navigation/>
        <Toast ref={toast} />
        <div className="bg-white container mt-5 p-4 fw-bold shadow-lg">
        <h1 className="mb-5 text-center">Schedule Task</h1>
            <div className="d-flex justify-content-center align-items-center">
                <form className="row g-3" onSubmit={handleOnSubmit}>
                    <div className="col-md-6 p-2">
                        <label  className="form-label">Task Name</label>
                        <input 
                        required 
                        type="text" 
                        value={task}
                        onChange={(e) => 
                        setTask(e.target.value)} 
                        className="form-control" 
                        id="inputEmail4"/>
                    </div>
                    <div className="col-md-6 p-2">
                        <label  className="form-label" >Project Status</label>
                        <select 
                        required 
                        className="form-select"
                        value={status} 
                        onChange={(e) => 
                        setStatus(e.target.value)}>
                            <option selected disabled>Choose Status</option>
                            <option value="1">Project Not Started</option>
                            <option value="2">Project In Progress</option>
                            <option value="3">Project Completed</option>
                        </select>
                    </div>
                    <div className="col-md-16 p-2">
                        <label className="form-label">Project Date</label>
                        <input 
                            type="date" 
                            className="form-control"
                            onChange={(e) => setDate(e.target.value)}
                            value={taskDate} 
                        />
                    </div>
                    <div className="col-12 p-2">
                        <label className="form-label">Description</label>
                        <textarea 
                        required 
                        className="form-control" 
                        value={description}
                        onChange={(e) => 
                        setDescription(e.target.value)
                        }></textarea>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary float-end">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
    )
  }
  
  export default Create
  