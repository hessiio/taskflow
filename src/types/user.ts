export type UserRole = "admin" | "manager" | "member"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  /** Hex color used to render the user's avatar initials consistently. */
  avatarColor: string
}