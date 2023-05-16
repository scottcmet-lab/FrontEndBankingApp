function Logout() {

    function handle() {
        firebase.auth().signOut();

    }

    return (
        <>
            <button type="submit" className="btn btn-light" onClick={handle}>Sign Out</button>
        </>
    )
}