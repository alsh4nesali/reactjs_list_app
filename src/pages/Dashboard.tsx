import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card } from 'primereact/card';
import Navigation from './Navigation';
import '../tailwind.css';
import '../App.css';
import { fetchList, saveListOrder } from '../API/apiService';

const Dashboard: React.FC = () => {
  const [filteredList, setFilteredList] = useState<any[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchList();
        setFilteredList(fetchedTasks.filter((task: { status: number }) => task.status !== 3)); // Filter tasks to exclude completed ones
      } catch (err) {
        console.error(err);
      }
    };
  
    loadTasks();
  }, []); 
  
  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const updatedList = Array.from(filteredList);
    const [movedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, movedItem);

    setFilteredList(updatedList); // Update the filtered list

    try {
      await saveListOrder(updatedList);
      const refreshedTasks = await fetchList();
      setFilteredList(refreshedTasks.filter((task: { status: number; }) => task.status !== 3)); 
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="Dashboard flex flex-col items-center py-6 bg-gray-100">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-md"
              >
                <Card title="Your Tasks" className="p-3 bg-gray-200">
                  {filteredList.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card 
                            title={`${item.task}`} 
                            className="items-card flex flex-col gap-2 p-4 m-2 bg-blue-100 hover:bg-blue-200 transition-colors"
                          >
                            <p className="text-sm text-gray-600">Date added: {item.date_added}</p>
                            {item.status === 1 ? (
                              <p className="text-blue-600 font-bold">Project Not Started</p>
                            ) : item.status === 2 ? (
                              <p className="text-red-600 font-bold">Project In-Progress</p>
                            ) : (
                              <p className="text-green-600 font-bold">Project Completed</p>
                            )}
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Card>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Dashboard;
