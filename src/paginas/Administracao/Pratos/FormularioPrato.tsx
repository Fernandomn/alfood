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
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {
  const apiPratosUrl = 'pratos/';
  const apiRestaurantesUrl = 'restaurantes/';
  const apiTagsUrl = 'tags/';

  const parametros = useParams();

  const [data, setData] = useState<IPrato>();

  const [imagem, setImagem] = useState<File | null>(null);

  const [listaTags, setListaTags] = useState<ITag[]>([]);
  const [listaRestaurantes, setListaRestaurantes] = useState<IRestaurante[]>(
    []
  );

  const nomePrato = data?.nome || '';
  const descricao = data?.descricao || '';
  const tag = data?.tag || '';
  const restaurante = data?.restaurante || 0;
  const isEditing = data && data.id > 0;

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>(apiTagsUrl)
      .then((result) => setListaTags(result.data.tags))
      .catch((error) => console.error(error));

    http
      .get<IRestaurante[]>(apiRestaurantesUrl)
      .then((result) => {
        setListaRestaurantes(result.data);
      })
      .catch((error) => console.error(error));

    if (parametros.id) {
      http
        .get<IPrato>(`${apiPratosUrl}${parametros.id}/`)
        .then((result) => {
          console.log(result);
          setData(result.data);
        })
        .catch((error) => console.error(error));
    }
  }, [parametros]);

  const selecionaArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const updateData = (atributo: string, valor: string | number) => {
    let newData: IPrato;
    if (data) {
      newData = { ...data, [atributo]: valor };
    } else {
      newData = {
        nome: '',
        descricao: '',
        tag: '',
        restaurante: 0,
        imagem: '',
        id: -1,
        [atributo]: valor,
      };
    }
    setData(newData);
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante.toString());
    if (imagem) {
      formData.append('imagem', imagem);
    }

    const method = isEditing ? 'PUT' : 'POST';

    http
      .request({
        url: `${apiPratosUrl}${isEditing ? data.id + '/' : ''}`,
        method: method,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      .then((response) => {
        console.log(response);

        alert(`prato ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
        setData({} as IPrato);
      })
      .catch((error) => console.error(error));
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
          onChange={(evento) => updateData('nome', evento.target.value)}
          fullWidth
          required
          margin="dense"
        />

        <TextField
          id="standard-basic"
          variant="standard"
          label="Descrição do Prato"
          value={descricao}
          onChange={(evento) => updateData('descricao', evento.target.value)}
          fullWidth
          margin="dense"
          required
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(evento) => updateData('tag', evento.target.value)}
          >
            {listaTags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
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
            onChange={(evento) =>
              updateData('restaurante', evento.target.value)
            }
          >
            {listaRestaurantes.map((restaurante) => (
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
