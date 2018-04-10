module ApplicationHelper
	def full_title page_title = ""
	  base_title = "Blog's DuvHIV"
	    if page_title.empty?
	      base_title
	    else
	      page_title + " | " + base_title
	    end
	end

  def tags
    Tag.all
  end

  def categories
    Category.all
  end

  def tag_count_post tag
    Post.joins(:tags).where("tags.id = ?", tag.id).size
  end
end
