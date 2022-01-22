import {TailSpin} from 'react-loader-spinner';

const ReactLoader = () =>  {
  return (
    <div className='className="flex justify-center mt-12"'>
      <TailSpin
        color="#00000059"
        height={70}
        width={70}
        className="flex justify-center mt-12"
      />
    </div>
  );
}

export default ReactLoader