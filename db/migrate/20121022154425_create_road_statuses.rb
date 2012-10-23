class CreateRoadStatuses < ActiveRecord::Migration
  def change
    create_table :road_statuses do |t|
      t.integer :road_status
      t.integer :road_id

      t.timestamps
    end
  end
end
