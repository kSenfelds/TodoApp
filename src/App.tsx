import {Routes, Route} from "react-router-dom";
import { HomeView } from './Views/HomeView';
import { TodosView } from './Views/TodosView';
import { AboutView } from './Views/AboutView';
import { NavBar } from './Components/NavBar';
import { ArticlesView } from './Views/ArticlesView';
import { SingleArticleView } from "./Views/SingleArticleView";



  

function App() {
 return (
  <div>
    <NavBar></NavBar>
    <Routes>
      <Route path="/" element= {<HomeView />} />
      <Route path="/about" element= {<AboutView />} />
      <Route path = "/todos" element = {<TodosView />} />
      <Route path="*" element= {<div><h1>404</h1></div>} />
      <Route path="/articles" element = {<ArticlesView/>} />
      <Route path="/articles/:articleId" element = {<SingleArticleView/>} />
    </Routes>
  </div>
 );
}

export default App;
