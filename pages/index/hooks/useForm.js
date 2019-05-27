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

        const name = data.name || 'him';
        let value = null;
        if (data.value === undefined || data.value === null) {
            value = data.checked || false;
        } else if (typeof data.value === 'number') {
            value = data.value || 0;
        } else if (typeof data.value === 'string') {
            value = data.value || '';
        }

        if (settings[name] && typeof settings[name].handleChange === "function") {
            settings[name].handleChange(value);
        }

        if (value !== null) {
            setValues(values => ({ ...values, [name]: value }));
        }
    };

    return [
        values,
        handleChange,
        handleSubmit,
    ]
};

export default useForm;
