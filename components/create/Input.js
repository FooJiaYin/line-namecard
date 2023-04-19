import { useForm } from "../../hooks/useForm";

export const Input = ({
  label,
  field,
  type = "text",
  onChange,
  style,
  ...props
}) => {
  const [formData, setFormData] = useForm();

  const handleChange = (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    console.log(formData);
  };

  return (
    <div style={style}>
      {label && <label>{label}</label>}
      <input
        type={type}
        onChange={onChange || handleChange}
        value={formData[field] || ""}
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
      checked={formData[field] || false}
      onChange={handleChange}
      {...props}
    />
  );
};
