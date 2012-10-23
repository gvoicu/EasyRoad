class AddNameToRoad < ActiveRecord::Migration
  def change
    add_column :roads, :name, :string

  end
end
