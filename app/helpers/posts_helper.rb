module PostsHelper
	def get_url_clap args = {}
		post = args[:post]
		clap = args[:clap]

		if clap.persisted?
			return post_clap_url(post.id, clap.id), "PUT"
		else
			return post_claps_url(post.id), "POST"
		end
	end
end
