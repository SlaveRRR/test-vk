import React, { FC, ReactElement, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Button, FormItem, IconButton, Input, Snackbar, Text } from '@vkontakte/vkui';
import { Icon16Clear, Icon28ErrorCircleOutline } from '@vkontakte/icons';
import axios from 'axios';
import { IAgeResponse, TForm } from './types';

const cancledMessage = 'canceled';

const BlockTwo: FC = () => {
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);

  const [name, setName] = useState('');

  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<TForm>({
    mode: 'onChange',
  });
  const [enabled, setEnabled] = useState(false);
  const { data } = useQuery({
    queryKey: ['name', name],
    queryFn: ({ signal }) => getData(signal),
    enabled: isValid && enabled && name !== '',
  });

  const getData = async (signal: AbortSignal) => {
    try {
      const { data } = await axios.get<IAgeResponse>(`https://api.agify.io/?name=${name}`, {
        signal,
      });
      return data;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error?.message !== cancledMessage &&
        setSnackbar(
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
          >
            {error?.message}
          </Snackbar>
        );
    } finally {
      setEnabled(false);
    }
  };

  const onSubmit: SubmitHandler<TForm> = () => {
    setEnabled(true);
  };

  const handleChange = (value: string) => {
    setName(value);
    setTimeout(() => {
      if (isValid) {
        console.log('work');
        setEnabled(true);
      }
    }, 3000);
  };
  const clear = () => {
    reset({
      name: '',
    });
    setName('');
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem htmlFor="exampleClickable" top="Вторая часть" status={errors?.name ? 'error' : 'default'}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Заполните форму!',
              validate: (value) => /^[a-zа-яё]+$/i.test(value) || 'Разрешены только буквы!',
            }}
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  id="exampleClickable"
                  type="text"
                  value={value}
                  onChange={async (e) => {
                    onChange(e);
                    handleChange(e.target.value);
                  }}
                  placeholder="Введите ваше имя"
                  after={
                    <IconButton hoverMode="opacity" label="Очистить поле" onClick={clear}>
                      <Icon16Clear />
                    </IconButton>
                  }
                />
              );
            }}
          />

          {<p>{errors?.name?.message}</p>}
        </FormItem>
        <FormItem>
          <Button type="submit" align={'center'} rounded={true} size={'m'}>
            Submit
          </Button>
        </FormItem>
      </form>
      {data?.name && (
        <Text
          style={{
            display: 'block',
            margin: '0 auto',
            width: 'max-content',
          }}
          weight="2"
        >
          age - {data.age ?? 0}, name - {data.name}, count - {data.count}
        </Text>
      )}
      {snackbar}
    </>
  );
};
export default BlockTwo;
