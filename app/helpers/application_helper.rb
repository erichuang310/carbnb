module ApplicationHelper
	def flash_class(level)
		case level
		when "success" then "alert alert-success"
    when "info" then "alert alert-info"
    when "warning" then "alert alert-warning"
    when "error" then "alert alert-danger"
    end
	end
end
