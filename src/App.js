import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import LanguageSelector from "./components/LanguageSelector";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  const [language, setLanguage] = useState('en')

  return (
    <div className="App">
      <div className="language-container">
        <LanguageSelector setLanguage={e => setLanguage(e.target.value)} />
      </div>
      <div className="body-container">
        <PasswordGenerator language={language}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
