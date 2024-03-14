import { ArrowRightIcon } from 'assets';
import { useNavigate } from 'react-router';
import style from 'styles/MoreMenu.module.css';

const MoreMenu = ({ contents }) => {
  const navigate = useNavigate();
  const menuTitle = ['링크 복사', '채널 보러가기'];
  const url = `https://local.todaystory.me/view/${contents.idx}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('url을 복사했습니다.', url);
    });
  };

  const handleToChannel = () => {
    navigate(`${process.env.REACT_APP_WEB_CHANNEL_URL}${contents.cpIdx}`, { state: { title: contents.cp } });
  };
  return (
    <div className={style.modal__wrap}>
      <ul>
        {menuTitle.map((category, idx) => {
          const handleClick = idx === 0 ? handleCopyLink : handleToChannel;
          return (
            <li key={idx} onClick={handleClick}>
              <p>{category}</p>
              <ArrowRightIcon width={6} height={10} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoreMenu;
