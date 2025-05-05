// Components
// 自動的にルーティングを適応させたくないページを構成するコンポーネントをおく
import React from 'react';
import Next, { NextPageContext } from 'next';
import { NextComponentType } from 'next';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const Component: NextComponentType<NextPageContext, {}, Props> = (props) => (
  <div className={props.className}>Welcome to next.js</div>
);

const StyledComponent = styled(Component)`
  color: #f00;
`;

export default StyledComponent;
