import { css } from '@emotion/react';
import React, { KeyboardEvent, useEffect, useState } from 'react';

import { Colors, shadow, spacing } from '@Config/config';
import dictionary from '@Config/dictionary';
import { useTranslationToBengali } from '@Context/TranslationContext';
import { isTranslatable } from '@Utils/utils';

const styles = {
  editorWrapper: css`
    width: 100%;
    height: 100vh;
    padding: 56px;
    position: relative;
  `,
  editor: css`
    border: none;
    outline: none;
    border-radius: 30px;
    resize: none;
    padding: ${spacing[32]};
    font-family: 'Kalpurush', sans-serif;
    font-size: 1.5rem;
    letter-spacing: 1px;
    line-height: 32px;
    white-space: pre-wrap;
    word-break: break-word;
    appearance: textarea;
    transition: 0.3s;
    position: absolute;
    z-index: 3;
    inset: ${spacing[56]};
    background: transparent;

    &::selection {
      background: ${Colors.primary};
      color: ${Colors.white};
    }

    &:focus {
      box-shadow: ${shadow.editor};
    }
  `,
  editorOverlay: css`
    position: absolute;
    inset: ${spacing[56]};
    z-index: 2;
    padding: ${spacing[32]};
    font-family: 'Kalpurush', sans-serif;
    font-size: 1.5rem;
    letter-spacing: 1px;
    line-height: 32px;
    white-space: pre-wrap;
    word-break: break-word;
    border-radius: 30px;
    background: ${Colors.white};
    color: transparent;
  `,
  marker: (isCorrect: boolean) => css`
    position: relative;
    white-space: pre-wrap;
    word-break: break-word;
    z-index: 10;
    text-decoration: none;
    width: 2px;
    height: 2px;
    color: transparent;

    ${!isCorrect &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 3px;
        height: 3px;
        width: 90%;
        background: ${Colors.secondary};
      }

      &:hover {
        background: ${Colors.secondary};
      }
    `}
  `,
  suggestionsContainer: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${Colors.white};
    border-radius: 14px;
    max-height: 300px;
    width: 250px;
    box-shadow: ${shadow.sidebar};
    z-index: 4;
    overflow-y: auto;
  `,
  suggestionList: css`
    list-style: none;
    padding: 0;
    margin: 0 0 ${spacing[12]} 0;
  `,
  suggestionListItem: css`
    padding: ${spacing[8]};
    color: green;
    font-family: 'Kalpurush', sans-serif;
    font-weight: 900;
    font-size: 1.2rem;

    &:hover {
      background: ${Colors.background};
      color: ${Colors.coalBlack};
      cursor: pointer;
    }
  `,
  suggestionMsg: css`
    font-size: 12px;
    color: ${Colors.lightGray};
    padding: ${spacing[12]};
    font-weight: 300;
  `,
};

const getTargetWord = (value: string, caretPosition: number) => {
  if (value.length === 0) {
    return {
      target: '',
      caretStart: 0,
    };
  }

  let target = '';

  while (caretPosition > 0 && isTranslatable(value.charAt(caretPosition - 1))) {
    caretPosition--;
    target += value.charAt(caretPosition);
  }

  return {
    caretStart: caretPosition,
    target: target.split('').reverse().join(''),
  };
};

interface WordStructure {
  text: string;
  isCorrect: boolean;
  suggestions: string[];
}

const parseValueToStructure = (value: string) => {
  const words = value.split(' ');
  return words.map((word) => {
    const sanitizedWord = word.replace(/\n/g, '').replace(/\s+/g, '');
    const isCorrect = dictionary.search(sanitizedWord);
    const suggestions = !isCorrect ? dictionary.getSuggestions(sanitizedWord) : [];

    return {
      text: word,
      isCorrect,
      suggestions,
    };
  });
};

const Editor = () => {
  const { translate } = useTranslationToBengali();
  const [value, setValue] = useState('');
  const [doTranslate, setDoTranslate] = useState(false);
  const [structures, setStructures] = useState<WordStructure[]>([]);

  // useEffect(() => {
  //   if (doTranslate) {
  //     setStructures(parseValueToStructure(value));
  //   }
  // }, [value, doTranslate]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const element = event.currentTarget;
    let editableValue = value;

    if (['Space', 'Enter', 'Tab'].includes(event.code)) {
      const { target, caretStart } = getTargetWord(value, element.selectionStart);

      editableValue = value.substring(0, caretStart) + value.substring(caretStart + target.length);
      const left = editableValue.substring(0, caretStart);
      const right = editableValue.substring(caretStart);
      const translated = translate(target);

      setValue(left + translated + right);
      setDoTranslate(true);

      element.setSelectionRange(caretStart + translated.length, caretStart + translated.length);

      if (event.key === 'Tab') {
        event.preventDefault();
        const start = element.selectionStart;
        const end = element.selectionEnd;

        editableValue = value.substring(0, start) + '\t' + value.substring(end);
        element.selectionStart = element.selectionEnd = start + 1;
      }
    }
  };

  return (
    <div css={styles.editorWrapper}>
      <textarea
        css={styles.editor}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setDoTranslate(false);
          setValue(event.currentTarget.value);
        }}
      />
      <div css={styles.editorOverlay}>
        {structures.map((structure, index) => {
          return (
            <a
              href="#"
              key={index}
              css={styles.marker(structure.isCorrect)}
              dangerouslySetInnerHTML={{ __html: structure.text + (index < structures.length - 1 ? ' ' : '') }}
              onClick={(event) => {
                event.preventDefault();
                // setActiveSuggestion(index);
              }}
            />
          );
        })}
      </div>

      {/* {activeSuggestionList.length > 0 && (
        <div css={styles.suggestionsContainer}>
          <p css={styles.suggestionMsg}>Here some alternatives</p>
          <ul css={styles.suggestionList}>
            {activeSuggestionList.map((suggestion, index) => {
              return (
                <li key={index} css={styles.suggestionListItem}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Editor;
