class Post < ApplicationRecord
  acts_as_taggable

	mount_uploader :image_post, ImageUploader

	has_many :claps, dependent: :destroy
	has_many :comments, dependent: :destroy

	belongs_to :category, optional: true
	belongs_to :author, foreign_key: :author_id, class_name: "User", optional: true

  scope :tagged_with, -> (name) {
    joins(:tags).where("tags.name LIKE ?", name)
  }

  scope :populars, -> {
    joins(:claps).order("claps.number_tap DESC").take Settings.take_post
  }

  scope :random, -> {
    all.sample Settings.random
  }

  validates :title, presence: true, length: {minimum: 10, maximum: 1000}
  validates :content, presence: true, length: {minimum: 1}


  def self.import(file)
    spreadsheet = open_spreadsheet(file)
    header = spreadsheet.row(1)
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      post = find_by_id(row["id"]) || new
      post.attributes = row.to_hash
      post.save!
    end
  end

  def self.open_spreadsheet(file)
    case File.extname(file.original_filename)
    when ".csv" then Roo::CSV.new(file.path)
    when ".xlsx" then Roo::Excelx.new(file.path)
    else raise "Unknown file type: #{file.original_filename}"
    end
  end
end
