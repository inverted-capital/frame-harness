interface LabeledInputProps {
  id: string
  label: string
  value: string | undefined
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text'
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder={placeholder}
    />
  </div>
)

export default LabeledInput
