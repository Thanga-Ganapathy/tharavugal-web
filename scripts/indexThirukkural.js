import { writeFileSync } from 'node:fs';
import MiniSearch from 'minisearch';
import { thirukkural } from '@/data/thirukkural';
import { join } from 'node:path';

const stopWords = new Set(['and', 'or', 'to', 'in', 'a', 'the', 'as', 'of', 'they', 'that']);

const documents = [];
let id = 1;
thirukkural.chapters.forEach((chapter) => {
  chapter.kurals.forEach((kural) => {
    const doc = {
      id,
      name: chapter.name,
      nameEn: chapter.translations[0].text,
      text: kural.translations[0].explanations[0].text.replace('<br/>', ''),
      textEn: kural.translations[1].explanations[0].text.replace('<br/>', ''),
      textEnExp: kural.translations[1].explanations[1].text,
    };
    documents.push(doc);
    id++;
  });
});
const miniSearch = new MiniSearch({
  fields: ['name', 'nameEn', 'text', 'textEn', 'textEnExp'],
  processTerm: (term, _fieldName) =>
    stopWords.has(term) ? null : term.toLowerCase(),
});
miniSearch.addAll(documents);
const json = JSON.stringify(miniSearch);
writeFileSync(join('data', 'thirukkural', 'searchIndex.json'), json);
