function Withdraw(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [withdrawal, setWithdrawal]   = React.useState('');
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
        if (Number(field) > balance) {
            setStatus('Error: ' + field + ' - insufficient balance');
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }
  
    const withdrawalChange = (event) => {
      setWithdrawal(event.currentTarget.value);
      if (!event.currentTarget.value) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  
    function handleWithdrawal(){
      console.log(withdrawal);
      if (!validate(withdrawal,  'withdrawal'))     return;
      var email = firebase.auth().currentUser.email;
      const url = `/account/withdraw/${email}/${withdrawal}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        setBalance(balance - Number(withdrawal));
      })();
      setShow(false);
    }    
  
    function clearForm(){
      setWithdrawal('');
      setValid(false);
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="info"
        header="Withdrawal"
        status={status}
        body={!firebase.auth().currentUser ? (
          <>
          You must login first
          </>
        ):( show ? (  
                <>
                Balance:  {balance}<br/><br/>
                Withdrawal Amount<br/>
                <input type="number"  className="form-control" id="name" placeholder="Enter withdrawal..." value={withdrawal} onChange={withdrawalChange} /><br/>
                <button type="submit" className="btn btn-light" disabled={!valid} onClick={handleWithdrawal}>Withdrawal</button>
                </>
              ):(
                <>
                Balance:  {balance}<br/><br/>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Make another withdrawal</button>
                </>
              ))}
      />
    )}
