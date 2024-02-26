import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    console.log('preciso enviar dados para API');
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
