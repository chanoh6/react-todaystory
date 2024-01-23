import '../styles/home.css';

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
        <div className="content-list">
          <h1>TOP STORIES</h1>
          <div className="card">
            <div className="card-img"></div>
            <div className="card-info">
              <div className="card-title">
                <div className="content-cp">
                  <div id="cpLogo"></div>
                  <p id="cpName">LABEL</p>
                </div>
                <p id="title">TITLE</p>
              </div>
              <div className="card-more">
                <div className="more-left">
                  <span id="publishedDate">date</span>
                  <span>|</span>
                  <span id="contentCategory">category</span>
                </div>
                <div className="more-right">
                  <div className="more-view">
                    <div className="icon-view"></div>
                    <p>view</p>
                  </div>
                  <div className="btn-like"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default Home;
