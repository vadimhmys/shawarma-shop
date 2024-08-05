import React from 'react';
import classNames from 'classnames';

export type FormFieldType = 'text' | 'password' | 'tel' | 'textarea';

export interface IFormFieldProps {
  className?: string;
  error?: string;
  label?: string;
  name?: string;
  type: FormFieldType;
  isFocused?: boolean;
  isRequired?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<IFormFieldProps> = ({
  className,
  error,
  label,
  name,
  type,
  isFocused,
  isRequired,
  onBlur,
  onFocus
}) => {
  return (
    <div
      className={classNames('FormField', className, {
        FormField__active: isFocused,
      })}>
      <label className="FormField_Label" htmlFor={name}>
        {label}
        {isRequired && <span className="FormField-LabelRequired"> *</span>}
      </label>
      {type === 'text' && (
        <>
          <input
            className={classNames({
              Input__active: isFocused,
              Input__error: error,
            })}
            name={name}
            error={error}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {error && <div className="FormField_ErrorMessage">{error}</div>}
        </>
      )}
    </div>
  );
};

//Input.displayName = "Input";