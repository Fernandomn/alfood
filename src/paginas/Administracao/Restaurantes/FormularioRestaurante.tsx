import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const FormularioRestaurante = () => {
  const apiUrl = 'http://localhost:8000/api/v2/restaurantes/';
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    axios.post(apiUrl, { nome: nomeRestaurante }).then((result) => {
      alert(`restaurante cadastrado com sucesso`);
      console.log(result);
    });
  };

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        id="standard-basic"
        variant="standard"
        label="Nome do Restaurante"
        value={nomeRestaurante}
        onChange={(evento) => setNomeRestaurante(evento.target.value)}
      />

      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurante;
