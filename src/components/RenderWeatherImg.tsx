import Image from 'next/image';

const RenderWeatherImage = ({
  weather,
  width,
  time,
}: {
  weather: string;
  width: number;
  time?: string;
}) => {
  let imageUrl = '';

  if (time) {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour >= 18 || hour < 6) {
      imageUrl = 'moon';
    }
  }

  if (!imageUrl) {
    if (weather.includes('맑음')) {
      imageUrl = 'sunny';
    } else if (weather.includes('구름') || weather.includes('흐림')) {
      imageUrl = 'cloud';
    } else if (weather.includes('비')) {
      imageUrl = 'rain';
    } else if (weather.includes('눈')) {
      imageUrl = 'snow';
    }
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <>
      <Image
        src={`/weather/${imageUrl}.png`}
        alt={weather}
        width={width}
        height={width}
      />
    </>
  );
};

export default RenderWeatherImage;
