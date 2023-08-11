// useState
import React, { useState, useCallback } from 'react';

const Component: React.FC = () => {
  const [count, setCount] = useState(0);
  // Nullableにしたい場合
  // const [count, setCount] = useState<number | null>(0);
  const handleClick = useCallback(() => {
    // setCount('0'); // Error
    // setCount((prev) => '3'); // Error
    // setCount((prev) => prev + 1); // OK
    setCount(count + 1);
  }, [count]);
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
};

export default Component;
