// useEffect
// 従来のコンポーネントライフサイクルで行っていた処理相当を行うのに適している
import React, { useState, useEffect } from 'react';

const Component: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    // クリーンナップ関数
    return () => clearInterval(interval);
  });
  return <div>{count}</div>;
};
