import './App.css';
import WelcomeFc from './componenets/GreetingFc';
import Welcome from './componenets/Greeting';
import Card from './componenets/Card';

function App() {
  return (
    <div className="App">
      <Welcome name="mohamed" />

      <Card title="product-1" description="this is product 1" price="100" />
    </div>
  );
}

export default App;
