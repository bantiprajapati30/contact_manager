import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInputGroup = ({
    labal,
    type,
    name,
    placeholder,
    value,
    onChange,
    error
}) => {
    return (
        <div>
            <div className="form-group">
                <label htmlFor={name}>{labal}</label>
                <input
                    type={type}
                    name={name}
                    className={classnames("form-control form-control-lg", { 'is-invalid': error })}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
};
TextInputGroup.propTypes = {
    labal: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}
TextInputGroup.defaultProps = {
    type: "text"
};
export default TextInputGroup;