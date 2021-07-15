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
      <header>
        <h1>Redux To Do List</h1>
      </header>

      <FadeIn>
        <div className="mainContainer">
          <ToDoInput />

          {/* {isSmartPhone && <h2>Hello this is smartphone</h2>}
          {isMobile && <h2>Hello this is landscape mobile</h2>}
          {isTablet && <h2>Hello this is tablet</h2>}
          {isDesktop && <h2>Hello this is desktop</h2>}
          {isLargeDesktop && <h2>Hello this is largedesktop</h2>} */}

          {/* Filter */}

          {/* To Do List */}
          <ToDoList />
          {/* Done */}
        </div>
      </FadeIn>
      <footer>
        <p>@Yuki Matsubara all right reserved. 2021/07.
          <a href="https://www.linkedin.com/in/yukimatsubara/" target="_blank" rel="noreferrer"><FaLinkedin></FaLinkedin></a>
          <a href="https://github.com/YukiRamu" target="_blank" rel="noreferrer"><FaGithub></FaGithub></a>
        </p>
      </footer>
    </>
  );
};

export default App;
