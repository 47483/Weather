//List of all weathercodes from the open-meteo api
const weatherCodes = [
  { code: 0, text: 'Klar himmel', image: 'sunhigh.svg' },
  { code: 1, text: 'Huvudsakligen klart', image: 'sun.svg' },
  { code: 2, text: 'Delvis molnigt', image: 'sunlow.svg' },
  { code: 3, text: 'Mulet', image: 'clouds.svg' },
  { code: 45, text: 'Dimma', image: 'fog.svg' },
  { code: 48, text: 'Dimma och rimfrost', image: 'fog.svg' },
  { code: 51, text: 'Lätt duggregn', image: 'rain.svg' },
  { code: 53, text: 'Duggregn', image: 'rain.svg' },
  { code: 55, text: 'Kraftigt duggregn', image: 'rain.svg' },
  { code: 56, text: 'Kallt duggregn', image: 'rain.svg' },
  { code: 57, text: 'Kraftigt, kallt duggregn', image: 'rain.svg' },
  { code: 61, text: 'Lätt regn', image: 'rain.svg' },
  { code: 63, text: 'Regn', image: 'rain.svg' },
  { code: 65, text: 'Kraftigt regn', image: 'rain.svg' },
  { code: 66, text: 'Kallt regn', image: 'rain.svg' },
  { code: 67, text: 'Kraftigt, kallt regn', image: 'rain.svg' },
  { code: 71, text: 'Lätt snöfall', image: 'snow.svg' },
  { code: 73, text: 'Snöfall', image: 'snow.svg' },
  { code: 75, text: 'Kraftigt snöfall', image: 'snow.svg' },
  { code: 77, text: 'Snökorn', image: 'grain.svg' },
  { code: 80, text: 'Lätta regnskurar', image: 'rain.svg' },
  { code: 81, text: 'Regnskurar', image: 'rain.svg' },
  { code: 82, text: 'Kraftiga regnskurar', image: 'rain.svg' },
  { code: 85, text: 'Lätta snöbyar', image: 'snow.svg' },
  { code: 86, text: 'Kraftiga snöbyar', image: 'snow.svg' },
  { code: 95, text: 'Åskväder', image: 'storm.svg' },
  { code: 96, text: 'Åskväder med hagel', image: 'storm.svg' },
  { code: 99, text: 'Åskväder med kraftigt hagel', image: 'storm.svg' }
]

export default weatherCodes
