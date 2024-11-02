import Navigation from "./Navigation";
import { useEffect, useRef, useState } from "react";
import { deleteTask, fetchList } from "../API/apiService";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './static/Create.css';
import TaskDialog from "../components/Dialog";
import InfoDialog from "../components/InfoDialog";
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

function Home() {
    const [taskId, setTaskId] = useState<number | null>(null);
    const [list, setList] = useState<any[]>([]);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [infoDialog, setInfoDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useRef<Toast | null>(null);

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        const hasShownToast = localStorage.getItem('hasShownToast'); 

        if (auth === 'true' && hasShownToast !== 'true') { 
            if (toast.current) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Welcome',
                    life: 3000,
                });
                localStorage.setItem('hasShownToast', 'true'); 
            }
        }
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await fetchList();
                setList(fetchedTasks);
                console.log(fetchedTasks);
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
            <div className="flex flex-col items-center mt-5">
                <ProgressSpinner 
                    strokeWidth="8" 
                    fill="var(--surface-ground)" 
                    animationDuration="5s" />    
                <h5 className="mt-2">Loading tasks...</h5>
            </div>
        ); 
    }

    const onConfirmDelete = (id: number) => {
        setTaskId(id);
        setDeleteDialogVisible(true);
    };

    const showInformation = (id: number) => {
        setTaskId(id);
        setInfoDialog(true);
    };

    const handleOnDelete = () => {
        if (taskId !== null) {
            deleteTask(taskId)
            .then(() => {
                console.log("Task deleted successfully");
                setList(list.filter((item) => item.id !== taskId));
                setDeleteDialogVisible(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    const hideDialog = () => {
        setDeleteDialogVisible(false);
    };

    const hideInfoDialog = () => {
        setInfoDialog(false);
    };

    return (
        <>
            <Navigation />
            <Toast ref={toast} />
            <div className="">
                <DataTable value={list.filter(item => item.status === 3)} className="mx-auto" paginator rows={5} responsiveLayout="scroll">
                    <Column field="id" header="ID" sortable />
                    <Column field="task" header="Task Name" body={(rowData) => (
                        <a href="#" onClick={() => showInformation(rowData.id)} className="font-bold text-blue-500 hover:text-blue-800">{rowData.task}</a>
                    )} />
                    <Column field="status" header="Project Status" body={(rowData) => (
                        rowData.status === 1 ? (
                            <span className="text-blue-400 font-bold">Project Not Started</span>
                        ) : rowData.status === 2 ? (
                            <span className="text-red-500 font-bold">Project In-Progress</span>
                        ) : (
                            <span className="text-green-500 font-bold">Project Completed</span>
                        )
                    )} />
                    <Column field="date_added" header="Date Added" />
                    <Column field="description" header="Project Description" />
                    <Column body={(rowData) => (
                        <div className="flex space-x-2">
                            <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => onConfirmDelete(rowData.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    )} />
                </DataTable>
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
                message="Task Details"
                isVisible={infoDialog}
                onClose={hideInfoDialog}
            >
                {
                    list.filter((item) => item.id === taskId).map((item) => (
                        <div key={item.id} className="text-left">
                            <p className="text-lg">Date added: {item.date_added}</p>
                            <hr className="my-2" />
                            <p className="text-lg">Task title: {item.task}</p>
                            <p className="text-lg">Status: {item.status}</p>
                            <p className="text-base">Description: <br />{item.description}</p>
                        </div>
                    ))
                }
            </InfoDialog>               
        </>
    );
}

export default Home;
