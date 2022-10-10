export default function formatSearchTerms(searchTerms: string, label: string) {
  let query = '';

  if (searchTerms.length > 0) {
    const terms = searchTerms.split(',');

    for (const term of terms) {
      query += label + '"' + encodeURIComponent(term.trim()) + '"+';
    }
    if (query.length > 0) {
      query = query.slice(0, -1);
    }
  }
  return query;
}
