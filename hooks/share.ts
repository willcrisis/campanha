import { APP_URL } from '@/constants';
import { Dia, Semana, useData } from '@/contexts/DataContext';
import { OrdinalFunction, TranslateFunction, useI18n } from '@/contexts/I18nContext';
import { Share } from 'react-native';

const buildMessage = (week: Semana, day: Dia, translate: TranslateFunction, ordinal: OrdinalFunction) =>
  `${translate('app.name')}

${translate('components.fullDay.week', { week: ordinal(week.id), theme: week.tema })}

${translate(`weekDays.${day.id}`)}
${translate('components.fullDay.attribute', { attribute: day.atributo })}

${day.textos}

${day.livros
  .map(
    (book) => `${book.nome}
${book.capitulos
  .map(
    (chapter) => `${translate('components.fullDay.chapter', { chapter: chapter.id })}
${chapter.versiculos.map((verse) => `${verse.id} ${verse.texto}`).join('\n')}`,
  )
  .join('\n')}
`,
  )
  .join('\n')}
${translate('components.share.download', { url: APP_URL })}
`.trim();

export const useShare = () => {
  const { allData } = useData();
  const { translate, ordinal } = useI18n();
  const share = async (weekId: number, dayId: number) => {
    const week = allData[weekId - 1] as Semana;
    const day = week.dias[dayId - 1] as Dia;

    const message = buildMessage(week, day, translate, ordinal);

    try {
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  return { share };
};
