import * as React from 'react';
import { useState } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IProduct, getProducts } from '../../api/products';
import styles from './App.module.scss';
import { Form } from '../Form/Form';
import { Item } from '../Item/Item';

interface IProps {
  context: WebPartContext;
}

export const Context = React.createContext<WebPartContext>(null);

export const App: React.FC<IProps> = ({ context }) => {
  const [products, setProducts] = useState<IProduct[]>([]);


  const onClick = async (): Promise<void> => {
    const products = await getProducts(context);
    setProducts(products);
  };

  return (
    <Context.Provider value={context}>
      <button onClick={onClick}>
        Get my products
      </button>
      <section>
        <h2>Products</h2>
        <ul className={styles.list}>
          {products.map((product) => (
            <Item product={product} key={product.Id} />
          ))}
        </ul>
      </section>
      <section>
        <h2>New Product</h2>
        <Form context={context} />
      </section>
    </Context.Provider>
  );
};