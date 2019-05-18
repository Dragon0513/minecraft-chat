import { useState } from 'react';

function useForm(settings, callback) {
    const defaultvalues = {};
    Object.keys(settings).forEach((key) => {
        defaultvalues[key] = settings[key].default;
        if (defaultvalues[key] == undefined || defaultvalues[key] == null) {
            defaultvalues[key] = '';
        }
    });;

    if (!callback) {
        callback = () => { /* empty because ... */ };
    }

    const [values, setValues] = useState(defaultvalues);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback(values);
    };

    const handleChange = (event, data) => {
        if (typeof event.persist === "function") {
            event.persist();
        }

        let name = '', value = '';
        if (event.target) {
            name = event.target.name || data.name;
            value = event.target.value;
            if (event.target.value == null || event.target.value == undefined) {
                value = data.value || data.checked
            }
        }

        if (typeof settings[name].handleChange === "function") {
            settings[name].handleChange(value);
        }

        setValues(values => ({ ...values, [name]: value }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
    }
};

export default useForm;
