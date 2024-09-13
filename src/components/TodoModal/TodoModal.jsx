import React from 'react'
import { Modal, Input, Button, Form} from 'antd';

const TodoModal = ({ visible, onCancel, onFinish, isEditing, form }) => (
    <Modal
      title={isEditing ? 'Edit Todo' : 'Add Todo'}
      open ={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter todo title" />
        </Form.Item>
  
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter todo description" />
        </Form.Item>
  
        <Form.Item className="text-right">
          <Button
            type="primary"
            style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
            htmlType="submit"
          >
            {isEditing ? 'Update Todo' : 'Add Todo'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
  

export default TodoModal