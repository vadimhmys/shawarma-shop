import React from 'react';
import { TeaxtAreaPropsType } from '../../@types/app.forms';
import { Controller } from 'react-hook-form';
import './TextArea.scss';

export const TextArea: React.FC<TeaxtAreaPropsType> = ({
  title,
  subtitle,
  name,
  isRequired,
  control,
  wrapperClassName,
  titleClassName,
  subtitleClassName,
  textAreaClassName,
  errorClassName,
  requiredMessage,
  placeholder,
  maxLength,
  maxCharCount,
}) => {
  const [text, setText] = React.useState('');
  return (
    <div className={wrapperClassName}>
      {title && <h3 className={titleClassName}>{title}</h3>}
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      {
        <Controller
          control={control}
          name={name}
          rules={{
            required: isRequired && requiredMessage,
            maxLength: maxLength,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <textarea
                className={textAreaClassName}
                placeholder={placeholder}
                value={text}
                onChange={(e) => {
                  onChange(e.target.value);
                  setText(e.target.value);
                }}
                maxLength={maxCharCount}
              />
              {error && <div className={errorClassName}>{error.message}</div>}
            </div>
          )}
        />
      }
    </div>
  );
};
