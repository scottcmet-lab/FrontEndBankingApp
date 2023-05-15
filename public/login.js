function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [user, setUser] = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid]       = React.useState(false);

  const ctx = React.useContext(UserContext);  

  function validate(field, label){
    if (!field) {
      props.setStatus('Error: ' + label + ' cannot be empty');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    if (label == 'email' && !validateEmail(field)) {
      props.setStatus('Error: ' + label + ' must be a valid email address');
      setTimeout(() => props.setStatus(''),3000);
      return false;
    }
    if (label == 'password' && field.length < 8) {
      props.setStatus('Error: ' + label + ' cannot be less than 8 characters');
      setTimeout(() => props.setStatus(''),3000);
      return false;
    }
    return true;
}

function handle(){

    //console.log(email);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    let msg = '';
    const url = `/account/login/${email}/${password}`;
    (async () => {
      const auth  = await firebase.auth();      
      const promise = await auth.signInWithEmailAndPassword(email, password)
        .catch(e => msg = e.message);
      if (msg == '') {
        props.setShow(false);
      }
      else {
        props.setStatus("Error: " + msg);
        setTimeout(() => props.setStatus(''),3000);
      }
    })();
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => {
        setEmail(e.currentTarget.value);
        if (!e.currentTarget.value && !password) {
          setValid(false);
        }
        else {
          setValid(true);
        }
      }}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" disabled={!valid} onClick={handle}>Login</button>
   
  </>);
}