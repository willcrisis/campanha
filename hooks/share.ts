import { Dia, Semana, useData, WEEK_DAY_MAP } from '@/contexts/DataContext';
import { Share } from 'react-native';

const buildMessage = (week: Semana, day: Dia) =>
  `${week.id}ª Semana: ${week.tema}

${WEEK_DAY_MAP[Number(day.id)]}
Deus Pai, ${day.atributo}

${day.textos}

${day.livros
  .map(
    (book) => `${book.nome}
${book.capitulos
  .map(
    (chapter) => `Capítulo ${chapter.id}
${chapter.versiculos.map((verse) => `${verse.id} ${verse.texto}`).join('\n')}`,
  )
  .join('\n')}
`,
  )
  .join('\n')}
`.trim();

export const useShare = () => {
  const { allData } = useData();
  const share = async (weekNumber: number, dayNumber: number) => {
    const week = allData[weekNumber] as Semana;
    const day = week.dias[dayNumber] as Dia;

    const message = buildMessage(week, day);

    try {
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  return { share };
};
