# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



ActiveRecord::Base.transaction do

  ADDRESSES = [
  	"2770 Jackson St, San Francisco, CA 94115",
  	"153 11th Ave, San Francisco, CA 94118",
  	"2006 Washington St, San Francisco, CA 94109",
  	"2-98 Harlan Pl, San Francisco, CA 94108",
  	"937 Harrison St, San Francisco, CA 94107",
  	"1912 McAllister St, San Francisco, CA 94115",
  	"3628 19th St, San Francisco, CA 94110",
  	"1028 Nancy Pelosi Dr, San Francisco, CA 94118",
  	"1261 Sanchez St, San Francisco, CA 94114",
  	"1800-1898 Quintara St, San Francisco, CA 94116",
  	"Le Judah RonDayVoo, 2230 Judah St, San Francisco, CA 94122",
  	"2069 15th Ave, San Francisco, CA 94116",
  	"226 27th St, San Francisco, CA 94131",
  	"347 Laidley St, San Francisco, CA 94131",
  	"16 Brussels St, San Francisco, CA 94134",
  	"501-595 Mendell St, San Francisco, CA 94124",
  	"719 Alemany Blvd, San Francisco, CA 94112",
  	"480 Gates St, San Francisco, CA 94110",
  	"412 Cordova St, San Francisco, CA 94112",
  	"2606 18th Ave, San Francisco, CA 94116"
  ]

  TITLES = [
    "Get a taste of real luxury",
    "Sexy sport car for the track",
    "Shitty car for insanely low rate",
    "Big truck for moving furniture",
    "Slow civic for city commutes",
    "Old, creepy van for free",
    "Super quiet hybrid",
    "Ordinary car for ordinary people",
    "Crappy car with broken trunk",
    "Reliable car for long trips",
    "Decked out van for family trips",
    "PIMPmobile. YEEEEE",
    "Car with two broken windows",
    "You know you want to drive it",
    "Hey, you! Drive my car now!",
    "If viagra came in a car form, it'd be my ride",
    "Pimp my ride? Pimp your life!",
    "Cute ride for cuties",
    "OmgwtfbbQ",
    "Bombass vehicular transport"
  ]

  User.create(
    email: "eric@gmail.com",
    first_name: "Eric",
    last_name: "Huang",
    password: "123123"
  )

  User.create(
    email: "guest@gmail.com",
    first_name: "Prospective",
    last_name: "Employer",
    password: "123123"
  )

  # Create listings
  20.times do |i|
    sleep 0.2
    CarListing.create(
      leaser: User.all.sample,
      title: TITLES[i],
      description: Faker::Lorem.paragraph(5),
      rate: [50, 75, 100, 125, 150, 200, 250].sample,
      deposit: [100, 150, 200, 250].sample,
      cancellation: ["Relaxed", "Standard", "Strict"].sample,
      car_year: rand(2000..2015),
      car_make: Faker::Lorem.word,
      car_model: Faker::Lorem.word,
      car_color: ["Red", "Blue", "Yellow", "Silver", "White", "Black", "Green"].sample,
      address: ADDRESSES[i],
      car_type: ["Sport", "Utility", "Luxury", "Economy"].sample
    )
  end

  CarListing.all.each do |c|
    3.times do
      c.images << Image.new(
        file_picker_url: "/assets/" + ["370z.jpg", "fj.jpg", "g63.jpg", "model_s.png", "smart_front_side.jpg", "tesla.jpg", "exige.jpg"].sample
      )
    end
    sleep 0.5
    c.save
  end

end
