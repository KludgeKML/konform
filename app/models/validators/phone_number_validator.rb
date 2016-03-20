module Validators
  class PhoneNumberValidator < ActiveModel::Validator
    def attributes
      options[:fields]
    end

    def validate(record)
      if options[:fields].any?{|field| record.send(field) == "Evil" }
        record.errors[:base] << "This person is evil"
      end
    end

    def validating_field_options
      vf_options = { }
      vf_options[:regex] = '^0'
      vf_options[:regexMessage] = "Phone number has to start with a 0!"
      vf_options
    end
  end
end
