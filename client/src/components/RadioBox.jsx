export default function RadioBox({ id, isChecked, price, weight, onSwitch }) {
  return (
    <div className="radio-box">
      <input
        type="radio"
        name={'weight' + id}
        value={price}
        id={id}
        checked={isChecked}
        onChange={onSwitch}
      />
      <label htmlFor={id}>{weight} гр.</label>
    </div>
  );
}
