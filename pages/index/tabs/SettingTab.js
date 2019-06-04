import useForm from '../hooks/useForm';

import { Form, Checkbox } from "semantic-ui-react";
import './SettingTab.scss';

function SettingTab(props) {
  const [values, handleChange, handleSubmit] = useForm({
    dark_mode: {
      default: props.dark_mode,
      handleChange: props.handleSettingDarkModeChange
    }
  });

  return (
    <div id="setting-container" className="mcc-tab-container" >
      <Form onSubmit={handleSubmit} inverted={props.dark_mode}>
        <Form.Group>
          <Form.Field
            label='Dark Mode' toggle
            required width={16} control={Checkbox}
            type='checkbox' checked={values.dark_mode}
            name='dark_mode' onChange={handleChange}
          ></Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SettingTab;
