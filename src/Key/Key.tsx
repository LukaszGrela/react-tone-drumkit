import React from 'react';

export interface IProps {
  keyCode: number;
  label: string;
  onClick: () => void;
}

const Key: React.FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <div className='key' onClick={props.onClick}>
      <kbd>{String.fromCharCode(props.keyCode)}</kbd>
      <span className='label'>{props.label}</span>
    </div>
  );
};

export default Key;
