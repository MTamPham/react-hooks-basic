import { useEffect, useState } from 'react';
import queryString from 'query-string';

import './App.scss';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';
import MagicBox from './components/MagicBox';
// import TodoForm from './components/TodoForm';
// import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Take a bath' },
    { id: 2, title: 'Eat breakfast' },
    { id: 3, title: 'Go to work' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJson = await response.json();

        const { data, pagination } = responseJson;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list', error.message);
      }
    }
    fetchPostList();
  }, [filters]);

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('form submit:', formValues);
    // add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1, // dummy ID
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handlePageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  function handleFiltersChange(newFilters) {
    console.log('New filters:', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  return (
    <div className="app">
      <h1>Welcome to React Hooks!</h1>

      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      {/* <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}

      {/* {showClock && <Clock />}
      <BetterClock />
      <button onClick={() => setShowClock(false)}>Hide Clock</button> */}

      <MagicBox />
    </div>
  );
}

export default App;
