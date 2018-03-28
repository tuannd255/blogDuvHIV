class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :image_category
      t.string :name

      t.timestamps
    end
  end
end
