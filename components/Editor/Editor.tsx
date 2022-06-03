import { css } from '@emotion/react';
import React, { useRef } from 'react';

import { Colors, shadow, spacing } from '@Config/config';
import { useTranslation } from '@Context/TranslationContext';
import { isTranslatable } from '@Utils/utils';

const styles = {
  editorWrapper: css`
    width: 100%;
    height: 100vh;
    padding: 56px;
  `,
  editor: css`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 30px;
    resize: none;
    box-shadow: ${shadow.sidebar};
    padding: ${spacing[32]};
    font-family: 'Kalpurush', sans-serif;
    font-size: 1.5rem;
    letter-spacing: 1px;
    line-height: 32px;
    white-space: pre-wrap;
    word-break: break-word;
    appearance: textarea;

    &::selection {
      background: ${Colors.primary};
      color: ${Colors.white};
    }
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

const Editor = () => {
  const { translate } = useTranslation();
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  editorRef.current?.addEventListener('keydown', function (event) {
    let value = (event.target as HTMLTextAreaElement).value || '';

    if (['Space', 'Enter', 'Tab'].includes(event.code)) {
      const { target, caretStart } = getTargetWord(value, this.selectionStart);

      value = value.substring(0, caretStart) + value.substring(caretStart + target.length);
      const left = value.substring(0, caretStart);
      const right = value.substring(caretStart);
      const translated = translate(target);

      this.value = left + translated + right;

      this.setSelectionRange(caretStart + translated.length, caretStart + translated.length);

      if (event.key === 'Tab') {
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
      }
    }
  });

  return (
    <div css={styles.editorWrapper}>
      <textarea css={styles.editor} ref={editorRef} />
    </div>
  );
};

export default Editor;
