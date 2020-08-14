import * as React from 'react';

const Child: React.FC = (props) => <div>{props.children}</div>;
const Parent: React.FC<{ childLabel: string }> = (props) => (
  <Child>{props.childLabel}</Child>
);
// 以下と同じ定義になる
/*
type Props = {
  children?: React.ReactNode;
};
const Child = (props: Props) => <div>{props.children}</div>;
const Parent = (props: Props & { childLabel: string }) => (
  <Child>{props.childLabel}</Child>
);
*/
