import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

//useQuery:realiza busca no banco
//useMutation: realiza modificacoes
const CREATE_PERSON = gql`
  mutation($person: people_input) {
    createPerson(person: $person) {
      id
      name
    }
  }
`;

const FIND_PEOPLE = gql`
  {
    people {
      id
      name
    }
  }
`;

function App() {
  // const response = useQuery(HELLO);
  // eslint-disable-next-line

  const [person, setPerson] = useState({ name: "Felipe Moura" });
  const [createPerson] = useMutation(CREATE_PERSON);
  const { loading, data, error } = useQuery(FIND_PEOPLE, { suspend: false });
  // console.log(resFindAll.data);
  const onChange = async (e) => {
    setPerson({ name: e.target.value });
  };

  const handleClick = async () => {
    const result = await createPerson({ variables: { person } });
    console.log("clicou");
  };

  return (
    <div className="App">
      <input
        type="text"
        name="name"
        id="name"
        onChange={onChange}
        placeholder="Enter name"
      />
      <button type="button" onClick={handleClick}>
        Clique
      </button>
      <ul>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          data.people.map((el) => (
            <div>
              <li>ID: {el.id}</li>
              <li>Name: {el.name} </li>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}
export default App;
