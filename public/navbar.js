function NavBar(){
  const [user, setUser] = React.useState('');

  function handle() {
    firebase.auth().signOut();

  }  

  React.useEffect(() => {
    if (firebase.auth().currentUser) {
      setUser(firebase.auth().currentUser.email);
    }
  }, []);

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" title="Create a new user account" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="Login to user account" href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="Make a deposit to your account" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="Make a withdrawal from your account" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" title="View all banking data" href="#/alldata/">AllData</a>
          </li>  
        </ul>
        <div className="collapse navbar-collapse" id="navbarNav2">
        <ul className="nav navbar-nav navbar-right ml-auto">
          <li className="nav-item">
            <div className="nav-link">{user}</div>
          </li>
        <li className="nav-item">
            <a className="nav-link" title="Log out of user account" href="#/logout/">Log out</a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
    </>
  );
}