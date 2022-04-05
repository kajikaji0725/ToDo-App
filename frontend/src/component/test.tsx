import  { useState } from 'react';

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className='App'>
      {date?.toString() ?? 'null!!!!'}
      <input
        type='datetime-local'
        onChange={(e) => {
          setDate(new Date(e.target.value));
        }}
      />
    </div>
  );
}

export default App;