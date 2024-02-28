import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import '../../../../app/globals.css';

export default function Personagem() {

    const router = useRouter();
    const [personagem, setPersonagem] = useState([]);
    const baseURL = 'https://rickandmortyapi.com/api'
    
    useEffect(() => {
        const parametro = router.query.id

        const fetchApi = async () => {
          try {
            if (parametro) {
                const response = await fetch(`${baseURL}/character/${parametro}`);
                const data = await response.json();
                setPersonagem(data);
            }
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
    
        fetchApi();
      }, [router.query.id]);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-md justify-center mt-6">
                <img src={personagem.image} alt={personagem.name} className="w-40 h-40 object-cover rounded-md mb-4" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-left">
                        <p className="text-lg font-bold mb-2">ID:</p>
                        <p className="text-lg">{personagem.id}</p>
                    </div>
                    <div className="text-left">
                        <p className="text-lg font-bold mb-2">Name:</p>
                        <p className="text-lg">{personagem.name}</p>
                    </div>
                    <div className="text-left">
                        <p className="text-lg font-bold mb-2">Status:</p>
                        <p className="text-lg">{personagem.status}</p>
                    </div>
                    <div className="text-left">
                        <p className="text-lg font-bold mb-2">Species:</p>
                        <p className="text-lg">{personagem.species}</p>
                    </div>
                </div>

                <div className="mt-4 text-left">
                    <p className="text-lg font-bold mb-2">Origin:</p>
                    <p className="text-lg">{personagem.origin && personagem.origin.name}</p>
                </div>
                <div className="mt-4 text-left">
                    <p className="text-lg font-bold mb-2">Location:</p>
                    <p className="text-lg">{personagem.location && personagem.location.name}</p>
                </div>
                <div className="mt-4 text-left">
                    <p className="text-lg font-bold mb-2">Created:</p>
                    <p className="text-lg">{personagem.created}</p>
                </div>
                <div className="mt-4 text-left">
                    <p className="text-lg font-bold mb-2">Episodes:</p>
                    <p className="text-lg">{personagem.episode && personagem.episode.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}