const usersFields = {
  id: { type: 'id', label: 'ID' },

  firstName: { type: 'string', label: 'First Name' },

  lastName: { type: 'string', label: 'Last Name' },

  phoneNumber: { type: 'string', label: 'Phone Number' },

  email: { type: 'string', label: 'E-mail' },

  role: {
    type: 'enum',
    label: 'Role',

    options: [
      { value: 'admin', label: 'admin' },

      { value: 'user', label: 'user' },
    ],
  },

  disabled: { type: 'boolean', label: 'Disabled' },

  avatar: { type: 'images', label: 'Avatar' },

  password: { type: 'string', label: 'Password' },

  emailVerified: { type: 'boolean', label: 'Email Verified' },

  emailVerificationToken: { type: 'string', label: 'Verification Token' },

  emailVerificationTokenExpiresAt: {
    type: 'datetime',
    label: 'Verification Token Expiration',
  },

  passwordResetToken: { type: 'string', label: 'Password Reset Token' },

  passwordResetTokenExpiresAt: {
    type: 'datetime',
    label: 'Password Reset Token Expiration',
  },

  provider: { type: 'string', label: 'Provider' },

  type: {
    type: 'enum',
    label: 'type',

    options: [
      { value: 'SUPER_ADMIN', label: 'SUPER_ADMIN' },

      { value: 'PRIEST', label: 'PRIEST' },
    ],
  },

  email_verified_at: { type: 'datetime', label: 'email_verified_at' },

  first_time_login: { type: 'int', label: 'first_time_login' },

  forgot_password_token: { type: 'string', label: 'forgot_password_token' },

  remember_token: { type: 'string', label: 'remember_token' },

  forgot_password_token_timestamp: {
    type: 'datetime',
    label: 'forgot_password_token_timestamp',
  },

  is_active: { type: 'int', label: 'is_active' },

  password: { type: 'string', label: 'Password' },
};

export default usersFields;
