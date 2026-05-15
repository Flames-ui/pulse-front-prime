export function generateSlug(text: string): string {
  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'of', 'is', 'are', 'was', 'were', 'how', 'why', 'what', 'when', 'where']);
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, '') // Remove special chars
    .split(/\\s+/)               // Split by whitespace
    .filter(word => !stopWords.has(word)) // Remove stop words
    .join('-')                   // Join with hyphens
    .substring(0, 70);           // Max 70 chars
}

export function getStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  const intersection = new Set([...s1].filter(char => new Set(s2).has(char)));
  const union = new Set([...s1, ...s2]);
  
  return intersection.size / union.size;
}

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}