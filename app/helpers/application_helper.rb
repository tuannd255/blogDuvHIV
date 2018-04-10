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


  class HTMLwithPygments < Redcarpet::Render::HTML
    def block_code(code, language)
      Pygments.highlight(code, lexer: language)
    end
  end

  def markdown content
    renderer = HTMLwithPygments.new(hard_wrap: true, filter_html: true, tables: true)
    options = {
      autolink: true,
      no_intra_emphasis: true,
      disable_indented_code_blocks: true,
      fenced_code_blocks: true,
      lax_html_blocks: true,
      strikethrough: true,
      superscript: true,
      quote: true,
      highlight: true,
      tables: true,
      emoji: true
    }
    Redcarpet::Markdown.new(renderer, options).render(content).html_safe
  end
end
