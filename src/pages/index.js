import React,{useState, useEffect} from "react";

import "./styles.css";

function Home() {
  const [name, setName] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [email, setEmail] = useState('')
  const [clients, setClients] = useState([])

  function handleAddClient(event){
    event.preventDefault()
    const data ={
      id: new Date().getTime(),
      name,
      cellphone,
      email
    }
    console.log(data)
    //imutabilidade
    setClients([...clients,data])
    console.log(clients)

    //setando todos os estados para vazio
    setName('')
    setCellphone('')
    setEmail('')

  }

  function handleDelete(id){
    setClients(clients.filter(client => client.id !== id))
  }

  useEffect(() => {
    function loadData(){

    const storagedClientes = localStorage.getItem('@cadclients:clients')
    
    if(storagedClientes){
      setClients(JSON.parse(storagedClientes))
    }
  }
  loadData()

  },[])

  useEffect(() => {
    function saveData(){
      localStorage.setItem('@cadclients:clients',JSON.stringify(clients))
    }
    saveData()
  }, [clients])

  return (
    <div className="page">
      <form className="cadastro" onSubmit={handleAddClient}>
        <input
          name="name"
          placeholder="Digite seu nome"
          type="text"
          value={name}
          onChange ={(event) => setName(event.target.value)}
          required
        />
        <input
          name="cellphone"
          type="text"
          placeholder="Digite seu telefone"
          value={cellphone}
          onChange ={(event) => setCellphone(event.target.value)}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange ={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client =>(
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.cellphone}</td>
              <td>{client.email}</td>
              <td><button className="Excluir" onClick={() => handleDelete(client.id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
