import style from '../styles/CategoryList.module.css';
import CategoryItem from './CategoryItem';

// dummy
import categoryData from '../json/category.json';

function CategoryList() {
  let cateList = [];
  cateList = categoryData.data;
  return (
    <nav>
      <ul className={style.list}>
        <CategoryItem key={0} title="전체보기" icon="category.svg" />
        {cateList.map((cate, i) => (
          <CategoryItem key={i + 1} title={cate.name} icon={cate.icon} />
        ))}
      </ul>
    </nav>
  );
}

export default CategoryList;
