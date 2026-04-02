import { useState } from 'react'
import { Input, Button } from '../../components/index.js'
import { useI18n } from '../../i18n/LanguageProvider.jsx'
import styles from './AddUserForm.module.css'

/**
 * Form to add a new user with dynamic group loading
 * @param {Function} onSubmit - callback with user data
 * @returns {JSX.Element}
 */
export function AddUserForm({ onSubmit, groups = [] }) {
  const { t } = useI18n()
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
    if (!formData.fullName.trim()) newErrors.fullName = t('users.form.errors.fullName')
    if (!formData.account.trim()) newErrors.account = t('users.form.errors.account')
    if (!formData.email.trim()) newErrors.email = t('users.form.errors.emailRequired')
    if (formData.email && !formData.email.includes('@')) newErrors.email = t('users.form.errors.emailInvalid')
    if (!formData.phone.trim()) newErrors.phone = t('users.form.errors.phone')
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
    <form className={styles.addUserForm} onSubmit={handleSubmit}>
      <Input
        label={t('users.form.fullName')}
        placeholder={t('users.form.fullNamePlaceholder')}
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />

      <Input
        label={t('users.form.account')}
        placeholder={t('users.form.accountPlaceholder')}
        name="account"
        value={formData.account}
        onChange={handleChange}
        error={errors.account}
      />

      <Input
        type="email"
        label={t('users.form.email')}
        placeholder={t('users.form.emailPlaceholder')}
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label={t('users.form.phone')}
        placeholder={t('users.form.phonePlaceholder')}
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <div className={styles.formGroup}>
        <label htmlFor="groupId">
          {t('users.form.group')} <span>{t('common.optional')}</span>
        </label>
        <select
          id="groupId"
          name="groupId"
          value={formData.groupId}
          onChange={handleChange}
          className={styles.formSelect}
        >
          <option value="">{t('users.form.groupPlaceholder')}</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {errors.submit && <div className={styles.formError}>{errors.submit}</div>}

      <Button type="submit" disabled={isSubmitting} loading={isSubmitting} className={styles.submitButton}>
        {t('users.form.submit')}
      </Button>
    </form>
  )
}
