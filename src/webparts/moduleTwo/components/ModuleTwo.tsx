import * as React from 'react';
import styles from './ModuleTwo.module.scss';
import { IModuleTwoProps } from './IModuleTwoProps';
import { App } from './App/App';

export default class ModuleTwo extends React.Component<IModuleTwoProps, {}> {
  public render(): React.ReactElement<IModuleTwoProps> {
    const {
      hasTeamsContext,
      context
    } = this.props;

    return (
      <section className={`${styles.moduleTwo} ${hasTeamsContext ? styles.teams : ''}`}>
        <App context={context} />
      </section>
    );
  }
}
