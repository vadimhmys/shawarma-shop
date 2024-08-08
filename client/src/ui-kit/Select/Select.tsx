import React from 'react';
import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';
import { IOption, SelectPropsType } from '../../@types/app.forms';
import './Select.scss';

export const Select: React.FC<SelectPropsType> = ({
  wrapperClassName,
  titleClassName,
  title,
  control,
  name,
  isRequired,
  requiredMessage,
  options,
  defaultValue,
  errorClassName,
  placeholder,
  classNamePrefix,
}) => {
  const getValue = (value: number | string) =>
    value ? options.find((option) => option.value === value) : defaultValue;
  return (
    <div className={wrapperClassName}>
      <h3 className={titleClassName}>{title}</h3>
      {
        <Controller
          control={control}
          name={name}
          rules={{
            required: isRequired && requiredMessage,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <ReactSelect
                placeholder={placeholder}
                options={options}
                value={getValue(value)}
                onChange={(newValue) => onChange((newValue as IOption).value)}
                classNamePrefix={classNamePrefix}
                isSearchable={false}
              />
              {error && <div className={errorClassName}>{error.message}</div>}
            </div>
          )}
        />
      }
    </div>
  );
};
