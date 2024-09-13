import React, { useState, useEffect } from 'react';
import { Button, Form, Typography } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import TodoItem from '../../components/TodoItem/TodoItem';  
import TodoModal from '../../components/TodoModal/TodoModal';  
import FilterComponent from '../../components/FilterComponent/FilterComponent '; 

const { Text } = Typography;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all'); 

  const [form] = Form.useForm();

  const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = (values) => {
    const newTodo = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos); 
    form.resetFields();
    setShowModal(false);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos); 
  };

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos); 
  };

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
    setShowModal(true);
    form.setFieldsValue({
      title: todo.title,
      description: todo.description,
    });
  };

  const editTodo = (values) => {
    const updatedTodos = todos.map(todo =>
      todo.id === currentTodo.id
        ? { ...todo, title: values.title, description: values.description }
        : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos); 
    setShowModal(false);
    setIsEditing(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setShowModal(false);
    setIsEditing(false);
    form.resetFields();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true; 
  });

  return (
    <React.Fragment>
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex items-center mb-6">
          <img src="/logo.jpeg" alt="Logo" className="w-12 h-12 mr-4" />
          <h1 className="sm:text-lg md:text-3xl lg:text-3xl font-bold text-gray-800">Welcome to IrusriTodo__ 👋</h1>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Button
            type="primary"
            style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
            onClick={() => setShowModal(true)}
          >
            Add Todo
          </Button>

          <FilterComponent filter={filter} setFilter={setFilter} />
        </div>

        {filteredTodos.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={() => openEditModal(todo)}
                onDelete={() => deleteTodo(todo.id)}
                onToggle={() => toggleCompletion(todo.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <Text>No todos available</Text>
          </div>
        )}

        <TodoModal
          visible={showModal}
          onCancel={handleCancel}
          onFinish={isEditing ? editTodo : addTodo}
          isEditing={isEditing}
          form={form}
        />
      </div>
    </React.Fragment>
  );
};

export default TodoList;
