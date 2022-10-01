import "./App.css";
import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./components/search-box/search-box.style.css";

const App = () => {
  console.log("render");

  const [searchField, setSearchField] = useState(""); //[value,setValue]
  const [monsters, setMonsters] = useState([]);
  const [title, setTitle] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(() => users));
  }, []);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setTitle(searchFieldString);
  };
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);
  //test
  return (
    <div className="App">
      <div className="title">{title}</div>
      <SearchBox
        className="search-box"
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
      ></SearchBox>
      <br></br>
      <SearchBox
        className="search-box"
        placeholder="set title"
        onChangeHandler={onTitleChange}
      ></SearchBox>
      <CardList monsters={filteredMonsters} />
    </div>
  );
};
// class App1 extends Component {
//   constructor() {
//     super()
//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }
//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(users =>
//         this.setState(() => {
//           return { monsters: users }
//         })
//       )
//   })

//     this.setState(() => {
//       return {
//         searchField
//       }
//     })
//   }
//   render() {
//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this
//     const filteredMonsters = monsters.filter(monster => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     })

//     return (
//       <div className="App">
//         <h1 className="app-title">Albino's Monsters</h1>
//         <SearchBox
//           className="search-box"
//           placeholder="search monsters"
//           onChangeHandler={onSearchChange}></SearchBox>
//         <CardList monsters={filteredMonsters} />
//       </div>
//     )
//   }
// }

export default App;
