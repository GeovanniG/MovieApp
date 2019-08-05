import React from 'react';
import Form from './Form';
import Frame from '../Frame/Frame';

const FormPage = ({ signUp=true } = {}) => {
    return (
        <Frame>
            <Form signUp={signUp} />
        </Frame>
    );
}

export default FormPage;