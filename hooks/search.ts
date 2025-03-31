import { useData } from '@/contexts/DataContext';

const useSearch = () => {
  const { allVerses } = useData();

  const search = (text: string) =>
    allVerses.filter((versiculo) => versiculo.texto.toLowerCase().includes(text.toLowerCase()));

  return search;
};

export default useSearch;
