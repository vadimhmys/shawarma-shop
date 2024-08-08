import React from 'react';
import ReactSelect from 'react-select';
import { SelectTimePropsType } from '../../@types/app.forms';
import { Controller } from 'react-hook-form';
import './Select.scss';

export interface IOption {
  value: 15 | 20 | 25 | 30 | 35 | 40 | 45;
  label: string;
}

const options: IOption[] = [
  {
    value: 15,
    label: 'Через 15 минут',
  },
  {
    value: 20,
    label: 'Через 20 минут',
  },
  {
    value: 25,
    label: 'Через 25 минут',
  },
  {
    value: 30,
    label: 'Через 30 минут',
  },
  {
    value: 35,
    label: 'Через 35 минут',
  },
  {
    value: 40,
    label: 'Через 40 минут',
  },
  {
    value: 45,
    label: 'Через 45 минут',
  },
];

const getValue = (value: number) =>
    value ? options.find((option) => option.value === value) : 15;

const SelectTime: React.FC<SelectTimePropsType> = ({ control }) => {
  return (
    <div className='selectWrapper'>
      <h3 className='selectTitle'>Время</h3>
      {<Controller
          control={control}
          name="waitingTime"
          rules={{
            required: 'Укажите время',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <ReactSelect
                placeholder="Через сколько минут заберете"
                options={options}
                value={getValue(value)}
                onChange={newValue => onChange((newValue as IOption).value)}
                classNamePrefix={'customSelect'}
                isSearchable={false}
              />
              {error && <div className='errorBlock'>{error.message}</div>}
            </div>
          )}
        />}
    </div>
  );
};

export default SelectTime;
