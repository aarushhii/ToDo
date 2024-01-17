import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const API_URL = 'https://jsonplaceholder.typicode.com/posts/1/todos';
const ITEMS_PER_PAGE = 5;

const TodoApp = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };


  let filteredTodos;

  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL, {
          params: {
            _page: currentPage,
            _limit: ITEMS_PER_PAGE,
          },
        });

        const totalCount = response.headers['x-total-count'];

        setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));



        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);

      }
      finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleSortById = () => {

    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    // Sort todos based on id and current sort order
    const sortedTodos = [...todos].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    setSortOrder(newSortOrder);
    setTodos(sortedTodos);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  filteredTodos = searchTerm
    ? todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : todos;
  return (
    <div>
      <div className="heading-container">
        <h2>Todo App</h2>

        <div className="button-container">
          <button onClick={handleSortById}>
            Sort by ID ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>
        <div className="search-container">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="signout-container">
          <button onClick={handleSignOut}>Sign Out</button>
          
        </div>
      </div>
      {loading ? (
        <div className="loader-container">
          <p className="loader"></p>
        </div>
      ) : (
        <>
          <ul>
            {filteredTodos?.map((todo) => (
              <li key={todo.id}>
                <div className="todo-item">
                  <strong>{todo.title}</strong>
                  <span className={todo.completed ? 'completed' : 'not-completed'}>
                    {todo.completed ? 'Completed' : 'Not Completed'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next Page
            </button>

          </div>
        </>
      )
      }
    </div >
  );
};
export default TodoApp;