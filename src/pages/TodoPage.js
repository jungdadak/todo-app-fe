import React, { useEffect, useState } from 'react';
import TodoBoard from '../components/TodoBoard';
import api from '../utils/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');
    setTodoList(response.data.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTodo = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log('success');
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('fail');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container>
      <div className="text-center text-4xl font-bold text-slate-300 mt-[20vh]">
        [ AWS 포기한사람 🤣]
      </div>
      <Row className="tracking-widest mt-5 bg-slate-300 flex text-center items-center rounded-md">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일 없으면 취직 못함"
            className="w-full p-2 rounded-md text-center placeholder-slate-500 font-bold text-2xl line-through"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button
            className="h-12 w-full rounded-lg bg-opacity-50 bg-green-300 text-white font-bold text-2xl p-2 hover:bg-green-500"
            onClick={addTodo}
          >
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
      <Link to="/login" className="font-bold text-xl underline text-blue-300">
        로그인은 하셨나요
      </Link>
    </Container>
  );
};

export default TodoPage;
