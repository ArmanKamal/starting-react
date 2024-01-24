import './App.css';
import PropTypes from "prop-types";
import React from 'react'
const PokemonRow = ({ pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(",")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!!</button>
    </td>
  </tr>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape(
      {english: PropTypes.string}
    ),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
  onSelect: PropTypes.func,
}

const PokemonDetails = ({name, base}) => (
  <div>
    <h1>{name.english}</h1>
    <div>
      {Object.keys(base).map(key => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))
      }
    </div>
  </div>
)

PokemonDetails.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string
  })
  ,
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
}




function App() {
  const [filter, setFilter] = React.useState("");
  const [selectedItem, setSeletectedItem] = React.useState(null);
  return (
    <div style={
      {margin: "auto",
       width: 800,
       paddingTop: "1rem"}
    }>
      <h1 className='title'>Pokemon Search</h1>
      <div style={
        {
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem"
        }
      }>
      </div>
      <div>
        <label style={{margin: 40}}>Search By Name </label>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>

        <table className='table'>
        <thead>
          <tr>
            <th>Pokemon Name</th>
            <th>Pokemon Type</th>
          </tr>
        </thead>
        <tbody>
          {
            pokemon
            .filter((pokemon) => pokemon.name.english.includes(filter))
            .slice(0,20).map(pokemon => (
             <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => setSeletectedItem(pokemon)} />
            ))
          }
        </tbody>
      </table>
      {selectedItem && (<PokemonDetails { ...selectedItem} />) }
      </div>
    </div>
  );
}

export default App;
