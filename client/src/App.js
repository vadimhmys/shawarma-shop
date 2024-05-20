import Header from './components/Header';
import Main from './pages/Main';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Main/>
        </div>
      </div>
    </div>
  );
}

export default App;
