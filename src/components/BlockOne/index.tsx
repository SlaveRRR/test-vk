import React, { FC, useEffect, useState } from 'react';
import { Button, FormItem, FormLayoutGroup, IconButton, Input, Spinner } from '@vkontakte/vkui';
import { Icon16Clear } from '@vkontakte/icons';
import axios from 'axios';
import { ICatsResponse } from './types';

const apiUrl = 'https://catfact.ninja/fact';

const BlockOne: FC = () => {
  const textInput = React.useRef<HTMLInputElement>(null);
  const [fact, setFact] = useState('');
  const [query, setQuery] = useState(false);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<ICatsResponse>(apiUrl);
      setFact(data.fact);
      setQuery(false);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    if (textInput.current) {
      setFact('');
      textInput.current.focus();
    }
  };
  useEffect(() => {
    query && getData();
    if (textInput.current) {
      const firstWord = fact.split(' ')[0];
      textInput.current.setSelectionRange(firstWord.length, firstWord.length);
      textInput.current.focus();
    }
  }, [query, fact]);

  if (loading) {
    return <Spinner size="medium" />;
  }
  return (
    <FormLayoutGroup>
      <FormItem htmlFor="exampleClickable" top="Первая часть" status={'default'}>
        <Input
          id="exampleClickable"
          getRef={textInput}
          type="text"
          value={fact}
          onChange={(e) => setFact(e.target.value)}
          placeholder="Факт о котах"
          after={
            <IconButton hoverMode="opacity" label="Очистить поле" onClick={clear}>
              <Icon16Clear />
            </IconButton>
          }
        />
      </FormItem>
      <FormItem>
        <Button align={'center'} rounded={true} size={'m'} onClick={() => setQuery(true)}>
          Get fact
        </Button>
      </FormItem>
    </FormLayoutGroup>
  );
};
export default BlockOne;
