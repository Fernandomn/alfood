import axios, { AxiosRequestConfig } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IParametrosBusca from '../../interfaces/IParametrosBusca';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [data, setData] = useState<IPaginacao<IRestaurante>>();
  const [textoDeBusca, setTextoDeBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const progressivePaginationFlag = true;
  const apiUrl = 'http://localhost:8000/api/v1/restaurantes/';
  const listaRestaurantes: IRestaurante[] = data?.results || [];
  const apiUrlPaginaAnterior: string = data?.previous || '';
  const apiUrlProximaPagina: string = data?.next || '';

  useEffect(() => {
    carregarDados(apiUrl);
  }, []);

  const carregarDados = (url: string, options: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, options)
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

  function buscar(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const options = { params: {} as IParametrosBusca };
    if (textoDeBusca) {
      options.params.search = textoDeBusca;
    }
    if (ordenacao) {
      options.params.ordering = ordenacao;
    }

    carregarDados(apiUrl, options);
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>

      <form onSubmit={buscar}>
        <div>
          <label htmlFor="busca-restaurantes">Buscar restaurantes</label>
          <input
            id="busca-restaurantes"
            name="busca-restaurantes"
            placeholder="Busque por restaurantes"
            type="text"
            value={textoDeBusca}
            onChange={(event) => setTextoDeBusca(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="selectOrdenacao">Ordenação</label>
          <select
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            onChange={(event) => setOrdenacao(event.target.value)}
          >
            <option value="">Padrão</option>
            <option value="id">Por ID</option>
            <option value="nome">Por Nome</option>
          </select>
        </div>

        <button type="submit">Pesquisar</button>
      </form>

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
