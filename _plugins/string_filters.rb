module Jekyll
    module KebabToSnakeCaseFilter
      def kebab_to_snake(input)
        # Return an empty string or some default value if input is nil
        return '' if input.nil?
  
        # Convert kebab-case to snake_case
        input.gsub('-', '_')
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::KebabToSnakeCaseFilter)
  