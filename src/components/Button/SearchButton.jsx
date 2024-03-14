import { SearchIcon } from 'assets';
import style from 'styles/Home.module.css';

const SearchButton = () => {
  return (
    <button className={style.icon}>
      <SearchIcon width={20} height={20} fill={'var(--color-black)'} />
    </button>
  );
};

export default SearchButton;
