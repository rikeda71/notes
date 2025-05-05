// useRef
// refを用いたDOMアクセスに利用
// フォーカス、テキスト、メディアの再生など
import React, { useRef, useEffect } from 'react';

const Component: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current === null) return;
    const size = ref.current.getBoundingClientRect();
    console.log(size);
  });
  return (
    <div>
      <div ref={ref} style={{ width: 100, height: 100 }}></div>
    </div>
  );
};

export default Component;
