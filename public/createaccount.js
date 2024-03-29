function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid]       = React.useState(false);
  //const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label + ' cannot be empty');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (label == 'email' && !validateEmail(field)) {
        setStatus('Error: ' + label + ' must be a valid email address');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (label == 'password' && field.length < 8) {
        setStatus('Error: ' + label + ' cannot be less than 8 characters');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  const nameChange = (event) => {
    setName(event.currentTarget.value);
    if (!event.currentTarget.value && !email && !password) {
        setValid(false);
    } else {
        setValid(true);
    }
  }

  const emailChange = (event) => {
    setEmail(event.currentTarget.value);
    if (!event.currentTarget.value && !name && !password) {
        setValid(false);
    } else {
        setValid(true);
    }
  }

  const passwordChange = (event) => {
    setPassword(event.currentTarget.value);
    if (!event.currentTarget.value && !email && !email) {
        setValid(false);
    } else {
        setValid(true);
    }
  }

  function handleCreate() {
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    let msg = '';
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      const auth  = await firebase.auth();
      const promise = await auth.createUserWithEmailAndPassword(email,password)
        .catch(e => msg = e.message); 
      if (msg == '') {
        setShow(false);
      }
      else {
        setStatus("Error: " + msg);
        setTimeout(() => setStatus(''),3000);
      }
    })();
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setValid(false);
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={nameChange} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={emailChange}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={passwordChange}/><br/>
              <button type="submit" className="btn btn-light" disabled={!valid} onClick={handleCreate}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}