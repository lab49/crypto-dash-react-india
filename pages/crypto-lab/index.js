const CryptoExchange = () => {
  return (
    <div className="container-fluid text-white row app-body">
      <nav className="col-1 block-card side-bar"> SIDE BAR COMPONENT</nav>
      <div className=" row col-11 flex-column main">
        <div className="row search-bar">SEARCH BAR COMPONENT</div>
        <div className="row flex-grow-1">
          <div className="col-7 d-flex flex-column">
            <section className="largest-movers">TOP GAINER/ LOOSER COMPONENT</section>
            <section className="live-chart">LIVE CHART COMPONENT</section>
          </div>
          <div className="col-5 d-flex flex-column">
            <section className="quick-trade">QUICK TRADE COMPONENT</section>
            <section className="orders">ORDERS COMPONENT</section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoExchange;
