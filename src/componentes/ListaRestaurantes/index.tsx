import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [data, setData] = useState<IPaginacao<IRestaurante>>();

  const progressivePaginationFlag = true;
  const apiUrl = 'http://localhost:8000/api/v1/restaurantes/';
  const listaRestaurantes: IRestaurante[] = data?.results || [];
  const apiUrlPaginaAnterior: string = data?.previous || '';
  const apiUrlProximaPagina: string = data?.next || '';

  useEffect(() => {
    carregarDados(apiUrl);
  }, []);

  const carregarDados = (url: string) => {
    axios
      .get<IPaginacao<IRestaurante>>(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  };

  const verMais = (): void => {
    axios
      .get<IPaginacao<IRestaurante>>(apiUrlProximaPagina)
      .then((response) => {
        const newData = { ...response.data };
        newData.results = [...listaRestaurantes, ...response.data.results];
        setData(newData);
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {listaRestaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {progressivePaginationFlag && apiUrlProximaPagina && (
        <button onClick={verMais}>ver mais</button>
      )}
      {!progressivePaginationFlag && (
        <>
          {
            <button
              onClick={() => carregarDados(apiUrlPaginaAnterior)}
              disabled={!apiUrlPaginaAnterior}
            >
              Página Anterior
            </button>
          }
          {
            <button
              onClick={() => carregarDados(apiUrlProximaPagina)}
              disabled={!apiUrlProximaPagina}
            >
              Próxima Página
            </button>
          }
        </>
      )}
    </section>
  );
};

export default ListaRestaurantes;
