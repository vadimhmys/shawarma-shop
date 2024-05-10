import Card from './components/Card';
import Categories from './components/Categories';
import Header from './components/Header';
import { data } from './data';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
          </div>
          <h2 className="content__title">Все шавухи</h2>
          <div className="content__items">
            {
              data.shawarmas.map(s => <Card
                key={s.id}
                shawarma={s}
              />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
