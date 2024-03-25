import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {
  const apiPratosUrl = 'pratos/';
  const apiRestaurantesUrl = 'restaurantes/';
  const apiTagsUrl = 'tags/';

  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');

  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>(apiTagsUrl)
      .then((result) => setTags(result.data.tags))
      .catch((error) => console.error(error));

    http
      .get<IRestaurante[]>(apiRestaurantesUrl)
      .then((result) => setRestaurantes(result.data))
      .catch((error) => console.error(error));
  }, []);

  const selecionaArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
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
        Formulário de Pratos
      </Typography>

      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          id="standard-basic"
          variant="standard"
          label="Nome do Prato"
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          fullWidth
          required
          margin="dense"
        />

        <TextField
          id="standard-basic"
          variant="standard"
          label="Descrição do Prato"
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          fullWidth
          margin="dense"
          required
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(evento) => setRestaurante(evento.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" name="" id="" onChange={selecionaArquivo} />

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

export default FormularioPrato;
