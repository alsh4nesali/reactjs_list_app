import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card } from 'primereact/card';
import Navigation from './Navigation';
import '../App.css'; // Your custom styles

// Dummy tasks
const initialTasks = [
  { id: '1', content: 'Task 1' },
  { id: '2', content: 'Task 2' },
  { id: '3', content: 'Task 3' },
  { id: '4', content: 'Task 4' },
];

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Handle drag end
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedItem);

    setTasks(newTasks);
  };

  return (
    <>
        <Navigation/>
        <div className="Dashboard">
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
            {(provided) => (
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="task-list"
                >
                {/* Draggable Items */}
                {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        <Card title={`Task ${task.id}`} className="task-card">
                            <p>{task.content}</p>
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
