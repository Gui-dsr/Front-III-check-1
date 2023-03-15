import "./styles.css";
import { useState } from 'react';

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cardList, setCardList] = useState([]);
  const [cardCount, setCardCount] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setInputValue(event.target.options[event.target.selectedIndex].text);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddCard = (event) => {
    event.preventDefault();
    const newCard = {
      title: document.getElementById('titulo').value,
      category: inputValue,
      date: document.getElementById('data').value,
      description: document.getElementById('descricao').value
    };
    setCardList([...cardList, newCard]);
    document.getElementById('titulo').value = '';
    setSelectedOption('');
    setInputValue('');
    document.getElementById('data').value = '';
    document.getElementById('descricao').value = '';
  };

  const handleDeleteCard = (index) => {
    const newCardList = [...cardList];
    newCardList.splice(index, 1);
    setCardList(newCardList);
  };

  const handleEditCard = (index) => {
    const newCardList = [...cardList];
    const editedCard = newCardList[index];
    editedCard.title = prompt("Digite o novo título:", editedCard.title);
    editedCard.category = prompt("Digite a nova categoria: Lazer, Trabalho, Prioridade, Outros", editedCard.category);
    editedCard.date = prompt("Digite a nova data:", editedCard.date);
    editedCard.description = prompt("Digite a nova descrição:", editedCard.description);
    setCardList(newCardList);
  };

  return (
    <div className="container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <header>
        <div className="cardPrincipal">
          <p className="title"> Cadastrar Tarefa</p>
          <form>
            <input id="titulo" type="text" placeholder="Título" />
            <select id="my-select" value={selectedOption} onChange={handleOptionChange}>
              <option value="option1">Trabalho</option>
              <option value="option2">Lazer</option>
              <option value="option3">Prioridade</option>
              <option value="option4">Outros</option>
            </select>
            <br />
            <input id="my-input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Categoria" />
            <input id="data" type="date" placeholder="Data" />
            <textarea name="Descrição" id="descricao" cols="30" rows="" placeholder="Descrição" ></textarea>
            <button type="button" onClick={handleAddCard}>Salvar</button>
          </form>
        </div>
      </header>
      <body>
        <div className="cardList">
        <p className="contador">{`Cards feitos: ${cardList.length}`}</p>
          {cardList.map((card, index) => (
            <div key={index} className="card">
              <h2>{card.title}</h2>
              <p>{card.category}</p>
              <p>{card.date}</p>
              <p>{card.description}</p>
              <div className="cardButtons">
                <button type="button" onClick={() => handleEditCard(index)}>✏️</button>
                <button type="button" onClick={() => handleDeleteCard(index)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
