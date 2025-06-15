import React from 'react';
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ items, title }) => {
  return (
    <div className={styles.breadcrumb}>
      <span className={styles.title}>{title}</span>
      <div className={styles.breadcrumbItems}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <span 
              className={item.isActive ? styles.activeItem : styles.item}
            >
              {item.label}
            </span>
            {index < items.length - 1 && (
              <div className={styles.separator}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83333 12.6666L10 8.49996L5.83333 4.33329" stroke="#667085" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
