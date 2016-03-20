module IndexHelper
  def validating_form_for(symbol)
    @form_symbol = symbol
    @form_prefix = symbol.to_s.downcase.dasherize
    content_for(:form_body) { yield }
    ("<form id="" method=\"post\" action=\"\">\n" + content_for(:form_body) + "</form>\n").html_safe
    # react_component('ValidatingForm', nil, { prerender: true }) { content_for(:form_body) }
    # ("<div data-react-class=\"ValidatingForm\" data-react-props=\"null\">\n<div class=\"validating-form\">\n#{content_for(:form_body)}</div>\n</div>\n").html_safe
  end

  def validating_field_for(symbol, override_options = {})
    options = { name: symbol, displayName: symbol.to_s.titleize }
    options[:value] = params[symbol] unless params[symbol].nil?
    options[:alreadyBlurred] = true unless params[symbol].nil?
    @form_symbol.validators.each do |validator|
      next unless validator.attributes.include?(symbol)
      next unless validator.respond_to?(:validating_field_options)
      options.merge!(validator.validating_field_options)
    end
    options.merge!(override_options)
    react_component('ValidatingField', options, { id: "#{@form_prefix + "-" + symbol.to_s}", prerender: true })
  end
end

module ActiveRecord
  module Validations
    class PresenceValidator
      def validating_field_options
        { required: true }
      end
    end
  end
end

module ActiveModel
  module Validations
    class LengthValidator
      def validating_field_options
        vf_options = {}
        vf_options[:maxLen] = options[:maximum] if options[:maximum]
        vf_options[:minLen] = options[:minimum] if options[:minimum]
        vf_options[:maxLenMessage] = options[:too_long] % { count: options[:maximum] } if options[:too_long]
        vf_options[:minLenMessage] = options[:too_short] % { count: options[:minimum] } if options[:too_short]
        vf_options
      end
    end

    class FormatValidator
      def validating_field_options
        vf_options = { }
        vf_options[:regex] = js_regex(options[:with]) if options[:with]
        vf_options[:regexMessage] = options[:message] if options[:message]
        vf_options
      end

      def js_regex(regex)
        regex.source.gsub('\A','^').gsub('\z','$')
      end
    end
  end
end
