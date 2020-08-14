import * as React from 'react';
import { Row } from '../data';

const Component: React.FC<Row> = (props) => (
  <tr>
    <th>{props.generation}</th>
    {props.answers.map((answer, i) => (
      // answer: number
      <td key={i}>{`${answer * 100}`}</td>
    ))}
  </tr>
);

export default Component;
