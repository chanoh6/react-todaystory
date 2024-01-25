import '../styles/Home.css';
import style from '../styles/Home.module.css';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import CardList from '../components/CardList';
import CardEditor from '../components/CardEditor';

function Home() {
  return (
    <div className={style.wrap}>
      <Header />
      <CategoryList />
      <main>
        <CardList title="top stories" type="123" />
        <CardList title="best stories" type="004" />
        <CardEditor title="editors' pick" />
        <CardList title="best stories" type="004" />
        <CardList title="category" type="103" />
        <CardList title="category" type="121" />
        <CardList title="category" type="004" />
      </main>
      <footer></footer>
    </div>
  );
}

export default Home;
