import Minisearch from 'minisearch'
import { search as ffSearch} from 'fast-fuzzy'
import { escapeRegExp } from './utils'

const HIGHLIGHT_THRESHOLD = 0.9

export async function initSearch(pages:any[]) {
  const searcher = new Minisearch({
    idField: 'url',
    fields: ['title', 'text'],
    storeFields: ['url', 'title', 'text'],
    searchOptions: {
      boost: { title: 100 },
    },
  })
  searcher.addAll(pages.map(page => {
    return {
      id: page.id,
      url: page.url,
      title: page.title,
      text: page.text,
    }
  }))
  return searcher
}

export function highlightMatch(query:string, candidate:string, maxTokensBefore:number=-1, maxTokensAfter:number=-1, startTag:string='<b>', endTag:string='</b>') {
  const result = ffSearch(query, [candidate], {
    returnMatchData: true,
    threshold: HIGHLIGHT_THRESHOLD,
  })
  if (!result.length) return {
    highlight: candidate,
    matchLength: 0,
  }
  const start = result[0].match.index
  const end = result[0].match.index + result[0].match.length
  let snippet = candidate.slice(start, end)
  if (!snippet.match(/([A-Z|a-z])$/)) snippet = snippet.slice(0, -1)
  const snippetRe = new RegExp(`((.|\n)*)(\s|^|[^(A-Z|a-z|')])(.*?${escapeRegExp(snippet)})((.|\n)*)`, 'gi')
  function replacer(match:string, p1:string, p2:string, p3:string, p4:string, p5:string) {
    if (maxTokensBefore < 0 && maxTokensAfter < 0) {
      return p1 + p3 + startTag + p4 + endTag + p5
    } else {
      let newP1 = p1
      let newP5 = p5
      if (maxTokensBefore > 0) {
        newP1 = p1.split(/\s/).slice(-maxTokensBefore).join(' ') 
      } else if (maxTokensBefore === 0) {
        newP1 = ''
      }
      if (maxTokensAfter > 0) {
        newP5 = p5.split(/\s/).slice(0, maxTokensAfter).join(' ')
      } else if (maxTokensAfter === 0) {
        newP5 = ''
      }
      if (newP1.length < p1.length) newP1 = '…' + newP1
      if (newP5.length < p5.length) newP5 = newP5 + '…'
      return newP1 + p3 + startTag + p4 + endTag + newP5
    } 
  }
  const highlight = {
    highlight: candidate.replace(snippetRe, replacer),
    matchLength: snippet.length,
  }
  return highlight
}
