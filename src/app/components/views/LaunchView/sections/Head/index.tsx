import * as React from "react";
import pluginLogo from "../../../../../assets/plugin-logo.webp";

import styles from "./styles.module.scss";

const LaunchView: React.FC = () => {
  return (
    <section className={styles.head}>
      <img className={styles.logo} src={pluginLogo} />
    </section>
  );
};

export default LaunchView;
