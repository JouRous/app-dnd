import { useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd';
import { ListToDo } from '../components/ListToDo';
import { reorder, moveItem } from './MoveItem';

const Todo = () => {

  const initState = {
    inProcess: [
      {
        id: 1,
        description: 'Item 1'
      },
      {
        id: 2,
        description: 'Item 2'
      },
      {
        id: 3,
        description: 'Item 3'
      },
      {
        id: 4,
        description: 'Item 4'
      },
      {
        id: 5,
        description: 'Item 5'
      }
    ],
    done: [
      {
        id: 6,
        description: 'Item 6'
      },
      {
        id: 7,
        description: 'Item 7'
      },
      {
        id: 8,
        description: 'Item 8'
      },
      {
        id: 9,
        description: 'Item 9'
      },
      {
        id: 10,
        description: 'Item 10'
      }
    ],
  }

  const [state, setState] = useState(initState);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const categories = Object.keys(initState);

    setCategories(categories);
    // eslint-disable-next-line
  }, []);



  const onDragEnd = result => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'list') {
      const newCategoriesOrder = reorder(
        categories,
        source.index,
        destination.index
      );

      setCategories(newCategoriesOrder);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );

      const newState = { ...state };
      newState[source.droppableId] = items;

      setState(newState);
    } else {
      const result = moveItem(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination
      );

      const newState = { ...state };
      newState[source.droppableId] = result[source.droppableId];
      newState[destination.droppableId] = result[destination.droppableId];

      setState(newState);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId='all-column'
        direction='horizontal'
        type='list'
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            style={{ display: 'flex' }}
          >
            {categories.map((category, index) => (
              <Draggable
                draggableId={category}
                index={index}
                key={category}
              >{(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}

                >
                  <h1 {...provided.dragHandleProps}>{category}</h1>
                  <ListToDo
                    category={category}
                    list={state[category]}
                    index={index} />
                </div>
              )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Todo;