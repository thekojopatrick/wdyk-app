import * as React from 'react';

import { ThemeText } from '../ThemeText';
import renderer from 'react-test-renderer';

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemeText>Snapshot test!</ThemeText>).toJSON();

  expect(tree).toMatchSnapshot();
});
