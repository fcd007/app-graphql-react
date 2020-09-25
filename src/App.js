import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

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

function App() {
  // const response = useQuery(HELLO);
  // eslint-disable-next-line
  const [person, setPerson] = useState({ name: "Felipe Moura" });

  const [createPerson] = useMutation(CREATE_PERSON);

  const onChange = () => {};

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
    </div>
  );
}
export default App;
