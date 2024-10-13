import Navigation from "./Navigation"
import { useEffect,useState } from "react"
import { deleteTask, fetchList } from "../API/apiService"
import 'bootstrap-icons/font/bootstrap-icons.css'
import './static/Create.css'
import TaskDialog from "../components/Dialog"
import InfoDialog from "../components/InfoDialog"

function Home() {
    const [taskId, setTaskId] = useState<number | null>(null);
    const [list, setList] = useState<any[]>([]);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [infoDialog, setInfoDialog] = useState(false);
    useEffect(() => {
        fetchList()
        .then((data) => {
            setList(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const onConfirmDelete = (id: number) =>{
        setTaskId(id);
        setDeleteDialogVisible(true);
    }

    const showInformation = (id: number) =>{
        setTaskId(id);
        setInfoDialog(true);
    }

    

    const handleOnDelete = () =>{
        if(taskId !== null){
            deleteTask(taskId)
            .then(() =>{
                console.log("Task deleted successfully");
                setList(list.filter((item) => item.id !== taskId));
                setDeleteDialogVisible(false);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    const hideDialog = () =>{
        setDeleteDialogVisible(false);
    }

    const hideInfoDialog = () =>{
        setInfoDialog(false);
    }

  return (
    <>
        <Navigation />
        <div className="">
            
            <div className="bg-dark text-white">
                <h1 className='text-center p-4 fs-2'>Task Overview</h1>

                <table className="table table-secondary table-hover text-center p-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Project Status</th>
                        <th scope="col">Project Description</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        list
                        .filter((item) => item.status != 5)
                        .map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><a href="#" onClick={() => showInformation(item.id)} className="fw-bold text-decoration-none">{item.task}</a></td>
                                        {
                                            item.status == 1 ? (
                                                <td className="text-primary fw-bold">Project Not Started</td>
                                            ) : item.status == 2 ? (
                                                <td className="text-danger fw-bold">Project In Progress</td> 
                                            ) : (
                                                <td className="text-success fw-bold">Project Completed</td>
                                            )
                                        }
                                    <td>{item.description}</td>
                                    <td>
                                        <button className="btn btn-primary"><i className="bi bi-pencil"></i></button>
                                        <button className="btn btn-danger" onClick={() => onConfirmDelete(item.id)}><i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                        ))
                    }
                    </tbody>

                    
                </table>
            </div>
        </div>

        <TaskDialog
                title="Confirm Deletion"
                message="Are you sure you want to proceed?"
                isVisible={deleteDialogVisible}
                onClose={hideDialog}
                onConfirm={handleOnDelete}
                >
                <p>Are you sure you want to delete this Task?</p>
        </TaskDialog>

        <InfoDialog
                title="Task Information"
                message="Are you sure you want to proceed?"
                isVisible={infoDialog}
                onClose={hideInfoDialog}
                >
                {
                    list.filter((item) => item.id == taskId).map((item) => (
                    <div>
                        <p className="fs-5">{item.task}</p>
                        <p className="fs-6">{item.description}</p>
                    </div>

                    ))
                }
        </InfoDialog>               
    </>

  )
}

export default Home
