import * as React from 'react';
import { useState, useContext } from 'react';

import { Form } from '../Form/Form';
import { Context } from '../App/App';

import { IProduct, deleteProduct, updateProduct } from '../../api/products';
import styles from './Item.module.scss';

interface IProps {
  product: IProduct;
}

export const Item: React.FC<IProps> = ({ product }) => {
  const context = useContext(Context)
  const [isEditing, setIsEditing] = useState(false)

  const onEdit = async (updatingProduct: {
    Title: string;
    CustomerRating: number;
  }): Promise<void> => {
    await updateProduct(context, {
      ...updatingProduct,
      Id: product.Id,
    })

    setIsEditing(false);
  };

  const onDelete = async () => {
    await deleteProduct(context, product.Id);
  }

  return (
    <li key={product.Id} className={styles.card}>
      <img src={product.PhotoSubmission} alt="picture" className={styles.image} />
      {product.Title} - {product.ReleaseDate}

      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={onDelete}>Delete</button>
      {isEditing && (
        <Form product={product} context={context} onEdit={onEdit} />
      )}
    </li>
  );
};