export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload JPG, PNG, or WEBP images.' }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 10MB limit.' }
  }
  
  return { valid: true }
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  if (password.length < minLength) {
    return { valid: false, error: 'Password must be at least 8 characters long' }
  }
  
  if (!hasUpperCase) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' }
  }
  
  if (!hasLowerCase) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' }
  }
  
  if (!hasNumbers) {
    return { valid: false, error: 'Password must contain at least one number' }
  }
  
  if (!hasSpecialChar) {
    return { valid: false, error: 'Password must contain at least one special character' }
  }
  
  return { valid: true }
}