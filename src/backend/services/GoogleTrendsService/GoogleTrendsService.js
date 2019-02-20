const GoogleTrends = require('google-trends-api');

let startTime = new Date();
startTime.setFullYear(startTime.getFullYear() - 1);

function GoogleTrendsService (keyword) {
  return GoogleTrends.relatedQueries({
    keyword,
    startTime,
    geo: 'DE',
    hl: 'DE',
    endTime: new Date()
  })
    .then((results) => {
      let rawResults = JSON.parse(results).default.rankedList[0].rankedKeyword;

      rawResults.sort((a, b) => {
        return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
      });

      let shortenedArray = rawResults.slice(0, 5);
      return rawResults;
    })
    .catch((error) => {
      console.error('GoogleTrendsService.fetchQueryKeywords', error);
      return error;
    });
};

module.exports = {GoogleTrendsService};
