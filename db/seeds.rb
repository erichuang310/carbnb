# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



ActiveRecord::Base.transaction do
  # Create users
  20.times do |i|
    User.create(
      email: Faker::Internet.email,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: "123123"
    )
  end

  # Create listings
  20.times do |i|
    sleep 0.5
    CarListing.create(
      leaser: User.all.sample,
      title: Faker::Name.title,
      description: Faker::Lorem.paragraph(5),
      rate: [50, 75, 100, 125].sample,
      deposit: [100, 150, 200].sample,
      cancellation: ["Relaxed", "Standard", "Strict"].sample,
      car_year: rand(2000..2015),
      car_make: Faker::Lorem.word,
      car_model: Faker::Lorem.word,
      car_color: Faker::Lorem.word,
      address: [
        "1060 bush street, san francisco",
        "1050 market street, san francisco",
        "74 Mission Rock Street, San Francisco",
        "100 6th St, San Francisco",
        "222 Mason St, San Francisco, CA 94102",
        "Union Square, 333 Post St, San Francisco",
        "1890 Clay St, San Francisco, CA 94109"].sample
    )
  end

  CarListing.all.each do |c|
    3.times do
      c.images << Image.new(file_picker_url: "/assets/" + ["370z.jpg", "fj.jpg", "g63.jpg", "model_s.jpg", "smart_front_side.jpg"].sample)
    end
    sleep 0.5
    c.save
  end

end
