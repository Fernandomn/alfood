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
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const apiUrl = 'pratos/';

  useEffect(() => {
    http
      .get<IPrato[]>(apiUrl)
      .then((result) => {
        setPratos(result.data);
      })
      .catch();
  }, []);

  const excluir = (pratoASerExcluido: IPrato): void => {
    const deleteUrl = `${apiUrl}${pratoASerExcluido.id}/`;
    http
      .delete(deleteUrl)
      .then((result) => {
        const listaPratos = pratos.filter(
          (prato) => prato.id !== pratoASerExcluido.id
        );
        setPratos([...listaPratos]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [
                <a
                  href={prato.imagem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ver imagem
                </a>
                ]
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
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

export default AdministracaoPratos;
