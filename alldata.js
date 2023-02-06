function AllData(){
    const ctx = React.useContext(UserContext);
    return (
        <CardTable
            header="All Data"
            data={ctx.users}
        />
    );
}
