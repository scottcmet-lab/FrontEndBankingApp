function Deposit(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [deposit, setDeposit]   = React.useState('');
    const [valid, setValid]       = React.useState(false);
    const ctx = React.useContext(UserContext);  
  
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
      ctx.users[ctx.users.length - 1].balance = Number(ctx.users[ctx.users.length - 1].balance) + Number(deposit);
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
        body={show ? (  
                <>
                Balance:  {ctx.users[ctx.users.length - 1].balance}<br/><br/>
                Deposit Amount<br/>
                <input type="number"  className="form-control" id="name" placeholder="Enter deposit..." value={deposit} onChange={depositChange} /><br/>
                <button type="submit" className="btn btn-light" disabled={!valid} onClick={handleDeposit}>Deposit</button>
                </>
              ):(
                <>
                Balance:  {ctx.users[ctx.users.length - 1].balance}<br/><br/>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
                </>
              )}
      />
    )
  }