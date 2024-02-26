import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const apiUrl = 'http://localhost:8000/api/v1/restaurantes/';

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [apiUrlProximaPagina, setApiUrlProximaPagina] = useState('');

  useEffect(() => {
    // obter restaurantes
    axios
      .get<IPaginacao<IRestaurante>>(apiUrl)
      .then((response) => {
        setRestaurantes(response.data.results);
        setApiUrlProximaPagina(response.data.next);
      })
      .catch((error) => console.error(error));
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(apiUrlProximaPagina)
      .then((response) => {
        setRestaurantes([...restaurantes, ...response.data.results]);
        setApiUrlProximaPagina(response.data.next);
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {apiUrlProximaPagina && <button onClick={verMais}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
