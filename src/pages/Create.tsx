import Navigation from "./Navigation";
import { useRef, useState } from "react";
import { createTask } from "../API/apiService";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-blue/theme.css';  // Choose a theme
import 'primereact/resources/primereact.min.css';                 // Core PrimeReact CSS
import 'primeicons/primeicons.css';                               // PrimeIcons for icons

import "./static/Create.css";

function Create() {
    const [task, setTask] = useState<string>('');
    const [taskDate, setDate] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [user_id, setUserId] = useState<number>(1);
    const userId = localStorage.getItem('userId');
    const toast = useRef<Toast | null>(null);

    const onSuccess = () => {
        if (toast.current) {
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
    };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setUserId(parseInt(userId as string));
        createTask(task, status, description, taskDate, user_id)
        .then((response) => {
            console.log(response);
            onSuccess();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <div className="bg-gray-200 min-h-screen">
                <Navigation />
                <Toast ref={toast} />
                <div className="bg-white container mx-auto mt-5 p-8 shadow-lg rounded-lg">
                    <h1 className="mb-5 text-2xl text-center font-bold">Schedule Task</h1>
                    <div className="flex justify-center items-center">
                        <form className="w-full max-w-lg" onSubmit={handleOnSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Task Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)} 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="taskName" 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Project Status</label>
                                <select 
                                    required 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="" disabled>Choose Status</option>
                                    <option value="1">Project Not Started</option>
                                    <option value="2">Project In Progress</option>
                                    <option value="3">Project Completed</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Project Date</label>
                                <input 
                                    type="date" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={taskDate} 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea 
                                    required 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Create;
