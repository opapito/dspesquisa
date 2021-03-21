import { Game, RecordItem, PieChartData } from './../Types';



export const buildBarSeries = (games: Game[], records: RecordItem[]) => {
  const mappedGames = games.map(game => {
    const filteredGames = records.filter(item => {
      return item.gameTitle === game.title && item.gamePlatform === game.platform
    });

    return {
      x: `${game.title} | ${game.platform}`,
      y: filteredGames.length
    }
    
  });

  const sortedGames = mappedGames.sort((a, b) => {
    return b.y - a.y;
  });

  return sortedGames.slice(0,5);
};

export const getPlatformChartData = (records: RecordItem[]) => {
  const platforms = ["PC", "PLAYSTATION", "XBOX"];
  const xy:PieChartData[] = [];

  platforms.map(platform => {
    const filteredGames = records.filter(item => {
      return platform === item.gamePlatform;
    })

    xy.push({x: platform, y: filteredGames.length});
  });

  return xy;
 };

export const getGenderChartData = (records: RecordItem[]) => {
   const genderByAmount = records.reduce((accumulator, currentValue) => {
     if (accumulator[currentValue.genreName] !== undefined) {
       accumulator[currentValue.genreName] += 1;
     } else {
      accumulator[currentValue.genreName] = 1;
     }

     return accumulator;
   }, {} as Record<string, number>);

   const xy:PieChartData[] = [];
   Object.keys(genderByAmount).forEach(key=>{
      xy.push({ x: key, y: genderByAmount[key]})
   })

  return xy;
};