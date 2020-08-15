// useMemo
// 値のメモ化に使うAPI。
// 特定の値を算出する際に、
// 算出に依存している値に変化がなければ計算済みの値を返却する機構のこと
import React, { useState, useMemo, useCallback } from 'react';

const Component: React.FC = () => {
  const [count, setCount] = useState(0);
  const double = useMemo(() => count * 2, [count]);
  /*
  nullableにする場合
  const double = useMemo<number | null>(() => {
    if (count === null) return null;
    return count * 2;
  })
  */
  const doubleWithUnit = useMemo(() => `${double} pt`, [double]);
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>count: {count}</p>
      <p>double: {double}</p>
      <p>doubleWithUnit: {doubleWithUnit}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
};

export default Component;
