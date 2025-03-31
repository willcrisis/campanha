import { createContext, PropsWithChildren, useContext } from 'react';
import data from '@/assets/data/data.pt-br.json';
import { differenceInDays, getDay, parse, startOfDay } from 'date-fns';

export type Versiculo = {
  id: string;
  texto: string;
};

export type SearchableVersiculo = Versiculo & {
  key: string;
  semana: number;
  dia: number;
  livro: string;
  capitulo: string;
  tema: string;
  atributo: string;
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
  allVerses: SearchableVersiculo[];
};

const DataContext = createContext<DataContextType>(undefined as never);

const calculateCurrentDay = () => {
  const baseDate = startOfDay(parse(String(process.env.EXPO_PUBLIC_BASE_DATE), 'yyyy-MM-dd', new Date()));
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
  const allVerses = data.flatMap((week) =>
    week.dias.flatMap((day) =>
      day.livros.flatMap((book) =>
        book.capitulos.flatMap((chapter) =>
          chapter.versiculos.map((versiculo) => ({
            key: `${week.id}-${day.id}-${book.nome}-${chapter.id}-${versiculo.id}`,
            ...versiculo,
            semana: week.id,
            dia: day.id,
            livro: book.nome,
            capitulo: chapter.id,
            tema: week.tema,
            atributo: day.atributo,
          })),
        ),
      ),
    ),
  );

  return (
    <DataContext.Provider
      value={{
        thisWeek,
        today,
        allData: data as unknown as Semana[],
        allVerses,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataContextProvider;
