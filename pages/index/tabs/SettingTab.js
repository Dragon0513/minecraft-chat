import useForm from '../hooks/useForm';

import { Form, Checkbox } from "semantic-ui-react";
import './SettingTab.scss';

function SettingTab(props) {
  const [values, handleChange, handleSubmit] = useForm({
    inverted: {
      default: props.inverted,
      handleChange: props.handleSettingDarkModeChange
    }
  });

  return (
    <div id="setting-container" className="mcc-tab-container" >
      <Form onSubmit={handleSubmit} inverted={props.inverted}>
        <Form.Group>
          <Form.Field
            label='Dark Mode' toggle
            required width={16} control={Checkbox}
            type='checkbox' checked={values.inverted}
            name='inverted' onChange={handleChange}
          ></Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SettingTab;
