import "./App.css";
import Axios from "axios";
import { useState } from "react";
import RecipeTile from "./RecipeTile";

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState("vegan");

  const YOUR_APP_ID = "c30eb353";
  const YOUR_APP_KEY = "a3d0593e86306c88cbd0ab0fc76179a3";

  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;
  
  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div className="app">
      <h1>Thirsty?💧</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <imput 
          type="text" 
          className="app__input"
          placeholder="enter ingridient"
          value={query} 
          onChange={(e) => setquery(e.target.value)} 
        />
        <input className='app__submit' type="submit" value="Ideas to drink" />
      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;
