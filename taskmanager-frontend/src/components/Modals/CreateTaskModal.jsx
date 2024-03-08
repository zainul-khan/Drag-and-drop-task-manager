import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeCreateTaskModal } from '../../slices/createTaskModalSlice';
import './CreateTaskModal.css';
import { createTaskApiFunc, updateTaskApiFunc } from '../../api/api';
import { getConfig } from '../../services/config';
import { useSelector } from 'react-redux';


const CreateTaskModal = ({ fetchTasks, action }) => {
  // console.log("action", action);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const taskStateData = useSelector(state => state.createTaskModalObj.taskDets);
  console.log('taskStateData', taskStateData);
  const [error, setError] = useState('');
  const [createTaskData, setcreateTaskData] = useState({
    name: '',
    description: '',
    status: '',
    priority: ''
  });

  const [updateTaskData, setUpdateTaskData] = useState({
    id: taskStateData?._id,
    name: taskStateData?.name,
    description: taskStateData?.description,
    status: taskStateData?.status,
    priority: taskStateData?.priority
  });

  const config = getConfig();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(closeCreateTaskModal());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);


  const handleChange = (e) => {
    try {

      const { name, value } = e.target;
      console.log(name, value);

      if (action === 'CreateTask') {
        setcreateTaskData(prev => ({ ...prev, [name]: value }));
      } else {
        setUpdateTaskData(prev => ({ ...prev, [name]: value }));
      }


    } catch (error) {
      console.log("error=>", error);
    }
  }

  // const handleFormSubmit = async (e) => {
  //   console.log('formSubmiited');
  //   e.preventDefault();
  //   try {

  //     let id, name, description, status, priority;

  //     if (action === 'CreateTask') {
  //       name = createTaskData.name;
  //       description = createTaskData.description;
  //       status = createTaskData.status;
  //       priority = createTaskData.priority;
  //     } else {
  //       id = updateTaskData.id,
  //       name = updateTaskData.name;
  //       description = updateTaskData.description;
  //       status = updateTaskData.status;
  //       priority = updateTaskData.priority;
  //     }

  //     // Check for invalid priority and status
  //     if (priority === "Select Priority" || priority === '') {
  //       return setError("Invalid priority");
  //     }
  //     if (status === "Select Status" || status === '') {
  //       return setError("Invalid status");
  //     }


  //     // console.log(createTaskData);

  //     if (priority === "Select Priority" || priority === '') { return setError("Invalid priority"); }
  //     if (status === "Select Status" || status === '') { return setError("Invalid status"); }

  //     let response;

  //     console.log(name, description, status, priority);
  //     // log
  //     if (action === 'CreateTask') {
  //       response = await createTaskApiFunc(name, description, status, priority, config);
  //       if (response.status === 200) {
  //         setcreateTaskData({
  //           name: '',
  //           description: '',
  //           status: '',
  //           priority: ''
  //         })
  //         fetchTasks()
  //         dispatch(closeCreateTaskModal());
  //       }
  //       return;
  //     } else {
  //       response = await updateTaskApiFunc(id, name, description, status, priority, config);
  //       if (response.status === 200) {
  //         setUpdateTaskData({
  //           name: '',
  //           description: '',
  //           status: '',
  //           priority: ''
  //         })
  //         fetchTasks()
  //         dispatch(closeCreateTaskModal());
  //       }
  //       return;
  //     }

     
  //     // console.log("error=>", error);

  //   } catch (error) {
  //     console.log("error=>", error);
  //     if (error.response.status === 400) setError(error.response.data.error)
  //     else setError("Something went wrong")
  //   }
  // }

  const handleFormSubmit = async (e) => {
    console.log('formSubmitted');
    e.preventDefault();
    try {
      let name, description, status, priority;
  
      if (action === 'CreateTask') {
        name = createTaskData.name;
        description = createTaskData.description;
        status = createTaskData.status;
        priority = createTaskData.priority;
      } else {
        // id = updateTaskData.id,
        name = updateTaskData.name;
        description = updateTaskData.description;
        status = updateTaskData.status;
        priority = updateTaskData.priority;
      }
  
      // Check for invalid priority and status
      if (priority === "Select Priority" || priority === '') {
        return setError("Invalid priority");
      }
      if (status === "Select Status" || status === '') {
        return setError("Invalid status");
      }
  
      let response;
  
      console.log(name, description, status, priority);
      
      if (action === 'CreateTask') {
        response = await createTaskApiFunc(name, description, status, priority, config);
        if (response.status === 200) {
          setcreateTaskData({
            name: '',
            description: '',
            status: '',
            priority: ''
          });
          fetchTasks();
          dispatch(closeCreateTaskModal());
        }
      } else {
        response = await updateTaskApiFunc(updateTaskData.id, name, description, status, priority, config);
        if (response.status === 200) {
          setUpdateTaskData({
            name: '',
            description: '',
            status: '',
            priority: ''
          });
          fetchTasks();
          dispatch(closeCreateTaskModal());
        }
      }
    } catch (error) {
      console.log("error=>", error);
      if (error.response.status === 400) setError(error.response.data.error);
      else setError("Something went wrong");
    }
  };
  
  return (
    <div className="modal-container">
      <div className="modal-content" ref={modalRef}>
        <div className='modal-heading'>
          <h2> {action === 'CreateTask' ? "Create Task" : "Update Task"}</h2>
          <h2 className='close-icon'
            onClick={() => {
              dispatch(closeCreateTaskModal())
            }}
          >X</h2>
        </div>
        <h4 style={{ color: 'red', marginBottom: '8px' }}>{error}</h4>
        <form method="post" onSubmit={handleFormSubmit}>
          <input type="text" name="name" placeholder="Name" className="modal-input" value={action === 'CreateTask' ? createTaskData.name : updateTaskData?.name} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" className="modal-input" value={action === 'CreateTask' ? createTaskData.description : updateTaskData.description} onChange={handleChange} />
          <select name="priority" className="modal-input" onChange={handleChange} value={action === 'CreateTask' ? createTaskData.priority : updateTaskData.priority}>
            <option value="Select Priority">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select name="status" className="modal-input" onChange={handleChange} value={action === 'CreateTask' ? createTaskData.status : updateTaskData.status}>
            <option value="Select Status">Select Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Review">Review</option>
            <option value="Closed">Closed</option>
            <option value="Blocked">Blocked</option>
          </select>
          <button className="modal-input">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;