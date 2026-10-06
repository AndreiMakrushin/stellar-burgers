import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';

import type { TAppHeaderUIProps } from './type';

import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI = ({ userName }: TAppHeaderUIProps): React.JSX.Element => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to={'/'}>
          <div className={styles.link_position_last}>
            <BurgerIcon type={'primary'} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </div>
        </NavLink>

        <NavLink to={'/feed'}>
          <div className={styles.link_position_last}>
            <ListIcon type={'primary'} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink to={'/'}>
          <Logo />
        </NavLink>
      </div>

      <NavLink to={'/profile'}>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <p className="text text_type_main-default ml-2">
            {userName ?? 'Личный кабинет'}
          </p>
        </div>
      </NavLink>
    </nav>
  </header>
);
