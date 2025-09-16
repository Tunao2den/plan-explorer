import styles from "@/app/page.module.css";
import data from "@/data/intern-case-2.json";
import type { Item } from "../types/Item";

export default function CalorieCalculator() {

    const items = (data as { items: Item[] }).items;

    let totalKcal = 0;
    for (const item of items) {
        if (item.type === "meal") {
            totalKcal += item.kcal;
        }
        else if (item.type === "training") {
            totalKcal -= item.kcal;
        }
    }   

  return (
    <div className={styles.calorieCalculatorBox}>
    <span className={styles.calorieMessage}>
      {totalKcal > 0 ? "Your total calorie intake is" : "Your total calories burned is"}
    </span>
    <span className={styles.calorieValue}>
      {Math.abs(totalKcal)} kcal
    </span>
  </div>  
  );
}