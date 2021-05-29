import React, { useState } from 'react';
import SearchContext, { OrdenarPor } from './SearchContext';

interface SearchContextProviderProps {
    intervaloRemuneracaoDefault: number[];
    children: React.ReactNode;
}

function SearchContextProvider ({ intervaloRemuneracaoDefault, children }: SearchContextProviderProps) {
    const [like, setLike] = useState('');
    const [tipo, setTipo] = useState<number | null>(null);
    const [ordenarPor, setOrdenarPor] = useState(OrdenarPor.Relevancia);
    const [uf, setUF] = useState<number | null>(null);
    const [municipio, setMunicipio] = useState<number | null>(null);
    const [nota, setNota] = useState(0);
    const [intervaloRemuneracao, setIntervaloRemuneracao] = useState(intervaloRemuneracaoDefault);

    return (
        <SearchContext.Provider
            value={{
                dados: {
                    like,
                    tipo,
                    ordenarPor,
                    uf,
                    municipio,
                    nota,
                    intervaloRemuneracao
                },
                setDados: {
                    setLike,
                    setTipo,
                    setOrdenarPor,
                    setUF,
                    setMunicipio,
                    setNota,
                    setIntervaloRemuneracao
                }
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContextProvider;
