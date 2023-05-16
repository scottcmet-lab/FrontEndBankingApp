function Logout() {

    React.useEffect(() => {
        firebase.auth().signOut();
    }, []);

    return (
        <>
            You have successfully logged out.
        </>
    )
}