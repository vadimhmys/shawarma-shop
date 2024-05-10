export default function RadioBox({ id, isChecked, price, weight, handleChange }) {
  return (
    <div className="radio-box">
      <input
        type="radio"
        name={'weight' + id}
        value={price}
        id={id}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id}>{weight} гр.</label>
    </div>
  );
}
