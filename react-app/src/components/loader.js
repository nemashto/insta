import {TailSpin} from 'react-loader-spinner';

const ReactLoader = () =>  {
  return (
    <div className="max-h-screen">
      <div className='flex items-center justify-center my-20 '>
        <TailSpin
          color="#00000059"
          height={70}
          width={70}
          className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"
        />
      </div>
    </div>
  );
}

export default ReactLoader