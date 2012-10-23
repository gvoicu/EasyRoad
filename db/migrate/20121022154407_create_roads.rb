class CreateRoads < ActiveRecord::Migration
  def change
    create_table :roads do |t|
      t.float :start_lat
      t.float :start_lng
      t.float :end_lat
      t.float :end_lng
      t.text :start_adr
      t.text :end_adr

      t.timestamps
    end
  end
end
