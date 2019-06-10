import { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Header, Image } from 'semantic-ui-react';

import { effectData } from '../../datas/effects.json';

ShowEffects.propTypes = {
  inverted: PropTypes.bool.isRequired,
  effects: PropTypes.arrayOf(PropTypes.bool).isRequired
}

ShowEffects.defaultProps = {
  inverted: true,
  effects: []
}

function ShowEffects(props) {
  return (
    <Fragment>
      <Header inverted={props.inverted}>Effects</Header>
      <Image.Group size='tiny'>
        {props.effects.map((effect, index) => {
          if (effect) {
            return (<Image key={index}
              src={`/static/mc-effect/${index + 1}.png`}
              title={effectData[index].displayName}
            />)
          }
        })}
      </Image.Group>
    </Fragment>
  );
};

export default ShowEffects;
