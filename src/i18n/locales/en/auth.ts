export default {
  button: {
    signIn: 'Sign in',
    signUp: 'Sign up',
  },
  input: {
    email: { label: 'Email', placeholder: 'you@example.com' },
    password: { label: 'Password', placeholder: 'Password' },
    confirmPassword: {
      label: 'Confirm password',
      placeholder: 'Confirm password',
    },
    name: { label: 'Name', placeholder: 'Your name' },
  },
  error: {
    emailAndPassword: 'Please fill in email and password.',
    nameRequired: 'Name is required.',
    confirmPasswordRequired: 'Please confirm the password.',
    passwordMismatch: 'Passwords do not match.',
    generic: 'An error occurred.',
  },
} as const;
