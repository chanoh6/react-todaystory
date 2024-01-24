import style from '../styles/CategoryList.module.css';
import CategoryItem from './CategoryItem';

// dummy
const cateList = [
  '여행',
  '라이프스타일',
  '건강',
  '레시피',
  '패션&뷰티',
  '힐링',
  '자동차&TECH',
  '경제',
  '날씨',
  '스포츠',
  '핫플',
  '문화&예술',
  '이슈',
  '인테리어',
  '푸드',
  '환경',
  '교육',
];

function CategoryList() {
  return (
    <nav>
      <ul className={style.list}>
        <CategoryItem key={0} title="전체보기" />
        {cateList.map((cate, i) => (
          <CategoryItem key={i + 1} title={cate} />
        ))}
      </ul>
    </nav>
  );
}

export default CategoryList;
