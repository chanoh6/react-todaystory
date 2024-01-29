import '../styles/Card.css';

function CardL() {
  return (
    <li className="card">
      <figure className="thumbnail">
        <img src="./assets/no_image.png" alt="thumbnail" />
      </figure>
      <div className="card__title">
        <div className="cp">
          <img src="./assets/icon_cplogo.svg" alt="cp logo" />
          <p>CHANNEL</p>
        </div>
        <p className="title">TITLE</p>
      </div>
      <div className="card__more">
        <div className="date">
          <span id="publishedDate">date</span>
          <span>|</span>
          <span id="contentCategory">category</span>
        </div>
        <div className="like">
          <div className="view">
            <img src="./assets/icon_view.svg" alt="icon view" />
            <p id="viewCount">12,345</p>
          </div>
          <img src="./assets/icon_like.svg" alt="icon like" />
        </div>
      </div>
    </li>
  );
}

export default CardL;
