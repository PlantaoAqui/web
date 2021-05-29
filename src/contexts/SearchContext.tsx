import { createContext } from 'react';

export enum OrdenarPor {
    Relevancia,
    Nota,
    Remuneracao
}

export type SearchContextProps = {
    dados: {
        like: string;
        tipo: number | null;
        ordenarPor: OrdenarPor;
        uf: number | null;
        municipio: number | null;
        nota: number;
        intervaloRemuneracao: number[];
    },
    setDados: {
        setLike: (like: string) => void;
        setTipo: (tipo: number | null) => void;
        setOrdenarPor: (n: number) => void;
        setUF: (uf: number) => void;
        setMunicipio: (municipio: number) => void;
        setNota: (nota: number) => void;
        setIntervaloRemuneracao: (intervalo: number[]) => void;
    }
};

function searchContextSemProvider () {
    throw new Error('Provider não foi atribuído');
}

const searchContext = createContext<SearchContextProps>({
    dados: {
        like: '',
        tipo: 0,
        ordenarPor: OrdenarPor.Relevancia,
        uf: null,
        municipio: null,
        nota: 0,
        intervaloRemuneracao: []
    },
    setDados: {
        setLike: searchContextSemProvider,
        setTipo: searchContextSemProvider,
        setOrdenarPor: searchContextSemProvider,
        setUF: searchContextSemProvider,
        setMunicipio: searchContextSemProvider,
        setNota: searchContextSemProvider,
        setIntervaloRemuneracao: searchContextSemProvider
    }
});

export default searchContext;
