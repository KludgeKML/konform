class Contact < ActiveRecord::Base
  validates :name, presence: true, length: { minimum: 2, maximum: 5 }
  validates :phone_number, length: {
      maximum: 12,
      too_long: "%{count} characters is the maximum allowed in a phone number"
    }
  validates :pan, {
    length: { minimum: 12, maximum: 20 },
    format: { with: /\A([0-9]{4,4}\s?){3,4}\z/, message: 'Must be digits only, or digits in groups of 4s separated by spaces' }
  }
  validates_with Validators::PhoneNumberValidator, fields: [:phone_number]
end

