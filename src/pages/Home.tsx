import Navigation from "./Navigation"
import { useEffect,useState } from "react"
import { deleteTask, fetchList } from "../API/apiService"
import 'bootstrap-icons/font/bootstrap-icons.css'
import './static/Create.css'
import TaskDialog from "../components/Dialog"
import InfoDialog from "../components/InfoDialog"
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Home() {
    const [taskId, setTaskId] = useState<number | null>(null);
    const [list, setList] = useState<any[]>([]);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [infoDialog, setInfoDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await fetchList();
                setList(fetchedTasks);
                console.log(list);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);
    
    if (loading) {
        return (
            <div className="text-center mt-5 ">
                <ProgressSpinner 
                strokeWidth="8" 
                fill="var(--surface-ground)" 
                animationDuration="5s" />    
                <h5>Loading tasks...</h5>
             </div>
        ); 
    }


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

                <DataTable value={list.filter(item => item.status !== 5)} className="table" paginator rows={5} responsiveLayout="scroll">
                    <Column field="id" header="ID" sortable />
                    <Column field="task" header="Task Name" body={(rowData) => (
                        <a href="#" onClick={() => showInformation(rowData.id)} className="fw-bold text-decoration-none">{rowData.task}</a>
                    )} />
                    <Column field="status" header="Project Status" body={(rowData) => (
                        rowData.status === 1 ? (
                            <span className="text-primary fw-bold">Project Not Started</span>
                        ) : rowData.status === 2 ? (
                            <span className="text-danger fw-bold">Project In Progress</span>
                        ) : (
                            <span className="text-success fw-bold">Project Completed</span>
                        )
                    )} />
                    <Column field="date_added" header="Date Added" />
                    <Column field="description" header="Project Description" />
                    <Column body={(rowData) => (
                        <div>
                            <button className="btn btn-primary"><i className="bi bi-pencil"></i></button>
                            <button className="btn btn-danger" onClick={() => onConfirmDelete(rowData.id)}><i className="bi bi-trash"></i></button>
                        </div>
                    )} />
                </DataTable>

            </div>
        </div>

        <TaskDialog
                title="Confirm Deletion"
                message="Are you sure you want to proceed?"
                isVisible={deleteDialogVisible}
                onClose={hideDialog}
                onConfirm={handleOnDelete}
                >
                <p>Are you sure you want to delete this task?</p>
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
                        <p className="fs-5">Date added: {item.date_added}</p>
                        <hr></hr>
                        <p className="fs-5">Status: {item.status}</p>
                        <p className="fs-6">Description: <br></br>{item.description}</p>
                    </div>

                    ))
                }
        </InfoDialog>               
    </>

  )
}

export default Home
