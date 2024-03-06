import { ArrowRightIcon } from 'assets';
import style from 'styles/MoreMenu.module.css';

function MoreMenu() {
  const menuTitle = ['링크 복사', '채널 보러가기'];

  return (
    <div className={style.modal__wrap}>
      <ul>
        {menuTitle.map((category, idx) => {
          return (
            <li key={idx}>
              <p>{category}</p>
              <ArrowRightIcon width={6} height={10} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MoreMenu;
