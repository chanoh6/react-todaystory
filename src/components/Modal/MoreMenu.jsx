import { ArrowRightIcon } from 'assets';
import { useNavigate } from 'react-router';
import style from 'styles/MoreMenu.module.css';

const MoreMenu = ({ contents }) => {
  const navigate = useNavigate();
  const moreMenu = [
    { title: '홈으로 가기', url: process.env.REACT_APP_WEB_HOME_URL },
    { title: '채널 보러가기', url: `${process.env.REACT_APP_WEB_CHANNEL_URL}${contents.cpIdx}` },
  ];

  const handleClick = (url) => navigate(url);

  return (
    <div className={style.modal__wrap}>
      <ul>
        {moreMenu.map((menu, index) => (
          <li key={index} onClick={() => handleClick(menu.url)}>
            <p>{menu.title}</p>
            <ArrowRightIcon width={6} height={10} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoreMenu;
