import React from 'react'
import { Button, Typography, Tooltip, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Text } = Typography;

const TodoItem = ({ todo, onEdit, onDelete, onToggle }) => (
    <div
      className={`bg-white p-4 rounded-lg shadow-md ${todo.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <Text delete={todo.completed} className="text-lg font-semibold mb-1">{todo.title}</Text>
          <Text>{todo.description}</Text>
        </div>
        <div className="flex flex-col">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={onEdit}
              className="mb-2"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={onDelete}
            />
          </Tooltip>
        </div>
      </div>
      <Checkbox
        checked={todo.completed}
        onChange={onToggle}
      >
        {todo.completed ? 'Completed' : 'Incomplete'}
      </Checkbox>
    </div>
  );
  

export default TodoItem 