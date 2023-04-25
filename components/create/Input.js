import { useForm } from "../../hooks/useForm";

export const Input = ({ label, field, type = "text", onChange, style, className, value, ...props }) => {
  const [formData, setFormData] = useForm();

  const handleChange = (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <div style={style} className={className}>
      {label && <label>{label}</label>}
      <input
        type={type}
        onChange={onChange ?? handleChange}
        value={value ?? formData[field] ?? ""}
        {...props}
      />
    </div>
  );
};

export const Checkbox = ({ field, ...props }) => {
  const [formData, setFormData] = useForm();

  const handleChange = (event) => {
    setFormData({ ...formData, [field]: event.target.checked });
  };

  return (
    <Input
      type="checkbox"
      checked={formData[field] ?? false}
      onChange={handleChange}
      className="narrow"
      {...props}
    />
  );
};
