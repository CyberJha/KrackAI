// StealthHumanizer - Collocation Replacements (100+ entries)
// These replace predictable AI-favored word pairs with more human, casual alternatives

export interface Collocation {
  // The phrase to find (case-insensitive match)
  from: string | RegExp;
  // Possible replacements (random pick)
  to: string[];
}

export const COLLOCATIONS: Collocation[] = [
  // Multi-word phrases AI loves
  { from: 'in order to', to: ['so we can', 'to', 'so that we', 'for the purpose of'] },
  { from: 'due to the fact that', to: ['since', 'because', 'seeing as', 'given that'] },
  { from: 'it is worth noting that', to: ['worth mentioning', 'also', 'one more thing', 'it helps to know'] },
  { from: 'it is worth noting', to: ['worth mentioning', 'it\'s good to know', 'keep in mind'] },
  { from: 'it is important to note', to: ['keep in mind', 'remember', 'it helps to know'] },
  { from: 'it is important to', to: ['it matters to', 'you need to', 'make sure to', 'it\'s key to'] },
  { from: 'it is important', to: ['it matters', 'this is key', 'this counts', 'this is a big deal'] },
  { from: 'it is essential', to: ['you really need', 'this is non-negotiable', 'you can\'t skip'] },
  { from: 'it is crucial', to: ['this matters a lot', 'this is make-or-break', 'you can\'t ignore'] },
  { from: 'it is evident that', to: ['clearly', 'obviously', 'you can see that', 'it\'s pretty clear'] },
  { from: 'it is clear that', to: ['clearly', 'obviously', 'you can tell', 'no surprise'] },
  { from: 'it is clear', to: ['obviously', 'clearly', 'no doubt', 'pretty obvious'] },
  { from: 'it is possible', to: ['it could happen', 'there\'s a chance', 'maybe'] },
  { from: 'it is likely', to: ['probably', 'chances are', 'I\'d bet'] },
  { from: 'it is unlikely', to: ['probably not', 'doubtful', 'a long shot'] },
  { from: 'it is necessary', to: ['you need to', 'it has to happen', 'required'] },
  { from: 'it is interesting', to: ['pretty cool actually', 'neat', 'fascinating when you think about it'] },
  { from: 'it is difficult', to: ['it\'s hard', 'not easy', 'tough', 'tricky'] },
  { from: 'it is true that', to: ['sure', 'granted', 'fair point', 'admittedly'] },
  { from: 'it should be noted', to: ['keep in mind', 'worth knowing', 'one thing to remember'] },
  { from: 'it should be mentioned', to: ['worth bringing up', 'I should add', 'also'] },
  { from: 'it goes without saying', to: ['obviously', 'naturally', 'of course', 'no brainer'] },
  { from: 'it is safe to say', to: ['you can pretty much say', 'I think it\'s fair to say', 'safe bet'] },
  { from: 'it cannot be denied', to: ['you can\'t really argue with', 'hard to dispute', 'no way around it'] },
  { from: 'it cannot be overstated', to: ['this really can\'t be said enough', 'huge deal', 'seriously important'] },
  { from: 'has the ability to', to: ['can', 'is able to', 'knows how to'] },
  { from: 'has the potential to', to: ['could', 'might just', 'stands a chance of'] },
  { from: 'has the capacity to', to: ['can', 'is equipped to', 'has what it takes to'] },
  { from: 'has the potential', to: ['could', 'might', 'has a shot at'] },
  { from: 'a large number of', to: ['tons of', 'a bunch of', 'quite a few', 'loads of', 'a whole lot of'] },
  { from: 'a significant number of', to: ['quite a few', 'a good chunk of', 'a bunch of'] },
  { from: 'a wide range of', to: ['all sorts of', 'a variety of', 'different kinds of'] },
  { from: 'a variety of', to: ['different', 'various', 'all kinds of', 'a mix of'] },
  { from: 'a great deal of', to: ['a lot of', 'tons of', 'loads of', 'a massive amount of'] },
  { from: 'a vast amount of', to: ['a ton of', 'so much', 'a mountain of'] },
  { from: 'a considerable amount', to: ['a lot', 'quite a bit', 'a good amount'] },
  { from: 'a considerable number', to: ['a bunch', 'quite a few', 'a good number'] },
  { from: 'a high level of', to: ['a lot of', 'deep', 'serious'] },
  { from: 'in the field of', to: ['when it comes to', 'in the world of', 'for anyone working in'] },
  { from: 'in the realm of', to: ['in the world of', 'when it comes to', 'within'] },
  { from: 'in the context of', to: ['when you look at', 'in the case of', 'given'] },
  { from: 'in the case of', to: ['when it comes to', 'for', 'with'] },
  { from: 'in addition to', to: ['besides', 'on top of', 'along with', 'plus'] },
  { from: 'in terms of', to: ['when it comes to', 'regarding', 'as for', 'looking at'] },
  { from: 'in light of', to: ['given', 'considering', 'because of', 'with'] },
  { from: 'in spite of', to: ['despite', 'even with', 'even though', 'regardless of'] },
  { from: 'in relation to', to: ['about', 'regarding', 'when it comes to', 'connected to'] },
  { from: 'in comparison to', to: ['compared to', 'versus', 'next to', 'against'] },
  { from: 'in contrast to', to: ['unlike', 'compared to', 'on the flip side', 'while'] },
  { from: 'in response to', to: ['as an answer to', 'reacting to', 'to address'] },
  { from: 'make a decision', to: ['decide', 'make up your mind', 'land on something', 'figure out what to do'] },
  { from: 'make a difference', to: ['change things', 'have an impact', 'actually matter'] },
  { from: 'make an effort', to: ['try', 'put in the work', 'push', 'make a point of'] },
  { from: 'make use of', to: ['use', 'leverage', 'take advantage of', 'put to work'] },
  { from: 'make a contribution', to: ['chip in', 'add something', 'do your part'] },
  { from: 'make progress', to: ['move forward', 'get somewhere', 'make headway'] },
  { from: 'take into account', to: ['consider', 'factor in', 'think about', 'keep in mind'] },
  { from: 'take into consideration', to: ['consider', 'factor in', 'think about', 'weigh'] },
  { from: 'take advantage of', to: ['use', 'leverage', 'capitalize on', 'jump on'] },
  { from: 'play a role', to: ['matter', 'be a factor', 'make a difference', 'have a say'] },
  { from: 'play a crucial role', to: ['be a big deal', 'really matter', 'make a huge difference'] },
  { from: 'play a key role', to: ['be central', 'be a big factor', 'really matter'] },
  { from: 'play a significant role', to: ['be a big part', 'carry real weight', 'matter a lot'] },
  { from: 'play an important role', to: ['really matter', 'be important', 'carry weight'] },
  { from: 'on the other hand', to: ['then again', 'but then', 'on the flip side', 'that said'] },
  { from: 'on the one hand', to: ['for one thing', 'sure', 'on one side'] },
  { from: 'at the same time', to: ['simultaneously', 'meanwhile', 'all the while', 'but also'] },
  { from: 'at the end of the day', to: ['ultimately', 'when all is said and done', 'in the end'] },
  { from: 'for the most part', to: ['mostly', 'generally', 'by and large', 'usually'] },
  { from: 'for the purpose of', to: ['to', 'for', 'so we can', 'in order to'] },
  { from: 'as a matter of fact', to: ['actually', 'in fact', 'truthfully', 'honestly'] },
  { from: 'as a result of', to: ['because of', 'thanks to', 'due to', 'from'] },
  { from: 'as a result', to: ['so', 'because of this', 'that\'s why', 'consequently'] },
  { from: 'as well as', to: ['and', 'plus', 'along with', 'alongside'] },
  { from: 'with regard to', to: ['about', 'regarding', 'when it comes to', 'on the topic of'] },
  { from: 'with respect to', to: ['about', 'regarding', 'in terms of', 'on'] },
  { from: 'with the exception of', to: ['except', 'other than', 'besides'] },
  { from: 'first and foremost', to: ['first off', 'to start', 'the main thing'] },
  { from: 'last but not least', to: ['finally', 'one more thing', 'also'] },
  { from: 'to begin with', to: ['first off', 'to start', 'for starters'] },
  { from: 'to sum up', to: ['basically', 'in short', 'long story short', 'the bottom line'] },
  { from: 'to put it differently', to: ['or to say it another way', 'in other words', 'basically'] },
  { from: 'to put it simply', to: ['basically', 'simply put', 'long story short'] },
  { from: 'the vast majority of', to: ['most', 'pretty much all', 'nearly all', 'almost all'] },
  { from: 'the majority of', to: ['most', 'a lot of', 'pretty much all'] },
  { from: 'a growing number of', to: ['more and more', 'an increasing number of', 'increasingly'] },
  { from: 'an increasing number of', to: ['more and more', 'growing numbers of'] },
  { from: 'the purpose of', to: ['why we', 'the point of', 'what we\'re trying to do'] },
  { from: 'the fact that', to: ['that', 'how', 'the reality that'] },
  { from: 'the ability to', to: ['being able to', 'can', 'getting to'] },
  { from: 'the importance of', to: ['the value of', 'the role of', "what's key about"] },
  { from: 'the development of', to: ['building', 'the rise of', 'the growth of'] },
  { from: 'the implementation of', to: ['rolling out', 'deploying', 'putting in place'] },
  { from: 'the utilization of', to: ['using', 'the use of', 'how we use'] },
  { from: 'the use of', to: ['using', 'how we use', 'relying on'] },
  { from: 'the impact of', to: ['the effect of', 'the result of', 'what comes from'] },
  { from: 'the results of', to: ['what happened when', 'the outcome of', 'what we got from'] },
  { from: 'in conclusion', to: ['to wrap up', 'so yeah', 'basically', 'at the end of the day'] },
  { from: 'to conclude', to: ['to wrap up', 'so', 'anyway', 'long story short'] },
  { from: 'in summary', to: ['basically', 'long story short', 'so yeah', 'the bottom line'] },
  { from: 'it is widely recognized', to: ['everyone knows', 'it\'s pretty well known', 'people generally agree'] },
  { from: 'it is widely accepted', to: ['most people agree', 'it\'s generally agreed', 'pretty much everyone accepts'] },
  { from: 'it is generally accepted', to: ['most people agree', 'it\'s pretty widely accepted', 'common knowledge'] },
  { from: 'it is generally understood', to: ['most people get that', 'pretty clear to everyone', 'common understanding'] },
  { from: 'there is a growing', to: ['there\'s more and more', 'we\'re seeing increasing'] },
  { from: 'there is no doubt', to: ['no question', 'clearly', 'definitely', 'for sure'] },
  { from: 'there is no denying', to: ['you can\'t deny', 'hard to argue with', 'undeniably'] },
  { from: 'demonstrates that', to: ['shows that', 'proves', 'makes it clear that'] },
  { from: 'suggests that', to: ['hints at', 'points to', 'seems like', 'makes you think'] },
  { from: 'indicates that', to: ['shows', 'points to', 'suggests', 'gives the sense that'] },
  { from: 'has been shown to', to: ['has proven to', 'we know', 'turns out to'] },
  { from: 'has been proven to', to: ['we\'ve seen that', 'it\'s been shown', 'clearly'] },
  // 'capable of' removed: it takes a gerund ("capable of generating") but the
  // natural replacements (able to / can / equipped to) take a bare verb, so the
  // swap produced ungrammatical "can generating". Left intact instead.
  { from: 'responsible for', to: ['in charge of', 'handling', 'taking care of', 'doing'] },
  { from: 'associated with', to: ['linked to', 'tied to', 'connected to', 'related to'] },
  { from: 'according to', to: ['per', 'based on what', 'if you look at', 'says'] },
  { from: 'prior to', to: ['before', 'leading up to', 'ahead of'] },
  { from: 'subsequent to', to: ['after', 'following', 'once'] },
  { from: 'in the first place', to: ['to begin with', 'first off', 'for starters'] },
  { from: 'in the second place', to: ['secondly', 'also', 'on top of that'] },
  { from: 'moreover', to: ['additionally', 'also', 'in addition'] },
  { from: 'furthermore', to: ['additionally', 'in addition', 'also'] },
  { from: 'additionally', to: ['also', 'in addition'] },
  { from: 'nevertheless', to: ['still', 'but', 'even so', 'that said'] },
  { from: 'consequently', to: ['so', 'as a result', 'that\'s why', 'because of that'] },
  { from: 'subsequently', to: ['then', 'after that', 'later', 'next'] },
  { from: 'facilitate', to: ['help with', 'make easier', 'enable', 'allow'] },
  { from: 'utilize', to: ['use', 'work with', 'put to use', 'apply'] },
  { from: 'implement', to: ['put in place', 'roll out', 'set up', 'start using'] },
  { from: 'leverage', to: ['use', 'take advantage of', 'build on', 'work with'] },
  { from: 'optimize', to: ['improve', 'fine-tune', 'make better', 'tweak'] },
  { from: 'comprehensive', to: ['thorough', 'complete', 'detailed', 'full'] },
  { from: 'facilitates the', to: ['helps with', 'makes it easier to', 'allows for'] },
  { from: 'paramount', to: ['key', 'top priority', 'most important', 'critical'] },
  { from: 'underscore', to: ['highlight', 'stress', 'point out', 'show'] },
  { from: 'delve into', to: ['dig into', 'look at', 'explore', 'get into'] },
  { from: 'sheds light on', to: ['helps explain', 'clarifies', 'makes sense of', 'reveals'] },
  { from: 'landscape', to: ['world', 'space', 'scene', 'area', 'environment'] },
  { from: 'a myriad of', to: ['lots of', 'tons of', 'all kinds of', 'a bunch of'] },
  { from: 'multifaceted', to: ['complex', 'many-sided', 'layered', 'complicated'] },
  { from: 'seamless', to: ['smooth', 'easy', 'frictionless', 'painless'] },
  { from: 'synergy', to: ['teamwork', 'working together', 'combined effort', 'collaboration'] },
  { from: 'paradigm shift', to: ['big change', 'fundamental shift', 'game changer', 'new way of thinking'] },
  { from: 'holistic', to: ['complete', 'all-around', 'full-picture', 'big-picture'] },
  { from: 'groundbreaking', to: ['revolutionary', 'huge', 'game-changing', 'innovative'] },
  { from: 'transformative', to: ['life-changing', 'revolutionary', 'major', 'powerful'] },
  { from: 'unprecedented', to: ['never seen before', 'unheard of', 'unlike anything before', 'brand new'] },
  { from: 'embark on', to: ['start', 'begin', 'kick off', 'dive into'] },
  { from: 'navigating', to: ['working through', 'dealing with', 'handling', 'figuring out'] },
  { from: 'pivotal', to: ['key', 'crucial', 'critical', 'game-changing'] },
  { from: 'integral', to: ['important', 'essential', 'key', 'central'] },
  { from: 'robust', to: ['strong', 'solid', 'tough', 'reliable'] },
  { from: 'innovative', to: ['new', 'fresh', 'creative', 'cutting-edge'] },
  { from: 'streamline', to: ['simplify', 'speed up', 'make easier', 'smooth out'] },
  { from: 'state-of-the-art', to: ['latest', 'cutting-edge', 'modern', 'top-of-the-line'] },
  { from: 'cutting-edge', to: ['latest', 'bleeding-edge', 'newest', 'advanced'] },
  { from: 'best practices', to: ['smart approaches', 'proven methods', 'what works', 'standard approaches'] },
  { from: 'in today\'s world', to: ['now', 'these days', 'right now', 'at this point'] },
  { from: 'in today\'s society', to: ['nowadays', 'these days', 'right now', 'in 2024'] },
  { from: 'in the modern era', to: ['now', 'these days', 'today', 'in this day and age'] },
  { from: 'in this day and age', to: ['now', 'these days', 'today', 'right now'] },
  // ==================== Phase 3: 50+ NEW AI PHRASE ENTRIES ====================
  // Modern AI buzzwords and overly smooth transitions
  { from: 'a deep dive into', to: ['a closer look at', 'digging into', 'exploring', 'looking at'] },
  { from: 'deep dive', to: ['closer look', 'detailed look', 'proper examination', 'real analysis'] },
  { from: 'unlocking the potential', to: ['tapping into', 'making the most of', 'getting more out of', 'using'] },
  { from: 'unlocking', to: ['opening up', 'revealing', 'exposing', 'making available'] },
  { from: 'the intersection of', to: ['the overlap between', 'the crossroads of', 'the meeting point of'] },
  { from: 'at the intersection of', to: ['between', 'at the crossroads of', 'where'] },
  { from: 'paving the way', to: ['leading to', 'making room for', 'opening the door for', 'setting up'] },
  { from: 'paves the way', to: ['leads to', 'sets up', 'clears the path for', 'makes possible'] },
  { from: 'the backbone of', to: ['the core of', 'what supports', 'the foundation of', 'what holds up'] },
  { from: 'a testament to', to: ['proof of', 'shows that', 'evidence of', 'a sign of'] },
  { from: 'in an ever-changing', to: ['in a changing', 'as things change in', 'in today\'s', 'in a shifting'] },
  { from: 'ever-evolving', to: ['constantly changing', 'always shifting', 'developing', 'moving'] },
  { from: 'not only', to: ['not just', 'both'] },
  { from: 'it is imperative that', to: ['we really need to', 'it\'s critical to', 'you have to', 'we must'] },
  { from: 'the landscape of', to: ['the world of', 'the field of', 'the area of', 'the space of'] },
  { from: 'navigating the complexities', to: ['dealing with the complexity', 'working through the complications', 'handling the tricky parts'] },
  { from: 'a rich tapestry', to: ['a mix of', 'a blend of', 'a variety of', 'a combination of'] },
  { from: 'tapestry', to: ['mix', 'blend', 'combination', 'mosaic', 'collection'] },
  { from: 'the nuances of', to: ['the subtle parts of', 'the details of', 'the finer points of'] },
  { from: 'bringing to light', to: ['revealing', 'showing', 'exposing', 'uncovering'] },
  { from: 'in the grand scheme of things', to: ['overall', 'when you step back', 'in the bigger picture', 'all things considered'] },
  { from: 'it bears mentioning', to: ['worth saying', 'I should add', 'also', 'one more thing'] },
  { from: 'serves as a', to: ['acts as a', 'works as a', 'functions as a', 'is a'] },
  { from: 'acts as a catalyst', to: ['sparks', 'drives', 'pushes forward', 'accelerates'] },
  { from: 'catalyst for change', to: ['what drives change', 'what pushes things forward', 'a driver of change'] },
  { from: 'the crux of', to: ['the heart of', 'the key part of', 'the main point of', 'what matters most about'] },
  { from: 'at its core', to: ['basically', 'fundamentally', 'at the heart of it', 'when you get down to it'] },
  { from: 'at its essence', to: ['basically', 'in essence', 'at heart', 'fundamentally'] },
  { from: 'it is undeniable that', to: ['clearly', 'obviously', 'you can\'t argue with', 'no question'] },
  { from: 'undeniably', to: ['clearly', 'without doubt', 'for sure', 'no question'] },
  { from: 'a beacon of', to: ['a sign of', 'an example of', 'a model for', 'a symbol of'] },
  { from: 'the paradigm of', to: ['the model of', 'the approach to', 'the pattern of', 'the framework for'] },
  { from: 'in a rapidly evolving', to: ['in a fast-changing', 'in a quickly changing', 'in today\'s', 'in a developing'] },
  { from: 'rapidly evolving', to: ['fast-changing', 'quickly developing', 'shifting', 'growing'] },
  { from: 'weaving together', to: ['combining', 'bringing together', 'mixing', 'merging'] },
  { from: 'a delicate balance', to: ['a tricky balance', 'a fine line', 'a careful balance', 'a tight balance'] },
  { from: 'it is paramount', to: ['it\'s crucial', 'this is the top priority', 'this matters most', 'nothing is more important'] },
  { from: 'paramount importance', to: ['really important', 'top priority', 'critical', 'the most important thing'] },
  { from: 'fostering a culture of', to: ['building a culture of', 'creating an environment for', 'encouraging'] },
  { from: 'the proliferation of', to: ['the spread of', 'the growth of', 'more and more', 'the rise in'] },
  { from: 'proliferation', to: ['spread', 'growth', 'increase', 'expansion'] },
  { from: 'a myriad of ways', to: ['lots of ways', 'many ways', 'all sorts of ways', 'tons of ways'] },
  { from: 'championing', to: ['supporting', 'pushing for', 'leading', 'advocating for'] },
  { from: 'demystifying', to: ['explaining', 'breaking down', 'making sense of', 'clarifying'] },
  { from: 'thought-provoking', to: ['interesting', 'makes you think', 'worth reflecting on', 'stimulating'] },
  { from: 'game-changing', to: ['huge', 'revolutionary', 'major', 'a big deal'] },
  { from: 'reshaping the way', to: ['changing how', 'transforming how', 'shifting how'] },
  { from: 'bridging the gap', to: ['closing the gap', 'connecting', 'filling the gap', 'linking'] },
  { from: 'a cornerstone of', to: ['a key part of', 'central to', 'essential to', 'a foundation of'] },
  { from: 'stands as', to: ['is', 'serves as', 'works as', 'functions as'] },
  { from: 'encompasses', to: ['includes', 'covers', 'involves', 'contains'] },
  { from: 'the advent of', to: ['the arrival of', 'the start of', 'the beginning of'] },
  { from: 'a stark contrast', to: ['a big difference', 'a clear difference', 'totally different from', 'nothing like'] },
  { from: 'delves deeper', to: ['goes deeper', 'looks closer', 'digs into', 'explores further'] },
  { from: 'unparalleled', to: ['unmatched', 'unequaled', 'unrivaled', 'like nothing else'] },
  { from: 'a lens through which', to: ['a way to look at', 'a perspective on', 'an angle for'] },
];

