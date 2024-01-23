import '../styles/home.css';
import CardList from '../components/cardList';

function Home() {
  return (
    <div className="Home">
      <header>
        <div className="">header</div>
        <div className="category-list">
          <p>category</p>
        </div>
      </header>
      <main>
        <CardList title="top stories" type="123" />
        <CardList title="best stories" type="004" />
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default Home;
