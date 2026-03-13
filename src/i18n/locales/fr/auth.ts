export default {
  button: {
    signIn: 'Se connecter',
    signUp: "S'inscrire",
  },
  input: {
    email: { label: 'Email', placeholder: 'vous@exemple.com' },
    password: { label: 'Mot de passe', placeholder: 'Mot de passe' },
    confirmPassword: {
      label: 'Confirmer le mot de passe',
      placeholder: 'Confirmer le mot de passe',
    },
    name: { label: 'Nom', placeholder: 'Votre nom' },
  },
  error: {
    emailAndPassword: 'Merci de remplir email et mot de passe.',
    nameRequired: 'Le nom est requis.',
    confirmPasswordRequired: 'Merci de confirmer le mot de passe.',
    passwordMismatch: 'Les mots de passe ne correspondent pas.',
    generic: 'Une erreur est survenue.',
  },
} as const;
