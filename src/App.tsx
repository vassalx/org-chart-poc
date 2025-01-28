import "./styles.css";
import OrganizationalChart from "./components/OrgChart";
import employees from "./data";

const App = () => {
  return (
    <>
      <h1 className="title">Organization Chart</h1>
      <OrganizationalChart data={employees} />
    </>
  );
};

export default App;
