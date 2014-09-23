class AddStatusToRequests < ActiveRecord::Migration
  def change
    add_column :requests, :status, :string, null: false, default: "Pending"
  end
end
