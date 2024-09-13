import './App.css'
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/authentication/Register'
import Login from './pages/authentication/Login'
import TodoList from './pages/Todo/TodoList';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { store } from './states/store/store';

function App() {

  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route path='*' element={<NotFoundPage/>}/>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<TodoList/>}/>
      </Routes>
    </Provider>
    </>
  )
}

export default App
