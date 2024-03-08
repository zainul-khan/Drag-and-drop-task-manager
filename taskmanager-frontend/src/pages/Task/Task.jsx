import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Task.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { deleteTaskApiFunc, updateTaskStatusFunc, userTasksApiFunc } from '../../api/api';
import { getConfig } from '../../services/config';
import { useDispatch, useSelector } from 'react-redux';
import { openCreateTaskModal } from '../../slices/createTaskModalSlice';
import CreateTaskModal from '../../components/Modals/CreateTaskModal';
// import Loading from '../../components/Loader/Loading';

const Task = () => {
  const config = getConfig();
  const [taskData, setTaskData] = useState([]);
  const [action, setAction] = useState(null);
  const createTaskModalState = useSelector(state => state.createTaskModalObj.isCreateTaskModalSliceModalOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await userTasksApiFunc(config);
      if (response.status === 200) {
        setTaskData(response.data.data);
      }
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };


  const handleDrop = async (event, destinationStatus) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
    const sourceStatus = event.dataTransfer.getData('status'); // Retrieve status

    // If the source status is the same as the destination status, return
    if (sourceStatus === destinationStatus) {
      console.log('Task is already in the same status.');
      return;
    }

    if (taskId) {
      try {
        const response = await updateTaskStatusFunc(taskId, destinationStatus, config);
        if (response.status === 200) {
          fetchTasks(); // Refresh tasks after successful update
        }
      } catch (error) {
        console.log('Error updating task:', error);
      }
    }
  };

  const statusValues = ['Open', 'In Progress', 'Done', 'Review', 'Closed', 'Blocked']

  return (
    <>
      {createTaskModalState && <CreateTaskModal fetchTasks={fetchTasks} action={action} />}
      <Navbar />
      <div className='page-container'>
        <Sidebar />
        <div className='page-content'>
          <div className='add-task-box'>
            <div>
              <p>Manage your tasks easily</p>
            </div>
            <div>
              <button className='add-task-btn' onClick={() => {
                setAction('CreateTask');
                dispatch(openCreateTaskModal());
              }}>+ Add Task</button>
            </div>
          </div>
          <div className='card-container scrollbar-style'>
            {statusValues.map(status => (
              <Section key={status} status={status} taskData={taskData}  fetchTasks={fetchTasks} handleDrop={handleDrop} setAction={setAction} dispatch={dispatch} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ status, taskData, handleDrop, setAction, dispatch, fetchTasks }) => {
  const filteredTasks = taskData.filter(task => task.status === status);

  const handleDragOver = event => {
    event.preventDefault();
  };


  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('taskId', taskId);
    event.dataTransfer.setData('status', status); // Attach status to dataTransfer
  };

  const openUpdateTaskModal = (task) => {
    console.log('task', task);
    setAction('UpdateTask');
    dispatch(openCreateTaskModal(task));
  };

  const handleDelete = async (id) => {
    const config = getConfig();

    try {
      
      const response = await deleteTaskApiFunc(id, config);
     
      if (response.status === 200) {
        fetchTasks();
      }

    } catch (error) {

      console.log("error=>", error);
    }
  }

  return (
    //This div is a column rendered
    <div style={{ marginLeft: '14px', width: '200px', overflowY: 'auto', overflowX: 'hidden' }} className='scrollbar-style' onDragOver={handleDragOver} onDrop={event => handleDrop(event, status)}>
      <h2 className='card-heading'>{status}</h2>
      {filteredTasks.map(task => (
        //This div represents card in a column
        <div
          key={task._id}
          className='card-body scrollbar-style'
          draggable
          onDragStart={event => handleDragStart(event, task._id)}
          style={{position:'relative'}} 
        >
          <div style={{ color: '#ffffff', fontSize: '20px', margin: '4px 0 8px' }} >{task.name} </div>
          <span style={{position:'absolute', top:'4px', right:'6px', cursor: 'pointer'}} onClick={()=> {handleDelete(task._id)}}>🗑️</span>
          <div style={{ color: '#ffffff', fontSize: '16px' }}>{task.description}</div>
          <div style={{ color: '#ffffff', fontSize: '16px', margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
            <div> 🕐 {task.priority}</div>
            <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => { openUpdateTaskModal(task) }}>✏️</div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Task;