// Build a word-boundary-anchored, case-insensitive regex for a string phrase.
// Word boundaries are CRITICAL: without them, "facilitate" matches inside
// "facilitated" and leaves a dangling suffix ("make easierd"), and "implement"
// matches "implementation". This keeps replacements whole-word/whole-phrase.
function phraseRegex(from: string): RegExp {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'gi');
}

// Match a collocation in text and return replacement
export function applyCollocation(text: string): string {
  let result = text;
  for (const col of COLLOCATIONS) {
    if (col.from instanceof RegExp) {
      const match = result.match(col.from);
      if (match) {
        const replacement = col.to[Math.floor(Math.random() * col.to.length)];
        result = result.replace(col.from, replacement);
      }
    } else {
      const regex = phraseRegex(col.from);
      if (regex.test(result)) {
        const replacement = col.to[Math.floor(Math.random() * col.to.length)];
        // Rebuild the regex: the .test() above advanced lastIndex on a global regex.
        result = result.replace(phraseRegex(col.from), replacement);
      }
    }
  }
  return result;
}

// Apply a single random collocation replacement
export function applyRandomCollocation(text: string): string {
  const applicable = COLLOCATIONS.filter(col => {
    if (col.from instanceof RegExp) return col.from.test(text);
    return phraseRegex(col.from).test(text);
  });
  if (applicable.length === 0) return text;

  const col = applicable[Math.floor(Math.random() * applicable.length)];
  const replacement = col.to[Math.floor(Math.random() * col.to.length)];

  if (col.from instanceof RegExp) {
    return text.replace(col.from, replacement);
  }
  return text.replace(phraseRegex(col.from), replacement);
}
