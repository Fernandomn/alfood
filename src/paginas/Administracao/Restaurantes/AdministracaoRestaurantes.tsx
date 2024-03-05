import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const apiUrl = '/restaurantes/';

  useEffect(() => {
    http
      .get<IRestaurante[]>(apiUrl)
      .then((result) => {
        setRestaurantes(result.data);
      })
      .catch();
  }, []);

  const excluir = (restauranteASerExcluido: IRestaurante): void => {
    const deleteUrl = `${apiUrl}${restauranteASerExcluido.id}/`;
    http
      .delete(deleteUrl)
      .then((result) => {
        const listaRestaurantes = restaurantes.filter(
          (restaurante) => restaurante.id !== restauranteASerExcluido.id
        );
        setRestaurantes([...listaRestaurantes]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
