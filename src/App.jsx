import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import FadeIn from 'react-fade-in';
import ToDoInput from './components/ToDoInput/ToDoInput';
import ToDoList from './components/ToDoList/ToDoList';
import MediaQueryContext from './contexts/MediaQueryContext';

const App = () => {

  const { isSmartPhone, isMobile, isTablet, isDesktop, isLargeDesktop } = useContext(MediaQueryContext);

  return (
    < >
      <div className="appContainer">
        <header>
          <h1>Redux To Do List</h1>
        </header>

        <div className="mainContainer">
          <FadeIn>
            <ToDoInput />
            {/* Filter */}

            {/* To Do List */}
            <ToDoList />
            {/* Done */}
          </FadeIn>
        </div>

        <footer>
          <p>@Yuki Matsubara all right reserved. 2021/07.
            <a href="https://www.linkedin.com/in/yukimatsubara/" target="_blank" rel="noreferrer"><FaLinkedin></FaLinkedin></a>
            <a href="https://github.com/YukiRamu" target="_blank" rel="noreferrer"><FaGithub></FaGithub></a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
