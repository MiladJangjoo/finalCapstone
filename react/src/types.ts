export type LoggedUserDetailsType = {
  token: string
  username: string
}

export type UserDetailsType = {
  readonly id?: string
  username: string
  email: string
  password?: string
  new_password?: string
  phone_number: string
  first_name?: string
  last_name?: string
}

export type UserProfileDetailsType = UserDetailsType & {
  requests: TripDetailsType[]
}

export type TripDetailsType = TripDetailsFormType & {
  "id": string
  "passenger_id": string
}

export type TripDetailsFormType = {
  "pickup": string
  "dropoff": string
  "number_of_passengers": string
  "number_of_luggages": string
  "date_time": string
}

export type CountryISType = {
  ip: string
  country: string
}

export type StateOfCountryDetailsType = {
  id: number
  name: string
  iso2: string
}

export type CountryDetailsType = {
  id: number
  name: string
  iso3: string
  iso2: string
  phonecode: string
  capital: string
  currency: string
  native: string
  emoji: string
  emojiU: string
}

export type EditModeDetailsType = {
  isEditMode: false
} | {
  isEditMode: true
  requestID: string
}