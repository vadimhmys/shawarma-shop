import Categories from './components/Categories';
import Header from './components/Header';
import Sorting from './components/Sorting';
import Main from './pages/Main';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sorting/>
          </div>
          <Main/>
        </div>
      </div>
    </div>
  );
}

export default App;
