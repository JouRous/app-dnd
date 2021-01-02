import { Draggable, Droppable } from "react-beautiful-dnd";

import { ToDoItem } from '../ToDoItem';

export const ListToDo = (props) => {

  return (
    <Droppable droppableId={props.category} type='task'>
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={{ width: '250px', height: '500px' }}
        >
          {props.list.map((item, index) => {
            return (<Draggable
              key={item.id}
              draggableId={`item-${item.id}`}
              index={index}
            >
              {(provided, snapshot) => {
                return <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <ToDoItem item={item} />
                </div>
              }}
            </Draggable>)
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
