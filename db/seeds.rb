# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



ActiveRecord::Base.transaction do
  # Create users
  100.times do |i|
    User.create(
      email: Faker::Internet.email,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: "123123"
    )
  end

  # Create listings
  200.times do |i|
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
      car_color: Faker::Lorem.word
    )
  end


end
