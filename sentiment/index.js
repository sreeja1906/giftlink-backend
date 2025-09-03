const natural = require("natural"); // REQUIRED in rubric

function analyzeSentiment(text) {
  const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
  return analyzer.getSentiment(String(text || "").split(/\s+/));
}

module.exports = { analyzeSentiment };
