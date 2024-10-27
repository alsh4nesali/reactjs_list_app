import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card } from 'primereact/card';
import Navigation from './Navigation';
import '../tailwind.css'; // Your custom styles
import '../App.css';
import { fetchList } from '../API/apiService';


const Dashboard: React.FC = () => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchList();
        setList(fetchedTasks);
      } catch (err) {
        console.error(err);
      }
    };

    loadTasks();
  }, []);

  // Handle drag end
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedList = Array.from(list);
    const [movedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, movedItem);


    setList(updatedList);
    console.log(updatedList);
  };

  const filteredList = list.filter(item => item.status !== 3);

  return (
    <>
      <Navigation />
      <div className="Dashboard">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="items-list mx-auto p-4 bg-secondary"
              >
                {filteredList.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card title={`${item.task}`} className="items-card flex flex-col gap-2 m-2">
                          <p>Date added: {item.date_added}</p>
                          {item.status === 1 ? (
                            <p className="text-primary fw-bold">Project Not Started</p>
                          ) : item.status === 2 ? (
                            <p className="text-danger fw-bold">Project In-Progress</p>
                          ) : (
                            <p className="text-red fw-bold">Project Completed</p>
                          )}
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Dashboard;
