import ModuleList from "../Modules/List";


function Home() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <h2>Home</h2>
      <ModuleList />
      <h2>Status</h2>
    </div>
  );
}
export default Home;