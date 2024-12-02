import { createContext, PropsWithChildren, useContext } from 'react';
import data from '@/assets/data/pt-br.json';
import { differenceInDays, getDay, startOfDay } from 'date-fns';

export type Versiculo = {
  id: string;
  texto: string;
};

export type Capitulo = {
  id: string;
  versiculos: Versiculo[];
};

export type Livro = {
  nome: string;
  capitulos: Capitulo[];
};

export type Dia = {
  id: string;
  atributo: string;
  textos: string;
  livros: Livro[];
};

export type Semana = {
  id: string;
  tema: string;
  dias: Dia[];
};

type DataContextType = {
  thisWeek: Semana;
  today: Dia;
  allData: Semana[];
};

const DataContext = createContext<DataContextType>(undefined as never);

const calculateCurrentDay = () => {
  const baseDate = startOfDay(new Date(2016, 8, 11));
  const today = startOfDay(new Date());

  let difference = differenceInDays(today, baseDate);

  while (difference >= 49) {
    difference -= 49;
  }

  const week = Math.floor(difference / 7);
  const day = getDay(today);

  return [week, day];
};

export const WEEK_DAY_MAP = [
  '',
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const DataContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [currentWeek, currentDay] = calculateCurrentDay();

  const thisWeek = data[currentWeek] as unknown as Semana;
  const today = thisWeek.dias[currentDay] as unknown as Dia;

  return (
    <DataContext.Provider
      value={{
        thisWeek,
        today,
        allData: data as unknown as Semana[],
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataContextProvider;
