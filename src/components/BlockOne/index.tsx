import { FormItem, FormLayoutGroup, IconButton, Input } from '@vkontakte/vkui';
import { Icon16Clear } from '@vkontakte/icons';
import React, { FC } from 'react';

const BlockOne: FC = () => {
  const textInput = React.useRef<HTMLInputElement>(null);
  const clear = () => {
    if (textInput.current) {
      textInput.current.value = '';
      textInput.current.focus();
    }
  };

  return (
    <FormLayoutGroup>
      <FormItem htmlFor="exampleClickable" top="📝 Пример с кликабельной иконкой" status={'default'}>
        <Input
          id="exampleClickable"
          getRef={textInput}
          type="text"
          placeholder="Ну ведь брокколи это вкусно и полезно 😢"
          defaultValue="Брокколи 🥦"
          after={
            <IconButton hoverMode="opacity" label="Очистить поле" onClick={clear}>
              <Icon16Clear />
            </IconButton>
          }
        />
      </FormItem>
    </FormLayoutGroup>
  );
};
export default BlockOne;
