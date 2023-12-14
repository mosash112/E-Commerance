import './App.css';
import CardList from './components/CardList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CardList />
      <Footer />
    </div>
  );
}

export default App;
