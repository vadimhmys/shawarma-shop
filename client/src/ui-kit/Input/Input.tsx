import React from 'react';
import { InputPropsType } from '../../@types/app.forms';
import './Input.scss';

export const Input: React.FC<InputPropsType> = ({
  wrapperClassName,
  titleClassName,
  subtitleClassName,
  titleContent,
  subtitleContent,
  inputClassName,
  isRequired,
  requiredMessage,
  name,
  minLength,
  maxLength,
  pattern,
  maxCharCount,
  type,
  errorClassName,
  errors,
  register,
}) => {
  return (
    <div className={wrapperClassName}>
      {titleContent && <h3 className={titleClassName}>{titleContent}</h3>}
      {subtitleContent && <p className={subtitleClassName}>{subtitleContent}</p>}
      <input
        className={inputClassName}
        {...register(`${name}`, {
          required: isRequired && requiredMessage,
          minLength: minLength,
          maxLength: maxLength,
          pattern: pattern,
        })}
        maxLength={maxCharCount}
        type={type}
      />
      {errors?.[`${name}`] && <p className={errorClassName}>{errors?.[`${name}`]?.message}</p>}
    </div>
  );
};
