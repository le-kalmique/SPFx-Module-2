import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import { useState } from 'react';
import styles from './Form.module.scss';
import { IProduct, createProduct } from '../../api/products';

interface IProps {
  context: WebPartContext;
  product?: IProduct;
  onEdit?: (product: Partial<IProduct>) => void;
}

export const Form: React.FC<IProps> = ({ context, product, onEdit }) => {
  const [title, setTitle] = useState(product?.Title || '');
  const [callVolume, setVolume] = useState(product?.CustomerRating || 0);

  const onClick = async (): Promise<void> => {
    await createProduct(context, {
      Title: title,
      CallVolume: callVolume
    })
  };

  return (
    <div className={styles.form}>
      <input type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder='Title' />
      <input type="number" value={callVolume} onChange={(ev) => setVolume(Number(ev.target.value))} placeholder='Volume' />
      <button onClick={product
        ? () => onEdit({ Title: title, CustomerRating: callVolume })
        : onClick
      }>Submit</button>
    </div>
  );
};