import './ToDoItem.scss';

export const ToDoItem = (props) => {

  const { item } = props;

  return (
    <div className='todo-item'>
      {item.description}
    </div>
  );
}