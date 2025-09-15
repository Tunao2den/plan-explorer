import styles from "./page.module.css";
import DataTable from "./components/DataTable";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand} aria-label="Plan Explorer">
          <span className={styles.brandLeft}>PLAN</span>
          <span className={styles.brandRight}>EXPLORER</span>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Track calories of your daily exercise and meals</h1>
        <DataTable />
      </main>
    </div>
  );
}

// DataTable moved to a dedicated client component with search
