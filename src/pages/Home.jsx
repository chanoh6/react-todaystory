import style from '../styles/Home.module.css';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import CardList from '../components/CardList';
import CardEditor from '../components/CardEditor';

function Home() {
  return (
    <>
      <Header />
      <CategoryList />
      <main>
        <CardList title="top stories" type="123" more={false} />
        <CardList title="best stories" type="004" more={false} />
        <CardEditor title="editors' pick" />
        <CardList title="best stories" type="004" more={false} />
        <CardList title="category" type="103" more={true} />
        <CardList title="category" type="121" more={true} />
        <CardList title="category" type="004" more={true} />
      </main>
      <footer></footer>
    </>
  );
}

export default Home;
