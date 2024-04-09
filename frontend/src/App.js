import './App.css';
import Features from './components/features/Features';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Howtouse from './components/howtouse/Howtouse';
import MoreFeatures from './components/morefeatures/MoreFeatures';
import Navbar from './components/navbar/Navbar';
import Pros from './components/pros/Pros';
import Newfeatures from './components/features/Newfeatures';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Home></Home>
      <Howtouse></Howtouse>
      <Features></Features>
      <MoreFeatures></MoreFeatures>
      <Newfeatures></Newfeatures>
      <Pros></Pros>
      <Footer></Footer>

    </div>
  );
}

export default App;
