
function Child() {
  return (<div>child</div>)
}

function App() {
  return (
    <div className="app-container" title="gil" data-test="container">
      hello world
      { Child() }
    </div>
  );
}

export default App;
