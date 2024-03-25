import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  const apiUrl = 'restaurantes/';

  const parametros = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (parametros?.id) {
      const restauranteUrl: string = `${apiUrl}${parametros.id}/`;
      http
        .get<IRestaurante>(restauranteUrl)
        .then((result) => setNomeRestaurante(result.data.nome))
        .catch();
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros?.id) {
      const editUrl: string = `${apiUrl}${parametros.id}/`;
      http
        .put(editUrl, { nome: nomeRestaurante })
        .then((result) => {
          alert('restaurante cadastrado com sucesso');
          console.log(result);
        })
        .catch((error) => console.error(error));
    } else {
      http
        .post(apiUrl, { nome: nomeRestaurante })
        .then((result) => {
          alert(`restaurante cadastrado com sucesso`);
          console.log(result);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>

      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          id="standard-basic"
          variant="standard"
          label="Nome do Restaurante"
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          fullWidth
          required
        />

        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          variant="outlined"
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
