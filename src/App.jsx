import './App.css'
import Home from './Pages/Home'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Header/>
        <main>
            <Home/>
        </main>
        <Footer/>
    </div>
  )
}

export default App
