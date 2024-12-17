import { countries } from "../../data/countries";
import styles from "./Form.module.css";

export default function Form() {
  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input id="city" type="text" name="city" placeholder="ciudad" />
      </div>

      <div className={styles.field}>
        <label htmlFor="city">Pais:</label>
        <select>
          <option value="">--- Selecciona un País ---</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value="consultar tiempo" />
    </form>
  );
}
