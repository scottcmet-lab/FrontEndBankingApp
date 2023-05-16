function Deposit(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [deposit, setDeposit]   = React.useState('');
    const [valid, setValid]       = React.useState(false);
    const [balance, setBalance]   = React.useState('');
    //const ctx = React.useContext(UserContext);

    React.useEffect(() => {
      if (firebase.auth().currentUser) {
        var email = firebase.auth().currentUser.email;
        fetch(`/account/balance/${email}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBalance(data.balance);
            });
        }
    }, []);


    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label + ' cannot be empty');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        if (field < 0) {
            setStatus('Error: ' + label + ' cannot be negative');
            setTimeout(() => setStatus(''),3000);
            return false;
          }
        return true;
    }
  
    const depositChange = (event) => {
      setDeposit(event.currentTarget.value);
      if (!event.currentTarget.value) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  
    function handleDeposit(){
      console.log(deposit);
      if (!validate(deposit,  'deposit'))     return;
      var email = firebase.auth().currentUser.email;
      const url = `/account/deposit/${email}/${deposit}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        setBalance(balance + Number(deposit));
      })();
      setShow(false);
    }    
  
    function clearForm(){
      setDeposit('');
      setValid(false);
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="success"
        header="Deposit"
        status={status}
        body={!firebase.auth().currentUser ? (
            <>
            You must login first
            </>
          ):( show ? (  
                <>
                Balance:  {balance}<br/><br/>
                Deposit Amount<br/>
                <input type="number"  className="form-control" id="name" placeholder="Enter deposit..." value={deposit} onChange={depositChange} /><br/>
                <button type="submit" className="btn btn-light" disabled={!valid} onClick={handleDeposit}>Deposit</button>
                </>
              ):(
                <>
                Balance:  {balance}<br/><br/>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
                </>
              ))}
      />
    )
  }