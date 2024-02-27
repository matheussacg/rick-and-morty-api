'use client'

import { useState, useEffect } from 'react';
import Card from "./components/Card";

export default function Home() {
  const baseURL = 'https://rickandmortyapi.com/api';
  const [personagens, setPersonagens] = useState([]);
  const [filtroEspecie, setFiltroEspecie] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroGender, setFiltroGender] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(`${baseURL}/character?page=${paginaAtual}`);
        const data = await response.json();
        setPersonagens(data.results);
        setInfo(data.info);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchApi();
  }, [paginaAtual]);

  const aplicarFiltros = () => {
    const personagensFiltrados = personagens.filter((personagem) => {
      const passaFiltroEspecie = filtroEspecie === '' || personagem.species === filtroEspecie;
      const passaFiltroStatus = filtroStatus === '' || personagem.status === filtroStatus;
      const passaFiltroGender = filtroGender === '' || personagem.gender === filtroGender;
      return passaFiltroEspecie && passaFiltroStatus && passaFiltroGender;
    });

    return personagensFiltrados;
  };

  const personagensFiltrados = aplicarFiltros();

  const avancarPagina = () => {
    if (info && info.next) {
      setPaginaAtual((prevPage) => prevPage + 1);
    }
  };

  const voltarPagina = () => {
    if (info && info.prev) {
      setPaginaAtual((prevPage) => prevPage - 1);
    }
  };

  return (
    <main className="container mx-auto">
      <div className="flex justify-center items-center my-4 gap-10 bg-gray-400 h-10 rounded-md">

        <div>
          <label className="mr-2 font-bold">Filtrar por Espécie:</label>
          <select
            value={filtroEspecie}
            onChange={(e) => setFiltroEspecie(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Alien">Alien</option>
            <option value="Human">Human</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-bold">Filtrar por Gênero:</label>
          <select
            value={filtroGender}
            onChange={(e) => setFiltroGender(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="unknown">Desconhecido</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-bold">Filtrar por Status:</label>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Desconhecido</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {personagensFiltrados.map((personagem) => (
          <Card
            key={personagem.id}
            image={`https://rickandmortyapi.com/api/character/avatar/${personagem.id}.jpeg`}
            name={personagem.name}
            species={personagem.species}
            gender={personagem.gender}
            status={personagem.status}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button
          className="bg-red-500 text-white p-2"
          onClick={voltarPagina}
          disabled={!info || !info.prev}
        >
          Página Anterior
        </button>
        <button
          className="bg-green-500 text-white p-2"
          onClick={avancarPagina}
          disabled={!info || !info.next}
        >
          Próxima Página
        </button>
      </div>

    </main>
  );
}