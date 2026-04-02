import { useState } from 'react'
import { Input, Button } from '../../components/index.js'
import './AddUserForm.module.css'

/**
 * Form to add a new user
 * @param {Function} onSubmit - callback with user data
 * @returns {JSX.Element}
 */
export function AddUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    account: '',
    email: '',
    phone: '',
    groupId: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required'
    if (!formData.account.trim()) newErrors.account = 'Account is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    return newErrors
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        fullName: formData.fullName,
        account: formData.account,
        email: formData.email,
        phone: formData.phone,
        groupId: formData.groupId ? parseInt(formData.groupId) : null,
      })
      setFormData({
        fullName: '',
        account: '',
        email: '',
        phone: '',
        groupId: '',
      })
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <Input
        placeholder="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />

      <Input
        placeholder="Account (companydomain/UserName)"
        name="account"
        value={formData.account}
        onChange={handleChange}
        error={errors.account}
      />

      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        placeholder="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <div className="form-group">
        <label htmlFor="groupId">Group (optional)</label>
        <select
          id="groupId"
          name="groupId"
          value={formData.groupId}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Unmanaged</option>
          <option value="1">Group 1</option>
          <option value="2">Group 2</option>
          <option value="3">Group 3</option>
          <option value="4">Group 4</option>
          <option value="5">Group 5</option>
          <option value="6">Group 6</option>
          <option value="7">Group 7</option>
          <option value="8">Group 8</option>
        </select>
      </div>

      {errors.submit && <div className="form-error">{errors.submit}</div>}

      <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
        Add User
      </Button>
    </form>
  )
}
